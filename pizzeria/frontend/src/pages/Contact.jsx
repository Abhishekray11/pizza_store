import React from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Grid,
} from "@mui/material";

import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocationOnIcon from "@mui/icons-material/LocationOn";

export default function Contact() {
  return (
    <Box sx={{ bgcolor: "#050816", minHeight: "90vh", py: { xs: 6, md: 10 } }}>
      <Container maxWidth="lg">
        {/* HEADER SECTION */}
        <Typography
          variant="h3"
          align="center"
          sx={{
            color: "#fff",
            fontWeight: 700,
            mb: 1,
            fontSize: { xs: "2.2rem", sm: "2.8rem", md: "3.5rem" },
            textShadow: "0 0 15px rgba(66,133,244,.4)",
          }}
        >
          Contact Us
        </Typography>
        
        <Typography
          align="center"
          sx={{
            color: "#b8c7e0",
            mb: { xs: 5, md: 7 },
            fontSize: { xs: "0.95rem", sm: "1.1rem" },
            maxWidth: "600px",
            mx: "auto",
            px: 2
          }}
        >
          Have a question about our menu, catering packages, or an active delivery order? Drop us a line below.
        </Typography>

        <Grid container spacing={{ xs: 4, lg: 6 }} justifyContent="center" alignItems="stretch">
          {/* LEFT COLUMN: EXTRA CONTACT FEATURES */}
          <Grid item xs={12} md={5} display="flex" flexDirection="column" justifyContent="center">
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3.5, px: { xs: 1, sm: 3 } }}>
              
              {/* Feature: Phone */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 2.5 }}>
                <Box sx={iconWrapperStyle}>
                  <PhoneIcon sx={{ color: "#4285F4" }} />
                </Box>
                <Box>
                  <Typography sx={featureTitleStyle}>Call Center</Typography>
                  <Typography sx={featureValueStyle}>1800 208 1234</Typography>
                </Box>
              </Box>

              {/* Feature: Email */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 2.5 }}>
                <Box sx={iconWrapperStyle}>
                  <EmailIcon sx={{ color: "#4285F4" }} />
                </Box>
                <Box>
                  <Typography sx={featureTitleStyle}>Email Support</Typography>
                  <Typography sx={featureValueStyle}>guestcare@pizzeria.com</Typography>
                </Box>
              </Box>

              {/* Feature: Hours */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 2.5 }}>
                <Box sx={iconWrapperStyle}>
                  <AccessTimeIcon sx={{ color: "#4285F4" }} />
                </Box>
                <Box>
                  <Typography sx={featureTitleStyle}>Kitchen Hours</Typography>
                  <Typography sx={featureValueStyle}>11:00 AM - 11:00 PM (Daily)</Typography>
                </Box>
              </Box>

              {/* Feature: Location */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 2.5 }}>
                <Box sx={iconWrapperStyle}>
                  <LocationOnIcon sx={{ color: "#4285F4" }} />
                </Box>
                <Box>
                  <Typography sx={featureTitleStyle}>Headquarters</Typography>
                  <Typography sx={featureValueStyle}>Jubilant FoodWorks Ltd, Noida, India</Typography>
                </Box>
              </Box>

            </Box>
          </Grid>

          {/* RIGHT COLUMN: COZY INPUT FORM CARD */}
          <Grid item xs={12} md={6} display="flex" justifyContent={{ xs: "center", md: "flex-start" }}>
            <Box
              component="form"
              sx={{
                background: "rgba(255,255,255,0.04)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(66,133,244,0.2)",
                borderRadius: "24px",
                p: { xs: 3.5, sm: 5 },
                boxShadow: "0 0 30px rgba(66,133,244,0.15)",
                width: "100%",
                maxWidth: "520px", // Constrains the width size perfectly to make it compact
              }}
            >
              <Typography variant="h5" sx={{ color: "#fff", fontWeight: 700, mb: 3 }}>
                Send us a Message
              </Typography>

              <TextField
                fullWidth
                label="Name"
                variant="outlined"
                sx={inputStyle}
              />

              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                sx={inputStyle}
              />

              <TextField
                fullWidth
                multiline
                rows={4}
                label="Message"
                variant="outlined"
                sx={inputStyle}
              />

              <Button
                fullWidth
                variant="contained"
                sx={{
                  mt: 1,
                  py: 1.5,
                  borderRadius: "14px",
                  background: "linear-gradient(90deg,#4285F4,#5B9DFF)",
                  boxShadow: "0 0 20px rgba(66,133,244,0.5)",
                  fontWeight: 600,
                  fontSize: "1rem",
                  textTransform: "none",
                  transition: "0.3s ease",
                  "&:hover": {
                    boxShadow: "0 0 30px rgba(66,133,244,0.8)",
                    transform: "translateY(-1px)",
                  },
                }}
              >
                Send Message
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

/* ========================= COMPONENT STYLES ========================= */

const inputStyle = {
  mb: 3,
  "& .MuiOutlinedInput-root": {
    color: "#fff",
    borderRadius: "14px",
    "& fieldset": {
      borderColor: "rgba(66,133,244,0.35)",
    },
    "&:hover fieldset": {
      borderColor: "#4285F4",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#4285F4",
      boxShadow: "0 0 15px rgba(66,133,244,0.6)",
    },
  },
  "& .MuiInputLabel-root": {
    color: "#b8c7e0",
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "#4285F4",
  },
};

const iconWrapperStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "50px",
  height: "50px",
  borderRadius: "14px",
  background: "rgba(66, 133, 244, 0.1)",
  border: "1px solid rgba(66, 133, 244, 0.25)",
  flexShrink: 0
};

const featureTitleStyle = {
  color: "#5f7287",
  fontSize: "14px",
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: "0.5px"
};

const featureValueStyle = {
  color: "#ffffff",
  fontSize: "16px",
  fontWeight: 500,
  mt: 0.2
};