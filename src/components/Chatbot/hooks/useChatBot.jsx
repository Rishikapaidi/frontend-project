import { useState } from "react";
import axios from "axios";

const useChatbot = () => {
  const [messages, setMessages] = useState([]);

  const sendMessage = async (text) => {
    const userMsg = { from: "user", text };
    setMessages((prev) => [...prev, userMsg]);

    try {
      const res = await axios.post("/api/chat/", { message: text });
      const botMsg = { from: "bot", text: res.data.reply };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "Sorry, something went wrong 🤖" },
      ]);
    }
  };

  return { messages, sendMessage };
};

export default useChatbot;
