import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Typography,
  Grid,
  TextField,
  InputAdornment,
  Card,
  CardContent,
  Chip,
  Divider,
  Rating,
  Avatar,
} from "@mui/material";

import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import SearchIcon from "@mui/icons-material/Search";
import LocalPizzaIcon from "@mui/icons-material/LocalPizza";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import StorefrontIcon from "@mui/icons-material/Storefront";
import StarIcon from "@mui/icons-material/Star";

import chef from "../assets/bgg.png";

// Mock Data for 10-12 Nearby Stores
const MOCK_STORES = [
  { id: 1, name: "Pizzeria Corporate Hub", pin: "110001", zone: "Connaught Place, New Delhi", distance: "0.8 km", status: "Open Now" },
  { id: 2, name: "Pizzeria Metro Elite", pin: "110001", zone: "Barakhamba Road, New Delhi", distance: "1.4 km", status: "Open Now" },
  { id: 3, name: "Pizzeria Tech Park", pin: "560001", zone: "MG Road, Bengaluru", distance: "0.5 km", status: "Open Now" },
  { id: 4, name: "Pizzeria Silicon Junction", pin: "560001", zone: "Indiranagar, Bengaluru", distance: "2.1 km", status: "Open Now" },
  { id: 5, name: "Pizzeria Coastal Drive", pin: "400001", zone: "Fort, Mumbai", distance: "1.1 km", status: "Open Now" },
  { id: 6, name: "Pizzeria Sea Breeze", pin: "400001", zone: "Colaba, Mumbai", distance: "1.9 km", status: "Open Now" },
  { id: 7, name: "Pizzeria Heritage Square", pin: "600001", zone: "Parrys, Chennai", distance: "0.6 km", status: "Open Now" },
  { id: 8, name: "Pizzeria Southern Accent", pin: "600001", zone: "George Town, Chennai", distance: "1.8 km", status: "Open Now" },
  { id: 9, name: "Pizzeria Cultural Core", pin: "700001", zone: "Esplanade, Kolkata", distance: "0.4 km", status: "Open Now" },
  { id: 10, name: "Pizzeria Cyber City", pin: "122002", zone: "DLF Phase 3, Gurugram", distance: "1.2 km", status: "Open Now" },
  { id: 11, name: "Pizzeria Premium Galleria", pin: "122002", zone: "Golf Course Road, Gurugram", distance: "2.5 km", status: "Open Now" },
  { id: 12, name: "Pizzeria Hi-Tech Hub", pin: "500081", zone: "Madhapur, Hyderabad", distance: "0.9 km", status: "Open Now" }
];

// Mock Data for Professional Customer Reviews
const RESTAURANT_REVIEWS = [
  { id: 1, user: "Rohan Malhotra", initial: "R", rating: 5, time: "2 hours ago", comment: "Absolutely marvelous crust! The 25-minute delivery promise is real. Pizza was piping hot when it arrived." },
  { id: 2, user: "Priya Nair", initial: "P", rating: 5, time: "Yesterday", comment: "The Truffle Mushroom pizza is to die for. Premium packaging and incredible contactless delivery hygiene standard." },
  { id: 3, user: "Vikram Goel", initial: "V", rating: 4, time: "2 days ago", comment: "Authentic Italian wood-fired taste right at home. Best pepperoni cheese ratios I have seen in Delhi so far." },
  { id: 4, user: "Sneha Reddy", initial: "S", rating: 5, time: "3 days ago", comment: "Super convenient neighborhood store finder. Found a cloud outlet just 800m away. Crisp baseline crusts!" },
  { id: 5, user: "Amit Das", initial: "A", rating: 5, time: "4 days ago", comment: "Incredibly consistent taste standards. Order processing is automated and remarkably fast. Highly recommended." },
  { id: 6, user: "Ananya Misra", initial: "M", rating: 4, time: "A week ago", comment: "Excellent sourdough fermentation texture. The Roman Garden base options are filled with amazingly fresh garden greens." }
];

