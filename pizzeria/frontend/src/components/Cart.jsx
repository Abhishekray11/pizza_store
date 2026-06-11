
import React, { useState } from "react";
import {
  Grid,
  Typography,
  Card,
  CardContent,
  Button,
  Box,
  TextField,
  MenuItem,
  Divider,
  InputAdornment,
  Chip,
  IconButton,
} from "@mui/material";

// Deep path imports to prevent all Vite barrel-file caching bugs
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import SecurityIcon from "@mui/icons-material/Security";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import DeleteIcon from "@mui/icons-material/Delete"; 
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import StarIcon from "@mui/icons-material/Star";

import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { placeOrder } from "../services/orderService";

// Dummy pre-baked coupons list
const AVAILABLE_COUPONS = [
  { code: "PIZZA20", description: "20% OFF on all orders", type: "percent", value: 0.20 },
  { code: "PIZZERIA100", description: "Flat ₹100 OFF on your meal", type: "flat", value: 100 },
  { code: "FREESHIP", description: "Free shipping simulation", type: "flat", value: 0 }
];

export default function Cart() {
  const {
    cart,
    removeFromCart,
    clearCart,
    getCartTotal,
    increaseQuantity,
    decreaseQuantity,
  } = useCart();

  const [deliveryMode, setDeliveryMode] = useState("Delivery");
  const [paymentOption, setPaymentOption] = useState("UPI");
  
  // Coupon State parameters
  const [couponInput, setCouponInput] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState("");

  const navigate = useNavigate();

  // Price Calculation Logic
  const originalTotal = getCartTotal();
  let discountAmount = 0;
  
  if (appliedCoupon) {
    if (appliedCoupon.type === "percent") {
      discountAmount = originalTotal * appliedCoupon.value;
    } else if (appliedCoupon.type === "flat") {
      discountAmount = originalTotal > appliedCoupon.value ? appliedCoupon.value : originalTotal;
    }
  }
  
  const finalTotal = Math.max(0, originalTotal - discountAmount);

  const handleApplyCoupon = () => {
    setCouponError("");
    const found = AVAILABLE_COUPONS.find(
      (c) => c.code.toUpperCase() === couponInput.trim().toUpperCase()
    );

    if (!found) {
      setCouponError("Invalid coupon code");
      setAppliedCoupon(null);
      return;
    }
    if (originalTotal === 0) {
      setCouponError("Add items to activate coupons");
      return;
    }
    setAppliedCoupon(found);
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponInput("");
    setCouponError("");
  };

  const handleCheckout = async () => {
    if (!cart.length) {
      alert("Cart is empty");
      return;
    }

    try {
      await placeOrder({
        items: cart,
        totalAmount: finalTotal,
        deliveryMode,
        paymentOption,
        couponCode: appliedCoupon ? appliedCoupon.code : null,
      });

      alert("Order Placed Successfully");
      clearCart();
      navigate("/profile");
    } catch (err) {
      console.error("ORDER ERROR:", err);
      alert(err.message || "Something went wrong while placing your order.");
    }
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
      {/* Central Grid Row setup handles layout spaces cleanly */}
      <Grid container spacing={3} alignItems="stretch" sx={{ width: "100%", m: 0 }}>
        
        {/* BOX 1: BASKET ITEMS */}
        <Grid item xs={12} md={4} sx={{ display: "flex", flexDirection: "column" }}>
          <Box sx={{ mb: 2, display: "flex", alignItems: "center", justifyContent: { xs: "center", md: "flex-start" } }}>
            <ShoppingCartIcon sx={{ mr: 1, color: "#4285F4", fontSize: "1.6rem" }} />
            <Typography variant="h6" sx={{ color: "#fff", fontWeight: 700, textShadow: "0 0 15px rgba(66,133,244,.5)" }}>
              Your Basket
            </Typography>
          </Box>

          <Card sx={{ ...glassCard, flexGrow: 1, display: "flex", flexDirection: "column", width: "100%" }}>
            <CardContent sx={{ p: 2.5, flexGrow: 1, display: "flex", flexDirection: "column" }}>
              {cart.length === 0 ? (
                <Box sx={{ textAlign: "center", py: 5, my: "auto" }}>
                  <FastfoodIcon sx={{ color: "rgba(66,133,244,0.3)", fontSize: "45px", mb: 1.5 }} />
                  <Typography variant="body2" sx={{ color: "#fff", mb: 2, fontWeight: 600 }}>
                    Your basket is empty! 🍕
                  </Typography>
                  <Button
                    variant="contained"
                    onClick={() => navigate("/menu")}
                    sx={{
                      py: 0.8,
                      px: 2.5,
                      borderRadius: "30px",
                      fontSize: "0.75rem",
                      textTransform: "none",
                      background: "linear-gradient(90deg,#4285F4,#5B9DFF)",
                    }}
                  >
                    Explore Menu
                  </Button>
                </Box>
              ) : (
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5, maxHeight: "240px", overflowY: "auto", pr: 0.5 }}>
                  {cart.map((item) => (
                    <Box
                      key={item._id}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        p: 1.2,
                        borderRadius: "12px",
                        background: "rgba(255,255,255,0.02)",
                        border: "1px solid rgba(66,133,244,0.08)",
                        gap: 1
                      }}
                    >
                      <Box sx={{ overflow: "hidden", pr: 0.5 }}>
                        <Typography variant="body2" sx={{ color: "#fff", fontWeight: 700, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {item.name}
                        </Typography>
                        <Typography variant="caption" sx={{ color: "#4285F4", fontWeight: 700, display: "block", mt: 0.5 }}>
                          ₹{item.price} × {item.quantity}
                        </Typography>
                      </Box>

                      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, flexShrink: 0 }}>
                        <Box sx={{ display: "flex", alignItems: "center", bgcolor: "rgba(66,133,244,0.04)", p: "2px", borderRadius: "6px", border: "1px solid rgba(66,133,244,0.12)" }}>
                          <Button onClick={() => decreaseQuantity(item._id)} sx={qtyBtn}>
                            <RemoveIcon sx={{ fontSize: "10px" }} />
                          </Button>
                          <Typography sx={{ color: "#fff", fontWeight: 700, minWidth: 16, textAlign: "center", fontSize: "0.75rem" }}>
                            {item.quantity}
                          </Typography>
                          <Button onClick={() => increaseQuantity(item._id)} sx={qtyBtn}>
                            <AddIcon sx={{ fontSize: "10px" }} />
                          </Button>
                        </Box>

                        <IconButton 
                          color="error" 
                          onClick={() => removeFromCart(item._id)}
                          sx={{ border: "1px solid rgba(244,67,54,0.15)", borderRadius: "6px", p: "4px", bgcolor: "rgba(244,67,54,0.03)" }}
                        >
                          <DeleteIcon sx={{ fontSize: "14px" }} />
                        </IconButton>
                      </Box>
                    </Box>
                  ))}
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* BOX 2: VALUE ADDED SERVICES BENEFITS */}
        <Grid item xs={12} md={4} sx={{ display: "flex", flexDirection: "column" }}>
          <Box sx={{ mb: 2, display: "flex", alignItems: "center", justifyContent: { xs: "center", md: "flex-start" } }}>
            <LocalShippingIcon sx={{ mr: 1, color: "#4285F4", fontSize: "1.6rem" }} />
            <Typography variant="h6" sx={{ color: "#fff", fontWeight: 700, textShadow: "0 0 15px rgba(66,133,244,.5)" }}>
              Order Benefits
            </Typography>
          </Box>

          <Card sx={{ ...glassCard, flexGrow: 1, display: "flex", flexDirection: "column", width: "100%" }}>
            <CardContent sx={{ p: 3, flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <Box sx={benefitRow}>
                <Box sx={benefitIconBox}><LocalShippingIcon sx={{ color: "#4285F4", fontSize: "16px" }} /></Box>
                <Typography sx={benefitText}>Free Delivery Above ₹499</Typography>
              </Box>

              <Box sx={benefitRow}>
                <Box sx={benefitIconBox}><AccessTimeIcon sx={{ color: "#4285F4", fontSize: "16px" }} /></Box>
                <Typography sx={benefitText}>Delivery in 25-30 Mins</Typography>
              </Box>

              <Box sx={benefitRow}>
                <Box sx={benefitIconBox}><SecurityIcon sx={{ color: "#4285F4", fontSize: "16px" }} /></Box>
                <Typography sx={benefitText}>Secure Checkout Flow</Typography>
              </Box>

              <Box sx={{ ...benefitRow, mb: 0 }}>
                <Box sx={benefitIconBox}><ShoppingCartIcon sx={{ color: "#4285F4", fontSize: "16px" }} /></Box>
                <Typography sx={benefitText}>Fresh Hot Prepared Food</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* BOX 3: SUMMARY & CHECKOUT PANEL */}
        <Grid item xs={12} md={4} sx={{ display: "flex", flexDirection: "column" }}>
          <Box sx={{ mb: 2, display: "flex", alignItems: "center", justifyContent: { xs: "center", md: "flex-start" } }}>
            <LocalOfferIcon sx={{ mr: 1, color: "#4285F4", fontSize: "1.6rem" }} />
            <Typography variant="h6" sx={{ color: "#fff", fontWeight: 700, textShadow: "0 0 15px rgba(66,133,244,.5)" }}>
              Summary
            </Typography>
          </Box>

          <Card sx={{ ...glassCard, flexGrow: 1, display: "flex", flexDirection: "column", width: "100%" }}>
            <CardContent sx={{ p: 3, flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <Box>
                <TextField
                  select
                  fullWidth
                  label="Delivery Mode"
                  value={deliveryMode}
                  onChange={(e) => setDeliveryMode(e.target.value)}
                  sx={inputStyle}
                >
                  <MenuItem value="Delivery">Home Delivery</MenuItem>
                  <MenuItem value="Takeaway">Store Takeaway</MenuItem>
                </TextField>

                <TextField
                  select
                  fullWidth
                  label="Payment Option"
                  value={paymentOption}
                  onChange={(e) => setPaymentOption(e.target.value)}
                  sx={{ ...inputStyle, mt: 1.5, mb: 1.5 }}
                >
                  <MenuItem value="UPI">UPI</MenuItem>
                  <MenuItem value="Card">Card</MenuItem>
                  <MenuItem value="COD">COD</MenuItem>
                </TextField>

                <Divider sx={{ my: 1, borderColor: "rgba(255,255,255,.08)" }} />

                <Typography sx={{ color: "#fff", fontWeight: 600, fontSize: "0.8rem", mb: 0.5 }}>
                  Apply Coupon
                </Typography>
                
                <Box sx={{ display: "flex", gap: 1, mb: 1 }}>
                  <TextField
                    fullWidth
                    placeholder="PIZZA20"
                    value={couponInput}
                    disabled={!!appliedCoupon}
                    onChange={(e) => setCouponInput(e.target.value)}
                    error={!!couponError}
                    helperText={couponError}
                    sx={inputStyle}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LocalOfferIcon sx={{ color: "rgba(255,255,255,0.4)", fontSize: "0.9rem" }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                  {!appliedCoupon ? (
                    <Button
                      variant="contained"
                      onClick={handleApplyCoupon}
                      sx={{ borderRadius: "10px", px: 1.5, height: "40px", fontSize: "0.75rem", textTransform: "none", background: "rgba(66,133,244,0.15)", border: "1px solid #4285F4", color: "#fff", "&:hover": { background: "rgba(66,133,244,0.3)" } }}
                    >
                      Apply
                    </Button>
                  ) : (
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={handleRemoveCoupon}
                      sx={{ borderRadius: "10px", height: "40px", fontSize: "0.75rem", textTransform: "none" }}
                    >
                      Reset
                    </Button>
                  )}
                </Box>

                {appliedCoupon && (
                  <Chip
                    label={`${appliedCoupon.code} Applied`}
                    color="success"
                    variant="outlined"
                    onDelete={handleRemoveCoupon}
                    sx={{ mb: 1, color: "#4caf50", borderColor: "#4caf50", width: "100%", height: "26px", fontSize: "0.7rem", justifyContent: "space-between" }}
                  />
                )}
              </Box>

              {/* VALUATION BREAKDOWN */}
              <Box>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5, mb: 1 }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography variant="caption" sx={{ color: "#b8c7e0" }}>Subtotal ({cart.length})</Typography>
                    <Typography variant="caption" sx={{ color: "#fff" }}>₹{originalTotal}</Typography>
                  </Box>
                  
                  {discountAmount > 0 && (
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                      <Typography variant="caption" sx={{ color: "#4caf50" }}>Discount</Typography>
                      <Typography variant="caption" sx={{ color: "#4caf50" }}>- ₹{discountAmount}</Typography>
                    </Box>
                  )}
                  
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 0.5 }}>
                    <Typography variant="body2" sx={{ color: "#fff", fontWeight: 600 }}>Final Price</Typography>
                    <Typography sx={{ color: "#4285F4", fontWeight: 800, fontSize: "1.2rem" }}>
                      ₹{finalTotal}
                    </Typography>
                  </Box>
                </Box>

                <Button
                  fullWidth
                  variant="contained"
                  disabled={cart.length === 0}
                  onClick={handleCheckout}
                  sx={{
                    py: 1,
                    borderRadius: "10px",
                    background: "linear-gradient(90deg,#4285F4,#5B9DFF)",
                    boxShadow: "0 0 15px rgba(66,133,244,.4)",
                    fontWeight: 700,
                    textTransform: "none",
                    fontSize: "0.85rem",
                    "&:hover": { boxShadow: "0 0 25px rgba(66,133,244,.7)" },
                  }}
                >
                  Place Order
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* BOX 4: SPECIAL OFFERS & LOYALTY CLUB (100% Width on Desktop and Mobile) */}
        <Grid item xs={12} md={12} lg={12} sx={{ display: "flex", flexDirection: "column", mt: 1 }}>
          <Box sx={{ mb: 2, display: "flex", alignItems: "center", justifyContent: { xs: "center", md: "flex-start" } }}>
            <CardGiftcardIcon sx={{ mr: 1, color: "#4285F4", fontSize: "1.6rem" }} />
            <Typography variant="h6" sx={{ color: "#fff", fontWeight: 700, textShadow: "0 0 15px rgba(66,133,244,.5)" }}>
              Pizzeria Club Rewards
            </Typography>
          </Box>

          <Card sx={{ ...glassCard, width: "100%" }}>
            <CardContent sx={{ p: 3, display: "flex", flexDirection: { xs: "column", md: "row" }, alignItems: "center", justifyContent: "space-around", gap: 3 }}>
              <Box sx={{ textAlign: { xs: "center", md: "left" } }}>
                <Typography variant="body2" sx={{ color: "#fff", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: { xs: "center", md: "flex-start" }, gap: 0.5 }}>
                  <StarIcon sx={{ color: "#f5b041", fontSize: "18px" }} />
                  Loyalty Points Balance
                </Typography>
                <Typography variant="h4" sx={{ color: "#f5b041", fontWeight: 800, mt: 0.5 }}>
                  + {Math.floor(finalTotal / 10)} Points
                </Typography>
                <Typography variant="caption" sx={{ color: "#b8c7e0", display: "block", mt: 0.5 }}>
                  Earned at a rate of 1 point for every ₹10 spent on our menu deal structures.
                </Typography>
              </Box>

              <Divider orientation="vertical" flexItem sx={{ display: { xs: "none", md: "block" }, borderColor: "rgba(255,255,255,.08)" }} />
              <Divider sx={{ display: { xs: "block", md: "none" }, width: "100%", borderColor: "rgba(255,255,255,.08)" }} />

              <Box sx={{ bgcolor: "rgba(66,133,244,0.03)", p: 2, borderRadius: "10px", border: "1px solid rgba(66,133,244,0.15)", maxWidth: { xs: "100%", md: "50%" } }}>
                <Typography variant="caption" sx={{ color: "#5B9DFF", fontWeight: 700, display: "block", mb: 0.5, letterSpacing: 0.5 }}>
                  🎉 ACTIVE COMBO MULTIPLIER
                </Typography>
                <Typography variant="caption" sx={{ color: "#fff", display: "block", lineHeight: 1.4, fontSize: "0.78rem" }}>
                  Your current final subtotal qualified this transaction for entry into our Elite Tier club program. Check your updated account profile tab page for freshly unlocked exclusive surprise check-out badges!
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
      </Grid>
    </Box>
  );
}

