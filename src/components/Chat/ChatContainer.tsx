import React from "react";
import Greeting from "./Greeting";
import ChatInput from "./ChatInput";
import ChatMessages from "./ChatMessages";

interface ChatContainerProps {
  userName: string;
  modelName: string;
  messages: Array<{ text: string; sender: "user" | "bot" }>;
  onSendMessage: (message: string) => void;
  isLoading?: boolean;
}

const ChatContainer: React.FC<ChatContainerProps> = ({
  userName,
  modelName,
  messages,
  onSendMessage,
  isLoading = false,
}) => {
  return (
    <div className="relative z-10 flex-1 flex flex-col h-full py-8 px-4">
      <div className="flex-1 flex flex-col w-full max-w-4xl mx-auto h-full">
        <div className="flex-1 overflow-y-auto">
          <Greeting name={userName} />
          <ChatMessages messages={messages} isTyping={isLoading} />
        </div>
        <div className="mt-4">
          <ChatInput
            onSendMessage={onSendMessage}
            modelName={modelName}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatContainer;
