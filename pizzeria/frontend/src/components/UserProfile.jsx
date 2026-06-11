import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Chip,
  Container,
  Divider,
  Grid,
  Rating, 
} from "@mui/material";

import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PaymentsIcon from "@mui/icons-material/Payments";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import StarIcon from "@mui/icons-material/Star";
import OrderTrackingBar from "../components/OrderTrackingBar";
import {
  getMyOrders,
  cancelOrder,
} from "../services/orderService";

export default function UserProfile() {
  const [myOrders, setMyOrders] = useState([]);
  const [ratings, setRatings] = useState({}); 

  useEffect(() => {
    fetchMyOrders();

    const interval = setInterval(
      fetchMyOrders,
      10000
    );

    return () => clearInterval(interval);
  }, []);

  const fetchMyOrders = async () => {
    try {
      const data = await getMyOrders();
      setMyOrders(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCancelOrder = async (orderId) => {
    try {
      await cancelOrder(orderId);
      fetchMyOrders();
    } catch (err) {
      console.error(err);
    }
  };

  const handleRatingChange = (orderId, newRating) => {
    setRatings((prev) => ({
      ...prev,
      [orderId]: newRating,
    }));
    console.log(`Order ${orderId} evaluated with score value:`, newRating);
  };

  const getStatusColor = (status) => {
    if (status === "Pending") return "#ff9800";
    if (status === "Accepted") return "#2196f3";
    if (status === "Rejected") return "#f44336";
    return "#4caf50";
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#050816",
        py: { xs: 3, md: 5 },
        px: { xs: 2, md: 4 },
        width: "100vw",
        boxSizing: "border-box",
        overflowX: "hidden"
      }}
    >
      <Box sx={{ width: "100%", m: 0, p: 0, boxSizing: "border-box" }}>
        <Typography
          variant="h4"
          sx={{
            color: "#fff",
            fontWeight: 700,
            mb: 3,
            fontSize: { xs: "1.3rem", sm: "1.6rem", md: "1.8rem" },
            textAlign: { xs: "center", md: "left" },
            textShadow: "0 0 15px rgba(66,133,244,.4)",
          }}
        >
          Your Order Tracking
        </Typography>

        {myOrders.length === 0 ? (
          <Card sx={{ ...glassCard, textAlign: "center", py: 5 }}>
            <CardContent>
              <Typography sx={{ color: "#b8c7e0", fontSize: "0.9rem" }}>
                No Active Orders Found 🍕
              </Typography>
            </CardContent>
          </Card>
        ) : (
          /* AUTO-WRAPPING GRID ROW: SITS IN 4 COLUMNS AND CREATES NEW ROWS FOR MORE ORDERS */
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              flexWrap: "wrap", // Unlocks multi-line wrapping so all 5+ items show up!
              gap: 3,
              width: "100%",
              boxSizing: "border-box",
            }}
          >
            {myOrders.map((order) => (
              <Box
                key={order.id || order._id}
                sx={{
                  // Automatically splits space into 4 equal blocks (25%) on large displays
                  flex: { xs: "1 1 100%", md: "0 0 calc(50% - 12px)", lg: "0 0 calc(25% - 18px)" },
                  width: "100%",
                  boxSizing: "border-box",
                  display: "flex",
                }}
              >
                <Card sx={{ ...glassCard, width: "100%", display: "flex", flexDirection: "column" }}>
                  <CardContent sx={{ p: 2, flexGrow: 1, display: "flex", flexDirection: "column", boxSizing: "border-box" }}>
                    
                    {/* CARD HEADER */}
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                      <Typography sx={{ color: "#fff", fontWeight: 700, fontSize: "0.8rem" }}>
                        Order #{ (order.id || order._id)?.substring(18) }
                      </Typography>
                      <Chip
                        label={order.status}
                        size="small"
                        sx={{
                          bgcolor: getStatusColor(order.status),
                          color: "#fff",
                          fontWeight: 700,
                          fontSize: "0.6rem",
                          height: "18px",
                        }}
                      />
                    </Box>

                    <Divider sx={{ my: 1, borderColor: "rgba(255,255,255,.05)" }} />

                    {/* METADATA RECEIPTS LIST */}
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 0.6, my: 0.5 }}>
                      <Box sx={infoRow}>
                        <ReceiptLongIcon sx={iconStyle} />
                        <Typography sx={whiteText}>Bill Total: <strong>₹{order.totalAmount}</strong></Typography>
                      </Box>
                      <Box sx={infoRow}>
                        <LocalShippingIcon sx={iconStyle} />
                        <Typography sx={whiteText}>{order.deliveryMode || "Home Delivery"}</Typography>
                      </Box>
                      <Box sx={infoRow}>
                        <PaymentsIcon sx={iconStyle} />
                        <Typography sx={whiteText}>Method: {order.paymentOption || "UPI"}</Typography>
                      </Box>
                      <Box sx={infoRow}>
                        <AccessTimeIcon sx={iconStyle} />
                        <Typography sx={whiteText}>Secured Food Delivery</Typography>
                      </Box>
                    </Box>

                    <Divider sx={{ my: 1, borderColor: "rgba(255,255,255,.05)" }} />

                    {/* LIVE PIPELINE PROGRESS STEPS */}
                    <Typography sx={{ color: "rgba(255,255,255,0.3)", fontWeight: 700, fontSize: "0.6rem", mb: 1, textTransform: "uppercase", letterSpacing: "0.5px" }}>
                      live order status
                    </Typography>
                    
                    <Box sx={{ width: "100%", px: 0.1, mb: 1, flexGrow: 1, display: "flex", alignItems: "center" }}>
                      <Box sx={{ width: "100%" }}>
                        <OrderTrackingBar status={order.status} />
                      </Box>
                    </Box>

                    <Divider sx={{ my: 1, borderColor: "rgba(255,255,255,.05)" }} />

                    {/* FUNCTIONAL 5-STAR RATING SYSTEM WIDGET COMPONENT */}
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0.2, mb: order.status === "Pending" ? 1 : 0 }}>
                      <Typography sx={{ color: "#6f89a8", fontSize: "0.7rem", fontWeight: 500 }}>
                        {ratings[order._id || order.id] ? "Thank you for rating!" : "Rate this order:"}
                      </Typography>
                      <Rating
                        name={`rating-${order._id || order.id}`}
                        value={ratings[order._id || order.id] || 0}
                        size="small"
                        onChange={(event, newValue) => {
                          handleRatingChange(order._id || order.id, newValue);
                        }}
                        emptyIcon={<StarIcon style={{ color: "rgba(255,255,255,0.1)" }} fontSize="inherit" />}
                        sx={{
                          "& .MuiRating-iconFilled": { color: "#ffb700" },
                          "& .MuiRating-iconHover": { color: "#ffd56a" },
                          fontSize: "1rem"
                        }}
                      />
                    </Box>

                    {/* ACTION TRIGGERS BAR */}
                    {order.status === "Pending" && (
                      <Box sx={{ width: "100%", mt: "auto" }}>
                        <Button
                          variant="contained"
                          color="error"
                          size="small"
                          fullWidth
                          onClick={() => handleCancelOrder(order.id || order._id)}
                          sx={{ borderRadius: "6px", fontWeight: 700, textTransform: "none", py: 0.4, fontSize: "0.7rem" }}
                        >
                          Cancel Order
                        </Button>
                      </Box>
                    )}

                  </CardContent>
                </Card>
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
}

/* ========================= CSS STYLE TOKENS ========================= */

const glassCard = {
  background: "rgba(255,255,255,0.03)",
  backdropFilter: "blur(20px)",
  border: "1px solid rgba(66,133,244,0.12)",
  borderRadius: "12px",
  boxShadow: "0 0 20px rgba(66,133,244,0.08)",
  transition: "transform .25s ease, box-shadow .25s ease",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 0 25px rgba(66,133,244,0.18)",
  },
};

const infoRow = {
  display: "flex",
  alignItems: "center",
  gap: 1,
};

const iconStyle = {
  color: "#4285F4",
  fontSize: "0.9rem",
};

const whiteText = {
  color: "#b8c7e0",
  fontSize: "0.75rem",
};