import React, { useState } from "react";
import { Box, TextField, IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const ChatInput = ({ onSend }) => {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (text.trim() !== "") {
      onSend(text.trim());
      setText("");
    }
  };

  return (
    <Box sx={{ display: "flex", p: 1 }}>
      <TextField
        fullWidth
        placeholder="Type a message..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
      />
      <IconButton onClick={handleSend} color="primary">
        <SendIcon />
      </IconButton>
    </Box>
  );
};

export default ChatInput;