/* ========================= CENTRALIZED BRAND STYLES ========================= */

const glassCard = {
  background: "rgba(255,255,255,0.04)",
  backdropFilter: "blur(20px)",
  border: "1px solid rgba(66,133,244,0.12)",
  borderRadius: "16px",
  boxShadow: "0 0 20px rgba(0,0,0,0.3)",
};

const qtyBtn = {
  minWidth: 18,
  width: 18,
  height: 18,
  borderRadius: "4px",
  color: "#fff",
  p: 0,
  border: "1px solid rgba(66,133,244,0.3)",
  background: "rgba(66,133,244,0.03)",
  "&:hover": {
    background: "rgba(66,133,244,0.15)",
    borderColor: "#4285F4"
  }
};

const benefitRow = {
  display: "flex",
  alignItems: "center",
  gap: 1.5,
  marginBottom: "16px",
};

const benefitIconBox = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "34px",
  height: "34px",
  borderRadius: "8px",
  background: "rgba(66, 133, 244, 0.06)",
  border: "1px solid rgba(66, 133, 244, 0.15)",
  flexShrink: 0
};

const benefitText = {
  color: "#fff",
  fontSize: "0.85rem",
  fontWeight: 500
};

const inputStyle = {
  "& .MuiOutlinedInput-root": {
    color: "#fff",
    borderRadius: "10px",
    height: "40px",
    fontSize: "0.85rem",
    "& fieldset": {
      borderColor: "rgba(66,133,244,.25)",
    },
    "&:hover fieldset": {
      borderColor: "#4285F4",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#4285F4",
      boxShadow: "0 0 10px rgba(66,133,244,.3)",
    },
  },
  "& .MuiInputLabel-root": {
    color: "#b8c7e0",
    fontSize: "0.85rem",
    transform: "translate(14px, 10px) scale(1)",
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "#4285F4",
    transform: "translate(14px, -6px) scale(0.75)",
  },
  "& .MuiInputLabel-root.MuiFormLabel-filled": {
    transform: "translate(14px, -6px) scale(0.75)",
  },
  "& .MuiFormHelperText-root": {
    color: "#f44336",
    marginLeft: "4px",
    fontSize: "0.7rem",
    marginTop: "2px"
  }
};