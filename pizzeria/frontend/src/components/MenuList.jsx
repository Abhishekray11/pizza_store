import React, { useState, useEffect } from "react";
import {
  Grid,
  TextField,
  Chip,
  Box,
  Card,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  useMediaQuery,
} from "@mui/material";
import { FilterList, CheckCircle } from "@mui/icons-material";

import { useCart } from "../context/CartContext";
import { getMenuItems } from "../services/menuService";

export default function MenuList() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all"); 

  // Mobile Menu Anchor State
  const [anchorEl, setAnchorEl] = useState(null);
  const isMobile = useMediaQuery("(max-width:768px)");
  const openMenu = Boolean(anchorEl);

  const { addToCart } = useCart();

  const categories = [
    "all",
    "pizza",
    "sides",
    "beverages",
    "combo",
    "new launches",
    "bestsellers",
    "50 % off zone",
    "20 % off zone ",
    "exclusive discount",
    "Premium zone",
  ];

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const data =
          category === "all"
            ? await getMenuItems() 
            : await getMenuItems(category); 
        setItems(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchMenu();
  }, [category]);

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleCategorySelect = (cat) => {
    setCategory(cat);
    handleMenuClose();
  };

  const limitToFourWords = (text) => {
    const fallbackText = "Delicious fresh pizza deal toppings";
    const cleanText = text && text.trim() ? text : fallbackText;
    const wordsArray = cleanText.split(/\s+/);
    if (wordsArray.length <= 4) return wordsArray.join(" ");
    return wordsArray.slice(0, 4).join(" ") + " ...";
  };

  return (
    <Box sx={{ minHeight: "100vh", px: { xs: 2, md: 4 }, py: 4, bgcolor: "#050816" }}>
      {/* Heading */}
      <Typography
        variant="h3"
        sx={{ color: "#fff", fontWeight: 700, mb: 1, textAlign: "center", textShadow: "0 0 15px rgba(66,133,244,.4)" }}
      >
        Our Menu
      </Typography>

      <Typography sx={{ color: "#b8c7e0", textAlign: "center", mb: 5 }}>
        Discover our handcrafted pizzas and delicious meals
      </Typography>

      {/* Search & Mobile Filter Bar Container */}
      <Box sx={{ display: "flex", gap: 1.5, alignItems: "center", mb: 4 }}>
        <TextField
          fullWidth
          placeholder="🔍 Search menu..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{
            "& .MuiOutlinedInput-root": {
              color: "#fff",
              borderRadius: "16px",
              background: "rgba(255,255,255,0.04)",
              backdropFilter: "blur(12px)",
              "& fieldset": { borderColor: "rgba(66,133,244,0.3)" },
              "&:hover fieldset": { borderColor: "#4285F4" },
              "&.Mui-focused fieldset": {
                borderColor: "#4285F4",
                boxShadow: "0 0 15px rgba(66,133,244,0.5)",
              },
            },
          }}
        />

        {/* MOBILE SINGLE ICON CATEGORY LAYOUT */}
        {isMobile && (
          <>
            <IconButton
              onClick={handleMenuOpen}
              sx={{
                background: "linear-gradient(90deg,#4285F4,#5B9DFF)",
                color: "#fff",
                borderRadius: "14px",
                p: 1.8,
                boxShadow: "0 0 15px rgba(66,133,244,0.4)",
              }}
            >
              <FilterList />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={openMenu}
              onClose={handleMenuClose}
              // This completely bypasses global default theme overrides for Popover roots
              slotProps={{
                paper: {
                  sx: {
                    backgroundColor: "#050816 !important", // Match page background
                    backgroundImage: "none !important",    // Clear elevation color shifts
                    border: "1px solid rgba(66,133,244,0.3)",
                    borderRadius: "16px",
                    maxHeight: "350px",
                    width: "220px",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.8)",
                  }
                }
              }}
              sx={{
                "& .MuiList-root": { p: 1 },
              }}
            >
              {/* Context Label Header */}
              <Typography 
                sx={{ 
                  px: 2, 
                  py: 1, 
                  color: "rgba(255,255,255,0.4) !important", 
                  fontSize: "0.72rem", 
                  fontWeight: 800, 
                  textTransform: "uppercase", 
                  letterSpacing: 1.2 
                }}
              >
                Select Category
              </Typography>
              
              {categories.map((cat) => (
                <MenuItem
                  key={cat}
                  onClick={() => handleCategorySelect(cat)}
                  sx={{
                    color: category === cat ? "#5B9DFF !important" : "#ffffff !important",
                    fontSize: "0.85rem",
                    fontWeight: category === cat ? 700 : 500,
                    borderRadius: "8px",
                    my: 0.3,
                    px: 2,
                    py: 1,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    textTransform: "uppercase",
                    "&.MuiButtonBase-root:hover": { 
                      backgroundColor: "rgba(66,133,244,0.2) !important" 
                    },
                  }}
                >
                  {cat}
                  {category === cat && (
                    <CheckCircle sx={{ fontSize: "16px", color: "#5B9DFF !important" }} />
                  )}
                </MenuItem>
              ))}
            </Menu>
          </>
        )}
      </Box>

      {/* DESKTOP CHIP CATEGORIES (Hidden on Mobile) */}
      {!isMobile && (
        <Box
          sx={{
            display: "flex",
            gap: 1.5,
            overflowX: "auto",
            pb: 3,
            mb: 4,
            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
          {categories.map((cat) => (
            <Chip
              key={cat}
              label={cat.toUpperCase()}
              onClick={() => setCategory(cat)}
              sx={{
                color: "#fff",
                fontWeight: 600,
                cursor: "pointer",
                background:
                  category === cat
                    ? "linear-gradient(90deg,#4285F4,#5B9DFF)"
                    : "rgba(255,255,255,0.05)",
                border: "1px solid rgba(66,133,244,0.25)",
                boxShadow: category === cat ? "0 0 20px rgba(66,133,244,0.4)" : "none",
                "&:hover": { boxShadow: "0 0 15px rgba(66,133,244,0.3)" },
              }}
            />
          ))}
        </Box>
      )}

      {/* DYNAMIC LIST CONTAINER SYSTEM */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          gap: { xs: 1.5, md: 3 },
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        {filteredItems.map((item) => (
          <Box
            key={item._id}
            sx={{
              flex: { xs: "0 0 100%", md: "1 1 calc(33.333% - 24px)", lg: "1 1 calc(25% - 24px)" },
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Card
              sx={{
                flexDirection: { xs: "row", md: "column" },
                height: { xs: "110px !important", md: "360px !important" },
                minHeight: { xs: "110px !important", md: "360px !important" },
                maxHeight: { xs: "110px !important", md: "360px !important" },
                width: "100%",
                display: "flex !important",
                background: "rgba(13, 21, 45, 0.6)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(66,133,244,0.15)",
                borderRadius: "16px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
                overflow: "hidden", 
                boxSizing: "border-box",
                position: "relative",
                transition: "transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "translateY(-4px)",
                  borderColor: "#4285F4",
                  boxShadow: "0 0 25px rgba(66,133,244,0.35)",
                },
              }}
            >
              {/* FIXED IMAGE BLOCK CONTAINER */}
              <Box
                sx={{
                  height: { xs: "100%", md: "150px !important" },
                  minHeight: { xs: "100%", md: "150px !important" },
                  maxHeight: { xs: "100%", md: "150px !important" },
                  width: { xs: "110px", md: "100%" }, 
                  flexShrink: 0,
                  overflow: "hidden",
                  background: "#0b1020",
                }}
              >
                <img
                  src={item.image || "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&auto=format&fit=crop&q=60"}
                  alt={item.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </Box>

              {/* DETAILS BLOCK */}
              <Box 
                sx={{ 
                  p: { xs: 1.5, md: 2.5 }, 
                  display: "flex", 
                  flexDirection: "column", 
                  justifyContent: { xs: "center", md: "flex-start" },
                  height: { xs: "100%", md: "130px !important" }, 
                  width: "100%",
                  boxSizing: "border-box",
                  overflow: "hidden",
                }}
              >
                {/* Product Name */}
                <Typography
                  variant="h6"
                  sx={{
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: { xs: "0.95rem", md: "1.02rem" },
                    mb: { xs: 0.5, md: 1 },
                    display: "-webkit-box",
                    WebkitLineClamp: 1,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {item.name}
                </Typography>

                {/* Description - Desktop Only */}
                <Typography
                  sx={{
                    display: { xs: "none", md: "-webkit-box" },
                    color: "#b8c7e0",
                    fontSize: "0.82rem",
                    lineHeight: 1.4,
                    height: "40px",
                    overflow: "hidden"
                  }}
                >
                  {limitToFourWords(item.description)}
                </Typography>

                {/* Mobile Inline Pricing & Quick Add */}
                <Box 
                  sx={{ 
                    display: { xs: "flex", md: "none" }, 
                    alignItems: "center", 
                    justifyContent: "space-between",
                    mt: 1,
                    width: "100%"
                  }}
                >
                  <Typography sx={{ color: "#4285F4", fontWeight: 800, fontSize: "1.1rem" }}>
                    ₹{item.price}
                  </Typography>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(item);
                    }}
                    sx={{
                      borderRadius: "8px",
                      px: 2,
                      height: "28px",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      textTransform: "none",
                      background: "linear-gradient(90deg,#4285F4,#5B9DFF)",
                    }}
                  >
                    Add
                  </Button>
                </Box>
              </Box>

              {/* ACTION FOOTER BAR (Desktop Only) */}
              <Box
                sx={{
                  display: { xs: "none", md: "flex" },
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  width: "100%",
                  height: "65px", 
                  minHeight: "65px",
                  maxHeight: "65px",
                  px: 2.5,
                  pb: 1.2,
                  justifyContent: "space-between",
                  alignItems: "center",
                  background: "linear-gradient(180deg, transparent 0%, rgba(5,8,22,0.95) 70%)",
                  boxSizing: "border-box",
                  zIndex: 2,
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ color: "#4285F4", fontWeight: 800, fontSize: "1.25rem" }}
                >
                  ₹{item.price}
                </Typography>

                <Button
                  variant="contained"
                  size="small"
                  onClick={() => addToCart(item)}
                  sx={{
                    borderRadius: "10px",
                    px: 3,
                    height: "34px",
                    fontWeight: 700,
                    textTransform: "none",
                    background: "linear-gradient(90deg,#4285F4,#5B9DFF)",
                    boxShadow: "0 0 15px rgba(66,133,244,0.3)",
                    "&:hover": {
                      boxShadow: "0 0 25px rgba(66,133,244,0.6)",
                    },
                  }}
                >
                  Add
                </Button>
              </Box>
            </Card>
          </Box>
        ))}
      </Box>
    </Box>
  );
}