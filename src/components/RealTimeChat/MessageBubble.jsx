import React from "react";
import { Box, Typography, Paper } from "@mui/material";

const MessageBubble = ({ message, isOwn }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: isOwn ? "flex-end" : "flex-start",
        mb: 1,
      }}
    >
      <Paper
        elevation={1}
        sx={{
          maxWidth: "75%",
          p: 1,
          backgroundColor: isOwn ? "#d0f0fd" : "#f1f1f1",
        }}
      >
        <Typography variant="body2">{message.text}</Typography>
        <Typography variant="caption" sx={{ float: "right", mt: 0.5 }}>
          {new Date(message.timestamp).toLocaleTimeString()}
        </Typography>
      </Paper>
    </Box>
  );
};

export default MessageBubble;
