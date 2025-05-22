import React, { useState } from "react";
import { Mic, ArrowUp, Loader2 } from "lucide-react";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  modelName: string;
  isLoading?: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({
  onSendMessage,
  modelName,
  isLoading = false,
}) => {
  const [message, setMessage] = useState("");
  const [showBetaAlert, setShowBetaAlert] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSendMessage(message.trim());
      setMessage("");
    }
  };

  return (
    <div className="relative">
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Schreib hier... (Type here in German or English)"
            className="w-full bg-[#1C1C1C] text-white placeholder-gray-400 rounded-2xl pl-4 pr-24 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500/40 border border-white/5 shadow-sm transition-all"
            disabled={isLoading}
          />

          <div className="absolute right-3 bottom-1/2 transform translate-y-1/2 flex items-center gap-2">
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setShowBetaAlert(true);
                  setTimeout(() => setShowBetaAlert(false), 2000);
                }}
                className="p-2 rounded-xl transition-colors hover:bg-white/5 text-gray-400 cursor-not-allowed"
                title="Voice input (coming soon)"
                disabled
              >
                <Mic size={20} />
              </button>
              {showBetaAlert && (
                <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-black/90 text-white text-xs py-1.5 px-3 rounded-full border border-white/10 shadow-xl">
                  🧪 Voice input coming soon
                </div>
              )}
            </div>
            <button
              type="submit"
              className="p-2.5 rounded-xl bg-blue-500 text-white hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm shadow-blue-500/20"
              aria-label="Send message"
              disabled={!message.trim() || isLoading}
            >
              {isLoading ? (
                <Loader2 size={20} className="animate-spin" />
              ) : (
                <ArrowUp size={20} />
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ChatInput;
