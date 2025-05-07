import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Paper,
  IconButton,
  Typography,
} from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import CloseIcon from "@mui/icons-material/Close";
import useChatbot from "./hooks/useChatbot";

const ChatBotWidget = () => {
  const [open, setOpen] = useState(false);
  const [userInput, setUserInput] = useState("");
  const { messages, sendMessage } = useChatbot();

  return (
    <>
      <IconButton
        sx={{ position: "fixed", bottom: 20, right: 20, zIndex: 1000 }}
        color="primary"
        onClick={() => setOpen((prev) => !prev)}
      >
        <ChatIcon />
      </IconButton>

      {open && (
        <Paper
          elevation={6}
          sx={{
            position: "fixed",
            bottom: 80,
            right: 20,
            width: 300,
            height: 400,
            p: 2,
            display: "flex",
            flexDirection: "column",
            zIndex: 1000,
          }}
        >
          <Box sx={{ flexGrow: 1, overflowY: "auto", mb: 1 }}>
            {messages.map((msg, idx) => (
              <Typography
                key={idx}
                align={msg.from === "user" ? "right" : "left"}
                sx={{ mb: 1 }}
              >
                <b>{msg.from === "user" ? "You" : "Bot"}:</b> {msg.text}
              </Typography>
            ))}
          </Box>
          <TextField
            fullWidth
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessage(userInput);
                setUserInput("");
              }
            }}
            placeholder="Ask something..."
          />
          <Button
            onClick={() => {
              sendMessage(userInput);
              setUserInput("");
            }}
            variant="contained"
            fullWidth
            sx={{ mt: 1 }}
          >
            Send
          </Button>
          <IconButton
            sx={{ position: "absolute", top: 4, right: 4 }}
            onClick={() => setOpen(false)}
          >
            <CloseIcon />
          </IconButton>
        </Paper>
      )}
    </>
  );
};

export default ChatBotWidget;
