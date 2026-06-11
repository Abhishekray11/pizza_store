import React from "react";
import {
  Box,
  Container,
  Grid,
  Link,
  IconButton,
  Divider,
  Typography,
} from "@mui/material";

import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";

const footerData = {
  Menu: [
    "Veg Pizza",
    "Chicken Pizza",
    "Pasta",
    "Pizza Crust",
    "Beverages",
    "Pizza Mania",
    "Burger Pizza",
  ],

  Company: ["Blog", "Investor", "Ads"],

  "Pizza Restaurants": [
    "Restaurants Near Me",
    "Pizza Near Me",
    "Food Near Me",
    "Food Delivery",
    "Italian Food",
    "Order Food Online",
  ],

  About: [
    "Gift card",
    "Card Balance Enquiry",
    "FAQ",
    "Virtual Pizza Party",
    "E-Gift Vouchers",
  ],

  Legal: [
    "Disclaimer",
    "Terms & Conditions",
    "Privacy Policy",
  ],
};

const headingStyle = {
  color: "#5f7287",
  fontSize: { xs: "14px", sm: "17px" },
  fontWeight: 600,
  mb: { xs: 1, sm: 2 },
};

const linkStyle = {
  color: "#ffffff",
  fontSize: { xs: "13px", sm: "15px" },
  mb: { xs: 0.8, sm: 1.5 }, // Reduced bottom link padding to keep card heights low
  display: "block",
  textDecoration: "none",
  transition: "0.3s",
  "&:hover": {
    color: "#3da9fc",
  },
};

export default function Footer() {
  return (
    <Box
      sx={{
        background: "#050816",
        color: "#fff",
        pt: { xs: 2.5, md: 4 }, // Lowered top padding to drop layout height
        pb: 1.5, // Lowered bottom padding for compact posture
      }}
    >
      <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 4 } }}>
        <Grid
          container
          spacing={{ xs: 2, sm: 3 }}
          sx={{
            justifyContent: "space-between",
          }}
        >
          {/* Menu */}
          <Grid item xs={6} sm={4} md={2}>
            <Typography sx={headingStyle}>
              MENU
            </Typography>

            {footerData.Menu.map((item) => (
              <Link
                key={item}
                href="#"
                underline="none"
                sx={linkStyle}
              >
                {item}
              </Link>
            ))}
          </Grid>

          {/* Company */}
          <Grid item xs={6} sm={4} md={1.5}>
            <Typography sx={headingStyle}>
              COMPANY
            </Typography>

            {footerData.Company.map((item) => (
              <Link
                key={item}
                href="#"
                underline="none"
                sx={linkStyle}
              >
                {item}
              </Link>
            ))}
          </Grid>

          {/* Pizza Restaurants */}
          <Grid item xs={6} sm={4} md={2.2}>
            <Typography sx={headingStyle}>
              PIZZA RESTAURANTS
            </Typography>

            {footerData["Pizza Restaurants"].map((item) => (
              <Link
                key={item}
                href="#"
                underline="none"
                sx={linkStyle}
              >
                {item}
              </Link>
            ))}
          </Grid>

          {/* About */}
          <Grid item xs={6} sm={4} md={2}>
            <Typography sx={headingStyle}>
              ABOUT
            </Typography>

            {footerData.About.map((item) => (
              <Link
                key={item}
                href="#"
                underline="none"
                sx={linkStyle}
              >
                {item}
              </Link>
            ))}
          </Grid>

          {/* Legal */}
          <Grid item xs={6} sm={4} md={1.5}>
            <Typography sx={headingStyle}>
              LEGAL
            </Typography>

            {footerData.Legal.map((item) => (
              <Link
                key={item}
                href="#"
                underline="none"
                sx={linkStyle}
              >
                {item}
              </Link>
            ))}
          </Grid>

          {/* DYNAMIC FILLER SPACE SPANNERS FOR WIDESCREEN MONITORS */}
          {/* Automatically breaks line grids during fluid viewports to drop layouts beautifully */}
          <Grid item xs={0} sm={0} md={0.5} xl={1} />

          {/* Social */}
          {/* Shifted text alignment properties to match right-hand borders perfectly */}
          <Grid 
            item 
            xs={12} 
            sm={4} 
            md={2} 
            sx={{ 
              mt: { xs: 1, sm: 0 },
              display: "flex",
              flexDirection: "column",
              alignItems: { xs: "flex-start", sm: "flex-end" }, // Right-aligns columns on desktop
              textAlign: { xs: "left", sm: "right" }
            }}
          >
            <Typography sx={headingStyle}>
              SOCIAL
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 0.5,
                mb: { xs: 1.5, sm: 2.5 },
                justifyContent: { xs: "flex-start", sm: "flex-end" }
              }}
            >
              <IconButton sx={{ color: "#1877F2", p: 0.5, transition: "0.2s", "&:hover": { transform: "scale(1.1)" } }}>
                <FacebookIcon />
              </IconButton>
              <IconButton sx={{ color: "#1DA1F2", p: 0.5, transition: "0.2s", "&:hover": { transform: "scale(1.1)" } }}>
                <TwitterIcon />
              </IconButton>
              <IconButton sx={{ color: "#E1306C", p: 0.5, transition: "0.2s", "&:hover": { transform: "scale(1.1)" } }}>
                <InstagramIcon />
              </IconButton>
              <IconButton sx={{ color: "#FF0000", p: 0.5, transition: "0.2s", "&:hover": { transform: "scale(1.1)" } }}>
                <YouTubeIcon />
              </IconButton>
            </Box>

            <Box sx={{ width: "100%", maxWidth: 140, display: "flex", flexDirection: { xs: "row", sm: "column" }, gap: { xs: 1, sm: 0 } }}>
              <Box
                sx={{
                  background: "rgba(255, 183, 0, 0.15)",
                  border: "1px solid #ffb700",
                  color: "#ffb700",
                  fontWeight: "bold",
                  fontSize: "10px",
                  textAlign: "center",
                  py: 0.6,
                  borderRadius: 5,
                  mb: { xs: 0, sm: 1 },
                  letterSpacing: "0.5px",
                  flex: { xs: 1, sm: "initial" }
                }}
              >
                HELLO PIZZERIANS!
              </Box>

              <Box
                sx={{
                  background: "#a70bef",
                  color: "#fff",
                  textAlign: "center",
                  fontSize: "11px",
                  fontWeight: "bold",
                  py: 0.6,
                  borderRadius: 5,
                  boxShadow: "0 4px 10px rgba(167, 11, 239, 0.2)",
                  flex: { xs: 1, sm: "initial" }
                }}
              >
                1800 208 0000
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Divider
          sx={{
            mt: { xs: 2, md: 3 }, 
            mb: 2,
            borderColor: "rgba(255,255,255,0.06)",
          }}
        />

        <Typography
          align="center"
          sx={{
            color: "#5f7287",
            fontSize: { xs: "10px", sm: "12px" },
          }}
        >
          All Rights Reserved. Copyright © Jubilant FoodWorks Ltd.
        </Typography>
      </Container>
    </Box>
  );
}