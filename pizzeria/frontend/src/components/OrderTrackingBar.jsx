import React from "react";
import { Box, Typography } from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";

export default function OrderTrackingBar({ status = "Pending" }) {
  const steps = [
    { label: "Placed", key: "Pending" },
    { label: "Preparing", key: "Accepted" },
    { label: "Dispatched", key: "Dispatched" },
    { label: "Delivered", key: "Delivered" },
  ];

  const getActiveIndex = () => {
    switch (status) {
      case "Pending":
        return 0;
      case "Accepted":
        return 1;
      case "Dispatched":
        return 2;
      case "Delivered":
        return 3;
      case "Rejected":
        return -1;
      default:
        return 0;
    }
  };

  const activeIndex = getActiveIndex();

  if (status === "Rejected") {
    return (
      <Typography sx={{ color: "#f44336", fontWeight: 700 }}>
        ❌ Order Rejected
      </Typography>
    );
  }

  const progressPercent =
    (activeIndex / (steps.length - 1)) * 100;

  return (
    <Box sx={{ width: "100%", mt: 8, position: "relative" }}>
      {/* BACK LINE */}
      <Box
        sx={{
          position: "absolute",
          top: "28px",
          left: 0,
          right: 0,
          height: 5,
          bgcolor: "rgba(255,255,255,0.08)",
          borderRadius: 10,
        }}
      />

      {/* ACTIVE LINE */}
      <Box
        sx={{
          position: "absolute",
          top: "28px",
          left: 0,
          height: 8,
          width: `${progressPercent}%`,
          bgcolor: "#4285F4",
          borderRadius: 10,
          transition: "width 0.8s ease-in-out",
          boxShadow: "0 0 18px rgba(66,133,244,0.6)",
        }}
      />

      {/* 🚚 MOVING TRUCK */}
      <Box
        sx={{
          position: "absolute",
          top: "8px",
          left: `calc(${progressPercent}% - 15px)`,
          transition: "left 0.8s ease-in-out",
          animation:
            status === "Accepted" ||
            status === "Dispatched"
              ? "bounce 1s infinite"
              : "none",
        }}
      >
        <LocalShippingIcon
          sx={{
            color: "#f44242",
            fontSize: 42,
            filter: "drop-shadow(0 0 6px rgba(66,133,244,0.7))",
          }}
        />
      </Box>

      {/* STEPS */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          position: "relative",
        }}
      >
        {steps.map((step, index) => {
          const isActive = index <= activeIndex;
          const isCurrent = index === activeIndex;

          return (
            <Box
              key={step.key}
              sx={{
                textAlign: "center",
                width: "0%",
              }}
            >
              {/* DOT */}
              <Box
                sx={{
                  width: 18,
                  height: 18,
                  borderRadius: "50%",
                  margin: "0 auto",
                  bgcolor: isActive ? "#4285F4" : "#2a2f45",
                  border: "2px solid #4285F4",
                  boxShadow: isCurrent
                    ? "0 0 20px rgba(66,133,244,0.9)"
                    : "none",
                  transition: "0.4s",
                  animation: isCurrent
                    ? "pulse 1.2s infinite"
                    : "none",
                }}
              />

              {/* LABEL */}
              <Typography
                sx={{
                  mt: 3,
                  fontSize: "0.75rem",
                  color: isActive ? "#fff" : "#777",
                  fontWeight: isActive ? 700 : 400,
                }}
              >
                {step.label}
              </Typography>
            </Box>
          );
        })}
      </Box>

      {/* CSS ANIMATIONS */}
      <style>
        {`
          @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-4px); }
          }

          @keyframes pulse {
            0% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.3); opacity: 0.6; }
            100% { transform: scale(1); opacity: 1; }
          }
        `}
      </style>
    </Box>
  );
}