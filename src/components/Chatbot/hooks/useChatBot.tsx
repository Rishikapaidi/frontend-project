import { useState } from "react";
import axios from "axios";

const useChatbot = () => {
  const [messages, setMessages] = useState<
    { from: "user" | "bot"; text: string }[]
  >([]);

  const sendMessage = async (text: string) => {
    setMessages((prev) => [...prev, { from: "user", text }]);

    try {
      const res = await axios.post("/api/chatbot/", { prompt: text });
      const reply = res.data.reply || "No response.";
      setMessages((prev) => [...prev, { from: "bot", text: reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "Error getting response." },
      ]);
    }
  };

  return { messages, sendMessage };
};

export default useChatbot;
