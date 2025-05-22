import React, { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import ChatContainer from "../Chat/ChatContainer";
import DashboardNavbar from "./DashboardNavbar";
import ChatApiService, { ChatMessage } from "../../services/chatApi";
import { toast } from "react-hot-toast";

// Initialize Supabase client
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

interface ChatLayoutProps {
  onLogout: () => void;
}

const ChatLayout: React.FC<ChatLayoutProps> = ({ onLogout }) => {
  const [messages, setMessages] = useState<
    Array<{ text: string; sender: "user" | "bot" }>
  >([]);
  const [userFullName, setUserFullName] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState<string>("");
  const replicaUuid = import.meta.env.VITE_SENSAY_REPLICA_UUID;

  const fetchUserData = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        onLogout();
        return;
      }

      const fullName = user.user_metadata?.full_name;
      const { data: userData, error } = await supabase
        .from("sensay_users")
        .select("full_name, sensay_user_id")
        .eq("id", user.id)
        .single();

      if (error) {
        console.error("Error fetching user data:", error);
        toast.error("Failed to load user data");
        if (fullName) {
          setUserFullName(fullName);
        }
        return;
      }

      if (userData) {
        setUserFullName(userData.full_name);
        if (userData.sensay_user_id) {
          setUserId(userData.sensay_user_id);
        } else {
          toast.error("User ID not found");
        }
      } else if (fullName) {
        setUserFullName(fullName);
        toast.error("User profile not found");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      toast.error("Failed to load user data");
    }
  };

  const loadChatHistory = async () => {
    if (!userId) return;

    try {
      const response = await ChatApiService.getChatHistory(replicaUuid, userId);
      if (response.success) {
        const formattedMessages = response.items.map((item: ChatMessage) => ({
          text: item.content,
          sender: item.role === "user" ? ("user" as const) : ("bot" as const),
        }));
        setMessages(formattedMessages);
      }
    } catch (error) {
      console.error("Error loading chat history:", error);
      toast.error("Failed to load chat history");
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    if (userId) {
      loadChatHistory();
    }
  }, [userId]);

  const handleSendMessage = async (message: string) => {
    if (!userId) {
      toast.error("User ID not found");
      return;
    }

    const userMessage = { text: message, sender: "user" as const };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await ChatApiService.sendMessage(
        replicaUuid,
        message,
        userId
      );
      if (response.success) {
        const botMessage = { text: "", sender: "bot" as const };
        setMessages((prev) => [...prev, botMessage]);

        const finalText = response.content;
        let currentText = "";

        for (let i = 0; i < finalText.length; i++) {
          currentText += finalText[i];
          setMessages((prev) =>
            prev.map((msg, idx) =>
              idx === prev.length - 1 ? { ...msg, text: currentText } : msg
            )
          );
          await new Promise((resolve) => setTimeout(resolve, 20));
        }
      }
    } catch (error) {
      setMessages((prev) => prev.filter((msg) => msg !== userMessage));
      console.error("Error sending message:", error);
      toast.error("Failed to send message");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-[#0A0A0A] text-white">
      <DashboardNavbar onLogout={onLogout} />
      <main className="flex-1 overflow-y-auto grid-background pt-16">
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent" />
        <ChatContainer
          userName={userFullName}
          modelName="Claude 3"
          messages={messages}
          onSendMessage={handleSendMessage}
          isLoading={isLoading}
        />
      </main>
    </div>
  );
};

export default ChatLayout;
