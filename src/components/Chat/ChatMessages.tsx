import React, { useEffect, useRef } from "react";
import helgaAvatar from "../../assets/images/helga-avatar.jpg";
import TypingIndicator from "./TypingIndicator";

interface ChatMessagesProps {
  messages: Array<{ text: string; sender: "user" | "bot" }>;
  isTyping?: boolean;
}

const ChatMessages: React.FC<ChatMessagesProps> = ({
  messages,
  isTyping = false,
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]); // Scroll when messages change or typing starts/stops

  // Format text to handle different types of content
  const formatText = (text: string) => {
    // Split text by double newlines to handle paragraphs
    const paragraphs = text.split(/\n\n+/);

    return paragraphs.map((paragraph, index) => {
      // Handle code blocks
      if (paragraph.startsWith("```") && paragraph.endsWith("```")) {
        const code = paragraph.slice(3, -3);
        return (
          <pre
            key={index}
            className="bg-gray-900 rounded-md p-3 my-2 overflow-x-auto"
          >
            <code>{code}</code>
          </pre>
        );
      }

      // Handle inline code
      if (paragraph.includes("`")) {
        const parts = paragraph.split(/(`[^`]+`)/);
        return (
          <p key={index} className="mb-3 last:mb-0">
            {parts.map((part, i) => {
              if (part.startsWith("`") && part.endsWith("`")) {
                return (
                  <code key={i} className="bg-gray-800 rounded px-1">
                    {part.slice(1, -1)}
                  </code>
                );
              }
              return part;
            })}
          </p>
        );
      }

      // Handle lists
      if (paragraph.includes("\n")) {
        const lines = paragraph.split("\n");
        const isList = lines.some(
          (line) =>
            line.trim().startsWith("-") ||
            line.trim().startsWith("•") ||
            line.trim().match(/^\d+\./)
        );

        if (isList) {
          return (
            <div key={index} className="mb-3">
              {lines.map((line, lineIndex) => {
                const trimmedLine = line.trim();
                if (
                  trimmedLine.startsWith("-") ||
                  trimmedLine.startsWith("•")
                ) {
                  return (
                    <div
                      key={lineIndex}
                      className="flex items-start space-x-2 mb-1"
                    >
                      <span>•</span>
                      <span>{trimmedLine.slice(1).trim()}</span>
                    </div>
                  );
                }
                if (trimmedLine.match(/^\d+\./)) {
                  const [number, ...rest] = trimmedLine.split(".");
                  return (
                    <div
                      key={lineIndex}
                      className="flex items-start space-x-2 mb-1"
                    >
                      <span>{number}.</span>
                      <span>{rest.join(".").trim()}</span>
                    </div>
                  );
                }
                return (
                  <div key={lineIndex} className="mb-1">
                    {line}
                  </div>
                );
              })}
            </div>
          );
        }
      }

      // Regular paragraph
      return (
        <p key={index} className="mb-3 last:mb-0 leading-relaxed">
          {paragraph}
        </p>
      );
    });
  };

  return (
    <div className="w-full space-y-6 overflow-y-auto py-8">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`flex ${
            message.sender === "user" ? "justify-end" : "justify-start"
          }`}
        >
          <div
            className={`flex ${
              message.sender === "user" ? "flex-row-reverse" : "flex-row"
            } items-start space-x-3 ${
              message.sender === "user" ? "space-x-reverse" : ""
            }`}
          >
            {message.sender === "bot" && (
              <div className="flex-shrink-0">
                <img
                  src={helgaAvatar}
                  alt="Helga - German Tutor"
                  className="w-8 h-8 rounded-full object-cover shadow-md"
                />
              </div>
            )}
            <div
              className={`max-w-[80%] rounded-2xl px-5 py-3 shadow-sm ${
                message.sender === "user"
                  ? "bg-blue-500 text-white shadow-blue-500/20"
                  : "bg-[#1C1C1C] text-white shadow-black/20 border border-white/5"
              }`}
            >
              <div className="prose prose-invert prose-sm max-w-none">
                {formatText(message.text)}
              </div>
            </div>
          </div>
        </div>
      ))}
      {isTyping && (
        <div className="flex justify-start">
          <div className="flex flex-row items-start space-x-3">
            <div className="flex-shrink-0">
              <img
                src={helgaAvatar}
                alt="Helga - German Tutor"
                className="w-8 h-8 rounded-full object-cover shadow-md"
              />
            </div>
            <div className="bg-[#1C1C1C] rounded-2xl px-5 py-3 shadow-sm shadow-black/20 border border-white/5">
              <TypingIndicator />
            </div>
          </div>
        </div>
      )}
      <div ref={messagesEndRef} /> {/* Scroll anchor */}
    </div>
  );
};

export default ChatMessages;
