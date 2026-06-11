import React from "react";
import { Box, Typography } from "@mui/material";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import { motion } from "framer-motion";

const HelpSupport = () => {

    const phoneNumber = "917261866008";
    const message = "Hi, I need help regarding my order.";

    const handleClick = () => {
        const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(url, "_blank");
    };

    return (
        <Box
            sx={{
                position: "fixed",
                bottom: 30,
                left: 30,
                zIndex: 9999,
            }}
        >
            <motion.div
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "12px 18px",
                    borderRadius: "40px",
                    background: "linear-gradient(135deg, #0080a7, #00bcd4)",
                    color: "#fff",
                    cursor: "pointer",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
                }}
                onClick={handleClick}
            >
                <SupportAgentIcon />

                <Typography
                    sx={{
                        fontSize: 14,
                        fontWeight: 600,
                    }}
                >
                    Req Call
                </Typography>
            </motion.div>
        </Box>
    );
};

export default HelpSupport;