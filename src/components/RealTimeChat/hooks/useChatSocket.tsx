import { useEffect, useState, useRef } from "react";
import { io, Socket } from "socket.io-client";

interface Message {
  senderId: number;
  receiverId: number;
  text: string;
  timestamp: string;
}

const SOCKET_SERVER_URL = "http://localhost:8000"; // update if different

const useChatSocket = (chatRoomId: string, userId: number) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (!chatRoomId || !userId) return;

    socketRef.current = io(SOCKET_SERVER_URL, {
      query: { room: chatRoomId, userId },
    });

    socketRef.current.on("receive_message", (message: Message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, [chatRoomId, userId]);

  const sendMessage = (text: string, receiverId: number) => {
    const message: Message = {
      senderId: userId,
      receiverId,
      text,
      timestamp: new Date().toISOString(),
    };

    socketRef.current?.emit("send_message", { room: chatRoomId, message });
    setMessages((prev) => [...prev, message]);
  };

  return { messages, sendMessage };
};

export default useChatSocket;
