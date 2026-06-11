
import React, { useState } from "react";
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  IconButton,
  Slide,
} from "@mui/material";

import ChatIcon from "@mui/icons-material/Chat";
import CloseIcon from "@mui/icons-material/Close";

export default function PizzeriaAIChat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // =========================
  // SEND MESSAGE (YOUR LOGIC UNCHANGED)
  // =========================
  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = input;

    setMessages((prev) => [...prev, { role: "user", text: userMsg }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMsg,
          userId: localStorage.getItem("userId"),
        }),
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        { role: "ai", text: data.reply },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: "⚠️ Server error. Try again later." },
      ]);
    }

    setLoading(false);
  };

  // =========================
  // UI
  // =========================
  return (
    <>
      {/* FLOATING BUTTON */}
      {!open && (
        <IconButton
          onClick={() => setOpen(true)}
          sx={{
            position: "fixed",
            bottom: 20,
            right: 20,
            width: 56,
            height: 56,
            background: "linear-gradient(135deg,#4285F4,#5B9DFF)",
            color: "#fff",
            boxShadow: "0 0 20px rgba(66,133,244,0.6)",
            transition: "0.3s",
            "&:hover": {
              transform: "scale(1.1)",
              boxShadow: "0 0 30px rgba(66,133,244,0.8)",
            },
          }}
        >
          <ChatIcon />
        </IconButton>
      )}

      {/* CHAT BOX */}
      <Slide direction="up" in={open} mountOnEnter unmountOnExit>
        <Paper
          sx={{
            position: "fixed",
            bottom: 20,
            right: 20,
            width: 300,
            height: 400,
            display: "flex",
            flexDirection: "column",
            borderRadius: 3,
            overflow: "hidden",
            background: "rgba(10,15,25,0.95)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(66,133,244,0.25)",
            boxShadow: "0 0 25px rgba(66,133,244,0.25)",
          }}
        >
          {/* HEADER */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              px: 1.5,
              py: 1,
              background: "linear-gradient(90deg,#4285F4,#5B9DFF)",
              color: "#fff",
            }}
          >
            <Typography sx={{ fontSize: 13, fontWeight: 700 }}>
              🍕 Pizzeria Support AI
            </Typography>

            <IconButton
              size="small"
              onClick={() => setOpen(false)}
              sx={{ color: "#fff" }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>

          {/* CHAT AREA */}
          <Box
            sx={{
              flex: 1,
              overflowY: "auto",
              p: 1,
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            {messages.map((m, i) => (
              <Box
                key={i}
                sx={{
                  display: "flex",
                  justifyContent:
                    m.role === "user" ? "flex-end" : "flex-start",
                }}
              >
                <Box
                  sx={{
                    px: 1.5,
                    py: 1,
                    fontSize: 12,
                    borderRadius: 2,
                    maxWidth: "80%",
                    whiteSpace: "pre-line",
                    background:
                      m.role === "user"
                        ? "linear-gradient(90deg,#4285F4,#5B9DFF)"
                        : "rgba(255,255,255,0.08)",
                    color: "#fff",
                    boxShadow:
                      m.role === "user"
                        ? "0 0 10px rgba(66,133,244,0.4)"
                        : "none",
                  }}
                >
                  {m.text}
                </Box>
              </Box>
            ))}

            {loading && (
              <Typography sx={{ color: "#aaa", fontSize: 12 }}>
                typing...
              </Typography>
            )}
          </Box>

          {/* INPUT */}
          <Box
            sx={{
              display: "flex",
              gap: 1,
              p: 1,
              borderTop: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <TextField
              size="small"
              fullWidth
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about order, menu..."
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              sx={{
                input: {
                  color: "#fff",
                  fontSize: 12,
                },
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                },
              }}
            />

            <Button
              size="small"
              variant="contained"
              onClick={sendMessage}
              sx={{
                background: "linear-gradient(90deg,#4285F4,#5B9DFF)",
                fontSize: 11,
                px: 2,
                boxShadow: "0 0 10px rgba(66,133,244,0.4)",
              }}
            >
              Send
            </Button>
          </Box>
        </Paper>
      </Slide>
    </>
  );
}