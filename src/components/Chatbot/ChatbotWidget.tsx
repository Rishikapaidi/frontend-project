import React, { useState } from "react";
import useChatbot from "./hooks/useChatBot";

const ChatBotWidget: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [userInput, setUserInput] = useState("");
  const { messages, sendMessage } = useChatbot();

  const handleSend = () => {
    if (userInput.trim()) {
      sendMessage(userInput.trim());
      setUserInput("");
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => setOpen(!open)}
        className="bg-blue-600 text-white rounded-full w-12 h-12 text-xl"
      >
        💬
      </button>

      {open && (
        <div className="w-80 h-96 bg-white shadow-xl rounded p-4 mt-2 flex flex-col">
          <div className="flex-1 overflow-auto mb-2">
            {messages.map((msg, idx) => (
              <p
                key={idx}
                className={`text-sm mb-1 ${
                  msg.from === "user"
                    ? "text-right text-blue-600"
                    : "text-left text-gray-700"
                }`}
              >
                <b>{msg.from === "user" ? "You" : "Bot"}:</b> {msg.text}
              </p>
            ))}
          </div>
          <input
            className="border px-2 py-1 rounded w-full mb-2"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Ask something..."
          />
          <button
            onClick={handleSend}
            className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
          >
            Send
          </button>
        </div>
      )}
    </div>
  );
};

export default ChatBotWidget;
