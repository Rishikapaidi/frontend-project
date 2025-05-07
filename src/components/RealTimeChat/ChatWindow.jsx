import React, { useEffect, useRef } from "react";
import { Box, Typography } from "@mui/material";
import useChatSocket from "./hooks/useChatSocket";
import ChatInput from "./ChatInput";
import MessageBubble from "./MessageBubble";

const ChatWindow = ({ chatRoomId, currentUserId }) => {
  const { messages, sendMessage } = useChatSocket(chatRoomId, currentUserId);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Box sx={{ flex: 1, overflowY: "auto", p: 2 }}>
        {messages.map((msg, i) => (
          <MessageBubble
            key={i}
            message={msg}
            isOwn={msg.sender === currentUserId}
          />
        ))}
        <div ref={bottomRef} />
      </Box>
      <ChatInput onSend={sendMessage} />
    </Box>
  );
};

export default ChatWindow;
