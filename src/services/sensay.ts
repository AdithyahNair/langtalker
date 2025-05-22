import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

interface ChatMessage {
  id: string;
  content: string;
  role: "user" | "assistant";
  created_at: string;
}

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const sensayApi = {
  async getChatHistory(): Promise<ChatMessage[]> {
    let retries = 0;

    while (retries < MAX_RETRIES) {
      try {
        // First get the Sensay user ID from our database
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();
        if (userError) throw userError;
        if (!user) throw new Error("No user logged in");

        const { data: userData, error: dbError } = await supabase
          .from("sensay_users")
          .select("sensay_user_id")
          .eq("id", user.id)
          .single();

        if (dbError) {
          console.error("Database error:", dbError);
          if (retries < MAX_RETRIES - 1) {
            retries++;
            await wait(RETRY_DELAY);
            continue;
          }
          throw dbError;
        }

        if (!userData) {
          console.error("No Sensay user data found");
          return []; // Return empty array instead of throwing error
        }

        const response = await fetch(
          `https://api.sensay.io/v1/replicas/${
            import.meta.env.VITE_SENSAY_REPLICA_UUID
          }/chat/history`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "X-API-Version": import.meta.env.VITE_SENSAY_API_VERSION,
              "X-ORGANIZATION-SECRET": import.meta.env
                .VITE_SENSAY_ORGANIZATION_SECRET,
              "X-USER-ID": userData.sensay_user_id,
              Accept: "application/json",
            },
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          console.error("Sensay API error:", errorData);
          if (retries < MAX_RETRIES - 1) {
            retries++;
            await wait(RETRY_DELAY);
            continue;
          }
          throw new Error(errorData.message || "Failed to fetch chat history");
        }

        const data = await response.json();
        return data;
      } catch (error) {
        console.error(
          "Error in getChatHistory attempt",
          retries + 1,
          ":",
          error
        );
        if (retries < MAX_RETRIES - 1) {
          retries++;
          await wait(RETRY_DELAY);
          continue;
        }
        throw error;
      }
    }

    return []; // Return empty array if all retries failed
  },
};
