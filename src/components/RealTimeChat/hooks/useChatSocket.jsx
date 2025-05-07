import { useEffect, useRef, useState } from "react";
import axios from "axios";

const useChatSocket = (roomId, userId) => {
  const [messages, setMessages] = useState([]);
  const socketRef = useRef(null);

  const dedupeMessages = (arr) => {
    const seen = new Set();
    return arr.filter((msg) => {
      const idOrText = msg.id || msg.text + msg.timestamp;
      if (seen.has(idOrText)) return false;
      seen.add(idOrText);
      return true;
    });
  };

  useEffect(() => {
    axios
      .get(`/api/chat/${roomId}/messages/`)
      .then((res) =>
        setMessages((prev) => dedupeMessages([...prev, ...res.data]))
      )
      .catch((err) => console.error("Failed to fetch chat history:", err));
  }, [roomId]);

  useEffect(() => {
    const ws = new WebSocket(`ws://localhost:8000/ws/chat/${roomId}/`);
    socketRef.current = ws;

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMessages((prev) => dedupeMessages([...prev, data]));
    };

    ws.onclose = () => console.log("WebSocket disconnected");
    return () => ws.close();
  }, [roomId]);

  const sendMessage = (text) => {
    const newMsg = {
      sender: userId,
      text,
      timestamp: new Date().toISOString(),
    };
    socketRef.current.send(JSON.stringify(newMsg));
    setMessages((prev) => [...prev, newMsg]);
  };

  return { messages, sendMessage };
};

export default useChatSocket;
