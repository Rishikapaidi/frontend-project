import React from "react";

interface MessageBubbleProps {
  text: string;
  isOwn: boolean;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ text, isOwn }) => {
  return (
    <div
      className={`max-w-[75%] px-4 py-2 rounded-lg ${
        isOwn
          ? "bg-blue-100 text-right ml-auto text-blue-900"
          : "bg-gray-100 text-left mr-auto text-gray-900"
      }`}
    >
      {text}
    </div>
  );
};

export default MessageBubble;
