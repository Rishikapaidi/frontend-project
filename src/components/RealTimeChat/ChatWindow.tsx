import React from "react";
import useChatSocket from "./hooks/useChatSocket";
import ChatInput from "./ChatInput";
import MessageBubble from "./MessageBubble";

interface ChatWindowProps {
  chatRoomId: string;
  userId: number;
  partnerId: number;
}

const ChatWindow: React.FC<ChatWindowProps> = ({
  chatRoomId,
  userId,
  partnerId,
}) => {
  const { messages, sendMessage } = useChatSocket(chatRoomId, userId);

  return (
    <div className="fixed bottom-20 right-4 w-96 h-[32rem] bg-white rounded shadow-lg flex flex-col z-50">
      <div className="bg-blue-600 text-white p-3 font-semibold rounded-t">
        Live Chat
      </div>
      <div className="flex-1 overflow-auto p-3 space-y-2">
        {messages.map((msg, idx) => (
          <MessageBubble
            key={idx}
            text={msg.text}
            isOwn={msg.senderId === userId}
          />
        ))}
      </div>
      <div className="border-t p-2">
        <ChatInput onSend={(text: string) => sendMessage(text, partnerId)} />
      </div>
    </div>
  );
};

export default ChatWindow;