export default function Home() {
  const [pinCode, setPinCode] = useState("");
  const [filteredStores, setFilteredStores] = useState(MOCK_STORES.slice(0, 4));

  const handleStoreSearch = () => {
    if (!pinCode.trim()) {
      setFilteredStores(MOCK_STORES.slice(0, 4));
      return;
    }
    const searched = MOCK_STORES.filter(store => store.pin.includes(pinCode.trim()));
    setFilteredStores(searched);
  };

  return (
    <Box sx={{ bgcolor: "#050816", minHeight: "100vh", color: "#fff", overflow: "hidden" }}>
      
      {/* SECTION 1: HERO CONTAINER LANDING */}
      <Box
        sx={{
          minHeight: { xs: "auto", md: "90vh" },
          bgcolor: "#050816",
          display: "flex",
          alignItems: "center",
          width: "100%",
          py: { xs: 8, sm: 10, md: 0 },
          overflow: "hidden",
        }}
      >
        <Container maxWidth="xl" sx={{ px: { xs: 3, sm: 4, md: 6 } }}>
          <Grid container spacing={{ xs: 5, sm: 6, md: 4 }} sx={{ alignItems: "center", justifyContent: "space-between" }}>
            
            {/* HERO TEXT WRAPPER */}
            <Grid item xs={12} md={6} sx={{ textAlign: { xs: "center", md: "left" } }}>
              <Typography sx={{ color: "#f5b041", mb: 2, fontStyle: "italic", fontSize: { xs: "1rem", sm: "1.2rem" }, fontWeight: 500 }}>
                Best Pizza Brand In India
              </Typography>

              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: "1.8rem", sm: "2.6rem", md: "3.2rem", lg: "4rem" },
                  color: "#fff",
                  mb: 3,
                  fontWeight: 700,
                  lineHeight: { xs: 1.3, md: 1.2 },
                  fontFamily: "'Playfair Display', 'Georgia', 'cursive', serif",
                }}
              >
                The Tastiest &
                <br />
                Best Italiano
                <br />
                Pizza in{" "}
                <Box
                  component="span"
                  sx={{
                    display: "inline-block",
                    verticalAlign: "bottom",
                    width: "fit-content",
                    background: "linear-gradient(90deg,#f5b041,#ffd56a)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    textShadow: "0 0 20px rgba(245,176,65,0.4)",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    fontFamily: "inherit",
                    animation: "typing 3.5s steps(8, end) infinite",
                    "@keyframes typing": {
                      "0%": { width: "0" },
                      "50%": { width: "100%" },
                      "80%": { width: "100%" },
                      "100%": { width: "0" },
                    },
                  }}
                >
                  Pizzeria
                </Box>
              </Typography>

              <Typography sx={{ color: "#b0b0b0", mb: 4, maxWidth: "500px", mx: { xs: "auto", md: "0" }, fontSize: { xs: "0.95rem", sm: "1.05rem" }, lineHeight: 1.6 }}>
                Fresh ingredients, authentic Italian recipes, handcrafted pizzas and fast delivery right to your doorstep.
              </Typography>

              <Box sx={{ display: "flex", gap: 2, flexDirection: { xs: "column", sm: "row" }, justifyContent: { xs: "center", md: "flex-start" }, alignItems: "center" }}>
                <Button variant="contained" endIcon={<KeyboardArrowRightIcon />} sx={primaryBtn}>Order Now</Button>
                <Button variant="outlined" sx={secondaryBtn}>See Menu</Button>
              </Box>
            </Grid>

            {/* HERO IMAGE BLENDING */}
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  mt: { xs: 2, md: 0 },
                }}
              >
                <Box
                  component="img"
                  src={chef}
                  alt="chef"
                  sx={{
                    width: "100%",
                    maxWidth: { xs: "340px", sm: "480px", md: "550px", lg: "650px" },
                    height: "auto",
                    display: "block",
                    mx: "auto",
                    filter: "drop-shadow(0px 10px 30px rgba(0,0,0,0.5))",
                    transition: "transform 0.5s ease",
                    "&:hover": {
                      transform: "scale(1.02)",
                    },
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* SECTION 2: EXCELLENCE STANDARD */}
      <Box sx={{ py: { xs: 5, md: 6 }, borderTop: "1px solid rgba(255,255,255,0.05)", background: "rgba(255,255,255,0.01)" }}>
        <Container maxWidth="xl" sx={{ px: { xs: 3, sm: 4, md: 6 } }}>
          <Typography variant="h5" align="center" sx={{ fontWeight: 700, mb: 4, fontFamily: "'Playfair Display', serif", fontSize: { xs: "1.5rem", md: "2rem" } }}>
            The Pizzeria Excellence Standard
          </Typography>
          
          <Box 
            sx={{ 
              display: "flex", 
              gap: 3, 
              overflowX: "auto", 
              pb: 1,
              width: "100%",
              "&::-webkit-scrollbar": { height: "6px" },
              "&::-webkit-scrollbar-thumb": { background: "rgba(66,133,244,0.15)", borderRadius: "10px" }
            }}
          >
            <Box sx={{ ...pillarCardStyle, flex: { xs: "0 0 280px", sm: "1 1 33%" } }}>
              <LocalPizzaIcon sx={{ color: "#f5b041", fontSize: "2rem", mb: 1.5 }} />
              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>Hand-Tossed Oven Fresh</Typography>
              <Typography sx={{ color: "#b0b0b0", fontSize: "0.82rem", lineHeight: 1.5 }}>Our sourdough base is crafted freshly every day and blistered to golden perfection.</Typography>
            </Box>

            <Box sx={{ ...pillarCardStyle, flex: { xs: "0 0 280px", sm: "1 1 33%" } }}>
              <LocalShippingIcon sx={{ color: "#4285F4", fontSize: "2rem", mb: 1.5 }} />
              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>25-Min Blitz Fulfillment</Typography>
              <Typography sx={{ color: "#b0b0b0", fontSize: "0.82rem", lineHeight: 1.5 }}>Proximity logistics tracking connects hot blazing ovens to your tables inside 25 mins.</Typography>
            </Box>

            <Box sx={{ ...pillarCardStyle, flex: { xs: "0 0 280px", sm: "1 1 33%" } }}>
              <HealthAndSafetyIcon sx={{ color: "#4caf50", fontSize: "2rem", mb: 1.5 }} />
              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>Zero-Contact Hygiene</Typography>
              <Typography sx={{ color: "#b0b0b0", fontSize: "0.82rem", lineHeight: 1.5 }}>100% compliant medical safety checkups and deep sanitization metrics.</Typography>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* SECTION 3: STORE LOCATOR (UPDATED WITH SWIPE/SCROLL RESPONSIVENESS) */}
      <Box sx={{ py: { xs: 6, md: 10 }, borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <Container maxWidth="xl" sx={{ px: { xs: 3, sm: 4, md: 6 } }}>
          <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, justifyContent: "space-between", alignItems: { xs: "center", md: "flex-end" }, gap: 3, mb: 5 }}>
            <Box sx={{ textAlign: { xs: "center", md: "left" } }}>
              <Typography sx={{ color: "#4285F4", fontWeight: 600, textTransform: "uppercase", letterSpacing: "1px", mb: 1, fontSize: "0.85rem" }}>
                Real-Time Proximity Finder
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 700, fontFamily: "'Playfair Display', serif" }}>
                Locate Nearby Pizzerias
              </Typography>
            </Box>
            
            <Box sx={{ display: "flex", gap: 1.5, width: "100%", maxWidth: "450px" }}>
              <TextField
                fullWidth
                placeholder="Enter 6-Digit Area PIN Code (e.g., 110001)"
                size="small"
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)}
                sx={searchInputStyle}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <StorefrontIcon sx={{ color: "rgba(66,133,244,0.6)", fontSize: "1.2rem" }} />
                    </InputAdornment>
                  ),
                }}
              />
              <Button variant="contained" onClick={handleStoreSearch} sx={{ ...primaryBtn, mt: 0, height: "40px", borderRadius: "10px", px: 3 }}>
                Find
              </Button>
            </Box>
          </Box>

          {filteredStores.length === 0 ? (
            <Box sx={{ textAlign: "center", py: 5, background: "rgba(255,255,255,0.02)", borderRadius: "16px", border: "1px dashed rgba(255,255,255,0.1)" }}>
              <Typography sx={{ color: "#b0b0b0" }}>No store open yet tracking that PIN filter code. Try searching "110001", "560001" or "600001"!</Typography>
            </Box>
          ) : (
            /* DYNAMIC HORIZONTAL FLEX SCROLL COUPLER FOR STORES SECTION */
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                flexWrap: { xs: "nowrap", md: "wrap" }, // Locks items into a single row on mobile viewports
                gap: 3,
                overflowX: { xs: "auto", md: "visible" }, // Activates horizontal gesture tracks
                overflowY: "hidden",
                pb: { xs: 3, md: 0 },
                width: "100%",
                boxSizing: "border-box",
                scrollSnapType: { xs: "x mandatory", md: "none" },
                "&::-webkit-scrollbar": {
                  height: { xs: "6px", md: "0px" },
                },
                "&::-webkit-scrollbar-thumb": {
                  background: "rgba(66,133,244,0.2)",
                  borderRadius: "10px",
                },
              }}
            >
              {filteredStores.map((store) => (
                <Box
                  key={store.id}
                  sx={{
                    // Standardizes fixed card blocks for swiping actions
                    flex: { xs: "0 0 280px", sm: "0 0 310px", md: "0 0 calc(33.333% - 20px)", lg: "0 0 calc(25% - 20px)" },
                    maxWidth: { xs: "280px", sm: "310px", md: "100%" },
                    scrollSnapAlign: "start",
                  }}
                >
                  <Card sx={{ ...glassCardStyle, height: "100%" }}>
                    <CardContent sx={{ p: 3, display: "flex", flexDirection: "column", height: "100%", boxSizing: "border-box" }}>
                      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "#fff", lineHeight: 1.3 }}>
                          {store.name}
                        </Typography>
                        <Chip label={store.status} size="small" color="success" sx={{ fontSize: "0.65rem", height: "20px", fontWeight: 700 }} />
                      </Box>
                      <Typography sx={{ color: "#b0b0b0", fontSize: "0.85rem", mb: 2.5, minHeight: "40px" }}>
                        {store.zone} (PIN {store.pin})
                      </Typography>
                      <Divider sx={{ borderColor: "rgba(255,255,255,0.06)", mb: 2, mt: "auto" }} />
                      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Typography sx={{ color: "#4285F4", fontSize: "0.8rem", fontWeight: 600 }}>
                          Distance: {store.distance}
                        </Typography>
                        <Button size="small" variant="text" sx={{ color: "#f5b041", textTransform: "none", fontWeight: 700, p: 0 }}>
                          Get Directions →
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Box>
              ))}
            </Box>
          )}
        </Container>
      </Box>

      {/* SECTION 4: CUSTOMER REVIEWS */}
      <Box sx={{ py: { xs: 6, md: 10 }, borderTop: "1px solid rgba(255,255,255,0.05)", background: "linear-gradient(180deg, #000000 0%, #03050e 100%)" }}>
        <Container maxWidth="xl" sx={{ px: { xs: 3, sm: 4, md: 6 } }}>
          <Typography variant="h4" align="center" sx={{ fontWeight: 700, mb: 1.5, fontFamily: "'Playfair Display', serif", fontSize: { xs: "1.8rem", md: "2.4rem" } }}>
            Guest Experiences & Reviews
          </Typography>
          <Typography align="center" sx={{ color: "#b0b0b0", mb: 6, maxWidth: "550px", mx: "auto", fontSize: "0.95rem" }}>
            Real feedback collected automatically from food lovers who ordered our handcrafted items.
          </Typography>

          <Box
            sx={{
              display: "flex",
              gap: 3,
              overflowX: "auto",
              pb: 3,
              width: "100%",
              "&::-webkit-scrollbar": { height: "6px" },
              "&::-webkit-scrollbar-thumb": { background: "rgba(66,133,244,0.2)", borderRadius: "10px" }
            }}
          >
            {RESTAURANT_REVIEWS.map((review) => (
              <Box 
                key={review.id} 
                sx={{ 
                  flex: { xs: "0 0 290px", sm: "0 0 340px", md: "0 0 380px" }, 
                  height: "auto"
                }}
              >
                <Card sx={{ ...glassCardStyle, background: "rgba(255,255,255,0.02)", height: "100%", "&:hover": { borderColor: "rgba(66,133,244,0.3)" } }}>
                  <CardContent sx={{ p: 3, display: "flex", flexDirection: "column", height: "100%" }}>
                    
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                      <Avatar sx={{ bgcolor: "rgba(66,133,244,0.15)", color: "#4285F4", fontWeight: 700, fontSize: "0.95rem", width: 42, height: 42 }}>
                        {review.initial}
                      </Avatar>
                      <Box>
                        <Typography sx={{ color: "#fff", fontWeight: 700, fontSize: "0.95rem" }}>
                          {review.user}
                        </Typography>
                        <Typography sx={{ color: "rgba(255,255,255,0.35)", fontSize: "0.75rem" }}>
                          {review.time}
                        </Typography>
                      </Box>
                    </Box>

                    <Rating
                      name={`guest-review-${review.id}`}
                      value={review.rating}
                      readOnly
                      size="small"
                      emptyIcon={<StarIcon style={{ color: "rgba(255,255,255,0.1)" }} fontSize="inherit" />}
                      sx={{ mb: 2, "& .MuiRating-iconFilled": { color: "#ffb700" } }}
                    />

                    <Typography sx={{ color: "#b8c7e0", fontSize: "0.85rem", lineHeight: 1.6 }}>
                      "{review.comment}"
                    </Typography>

                  </CardContent>
                </Card>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

    </Box>
  );
}

/* ========================= COMPONENT SPECIFIC STYLES ========================= */

const primaryBtn = {
  bgcolor: "#fff",
  color: "#000",
  borderRadius: "30px",
  px: 4,
  py: 1.2,
  fontWeight: 600,
  width: { xs: "100%", sm: "auto" },
  minWidth: "160px",
  textTransform: "none",
  transition: "0.3s ease",
  "&:hover": { bgcolor: "#f5f5f5", transform: "translateY(-1px)" },
};

const secondaryBtn = {
  borderRadius: "30px",
  px: 4,
  py: 1.2,
  color: "#fff",
  borderColor: "#fff",
  fontWeight: 600,
  width: { xs: "100%", sm: "auto" },
  minWidth: "160px",
  textTransform: "none",
  transition: "0.3s ease",
  "&:hover": { borderColor: "#f5b041", color: "#f5b041", backgroundColor: "rgba(245,176,65,0.05)" },
};

const pillarCardStyle = {
  textAlign: "center",
  p: 2.5,
  borderRadius: "16px",
  border: "1px solid rgba(255,255,255,0.03)",
  background: "rgba(255,255,255,0.01)",
  transition: "transform 0.3s ease",
  "&:hover": { transform: "translateY(-2px)" }
};

const glassCardStyle = {
  background: "rgba(255,255,255,0.03)",
  backdropFilter: "blur(20px)",
  border: "1px solid rgba(66,133,244,0.15)",
  borderRadius: "16px",
  boxShadow: "0 0 25px rgba(0,0,0,0.4)",
  transition: "transform 0.3s ease, border-color 0.3s ease",
};

const searchInputStyle = {
  "& .MuiOutlinedInput-root": {
    color: "#fff",
    borderRadius: "10px",
    height: "40px",
    backgroundColor: "rgba(255,255,255,0.02)",
    "& fieldset": { borderColor: "rgba(66,133,244,.25)" },
    "&:hover fieldset": { borderColor: "#4285F4" },
    "&.Mui-focused fieldset": { borderColor: "#4285F4", boxShadow: "0 0 10px rgba(66,133,244,.3)" },
  },
};