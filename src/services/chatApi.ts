import axios from "axios";

interface ChatMessage {
  id: number;
  created_at: string;
  content: string;
  role: "user" | "assistant";
  is_private: boolean;
  source: string;
  replica_uuid: string;
  is_archived: boolean;
  replica_slug: string;
  user_uuid: string;
  sources: string[];
}

interface ChatHistoryResponse {
  success: boolean;
  type: string;
  items: ChatMessage[];
}

interface ChatCompletionResponse {
  success: boolean;
  content: string;
}

class ChatApiService {
  private static API_BASE_URL = "https://api.sensay.io/v1";
  private static getHeaders(userId: string) {
    return {
      "Content-Type": "application/json",
      "X-API-Version": import.meta.env.VITE_SENSAY_API_VERSION || "",
      "X-ORGANIZATION-SECRET":
        import.meta.env.VITE_SENSAY_ORGANIZATION_SECRET || "",
      "X-USER-ID": userId,
    };
  }

  static async sendMessage(
    replicaUuid: string,
    content: string,
    userId: string
  ): Promise<ChatCompletionResponse> {
    try {
      const response = await axios.post(
        `${this.API_BASE_URL}/replicas/${replicaUuid}/chat/completions`,
        { content },
        { headers: this.getHeaders(userId) }
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          `Failed to send message: ${
            error.response?.data?.message || error.message
          }`
        );
      }
      throw new Error("Failed to send message");
    }
  }

  static async getChatHistory(
    replicaUuid: string,
    userId: string
  ): Promise<ChatHistoryResponse> {
    try {
      const response = await axios.get(
        `${this.API_BASE_URL}/replicas/${replicaUuid}/chat/history`,
        { headers: this.getHeaders(userId) }
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          `Failed to get chat history: ${
            error.response?.data?.message || error.message
          }`
        );
      }
      throw new Error("Failed to get chat history");
    }
  }
}

export default ChatApiService;
export type { ChatMessage, ChatHistoryResponse, ChatCompletionResponse };
