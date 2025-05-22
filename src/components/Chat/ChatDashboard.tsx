import React, { useState, useEffect } from "react";
import { Mic, Send } from "lucide-react";
import { motion } from "framer-motion";
import { createClient } from "@supabase/supabase-js";
import Navbar from "../Navbar";
import helgaAvatar from "../../assets/images/helga-avatar.jpg";
import ChatApiService, { ChatMessage } from "../../services/chatApi";
import { toast } from "react-hot-toast";

// Initialize Supabase client
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

interface Message {
  text: string;
  isAI: boolean;
  timestamp: Date;
  hasAudio?: boolean;
}

interface ChatDashboardProps {
  onLogout: () => void;
  replicaUuid: string;
}

const ChatDashboard: React.FC<ChatDashboardProps> = ({
  onLogout,
  replicaUuid,
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState<string>("");

  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    if (userId) {
      loadChatHistory();
    }
  }, [userId]);

  const fetchUserData = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        const { data: userData, error } = await supabase
          .from("sensay_users")
          .select("sensay_user_id")
          .eq("id", user.id)
          .single();

        if (error) {
          throw error;
        }

        if (userData?.sensay_user_id) {
          setUserId(userData.sensay_user_id);
        } else {
          toast.error("User ID not found. Please contact support.");
        }
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      toast.error("Failed to load user data. Please try refreshing the page.");
    }
  };

  const loadChatHistory = async () => {
    try {
      const response = await ChatApiService.getChatHistory(replicaUuid, userId);
      if (response.success) {
        const formattedMessages = response.items.map((item: ChatMessage) => ({
          text: item.content,
          isAI: item.role === "assistant",
          timestamp: new Date(item.created_at),
          hasAudio: item.role === "assistant",
        }));
        setMessages(formattedMessages);
      }
    } catch (error) {
      toast.error(
        "Failed to load chat history. Please try refreshing the page."
      );
      console.error("Error loading chat history:", error);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading || !userId) return;

    const userMessage: Message = {
      text: inputMessage,
      isAI: false,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      const response = await ChatApiService.sendMessage(
        replicaUuid,
        inputMessage.trim(),
        userId
      );
      if (response.success) {
        const aiMessage: Message = {
          text: response.content,
          isAI: true,
          timestamp: new Date(),
          hasAudio: true,
        };
        setMessages((prev) => [...prev, aiMessage]);
      }
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
      console.error("Error sending message:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <div
        className="absolute inset-0 bg-[#111111] opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(#2C2C2C 1px, transparent 1px), linear-gradient(90deg, #2C2C2C 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <Navbar isAuthenticated={true} onLogout={onLogout} />

      <main className="relative z-10 max-w-4xl mx-auto pt-24 pb-32 px-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <h1 className="text-6xl font-semibold mb-4">
                <span className="text-white">Welcome to</span>{" "}
                <span className="text-[#3B82F6]">Chat</span>
              </h1>
              <p className="text-gray-400 text-xl">
                Start a conversation with your AI assistant
              </p>
            </motion.div>
          </div>
        ) : (
          <div className="space-y-6">
            {messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${
                  message.isAI ? "justify-start" : "justify-end"
                }`}
              >
                <div
                  className={`flex ${
                    message.isAI ? "flex-row" : "flex-row-reverse"
                  } items-start space-x-3 max-w-[80%]`}
                >
                  {message.isAI && (
                    <div className="flex-shrink-0">
                      <img
                        src={helgaAvatar}
                        alt="AI Assistant"
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    </div>
                  )}
                  <div
                    className={`rounded-xl px-4 py-3 ${
                      message.isAI ? "bg-[#1C1C1C]" : "bg-[#3B82F6]"
                    }`}
                  >
                    <p className="text-[15px]">{message.text}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>

      <footer className="fixed bottom-0 left-0 right-0 bg-[#0A0A0A] border-t border-[#1C1C1C] p-4">
        <form onSubmit={handleSendMessage} className="max-w-4xl mx-auto">
          <div className="relative flex items-center">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type your message here..."
              className="w-full bg-[#1C1C1C] text-white placeholder-gray-500 rounded-full py-3 pl-6 pr-24 focus:outline-none focus:ring-1 focus:ring-[#3B82F6]"
              disabled={isLoading}
            />
            <div className="absolute right-2 flex items-center space-x-2">
              <button
                type="button"
                className="p-2 text-gray-400 hover:text-gray-300 transition-colors"
                title="Voice input (coming soon)"
                disabled={true}
              >
                <Mic className="w-5 h-5" />
              </button>
              <button
                type="submit"
                disabled={!inputMessage.trim() || isLoading}
                className="bg-[#3B82F6] text-white p-2 rounded-full hover:bg-[#2563EB] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </form>
      </footer>
    </div>
  );
};

export default ChatDashboard;
