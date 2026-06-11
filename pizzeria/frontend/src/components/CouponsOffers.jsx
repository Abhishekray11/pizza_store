import React from "react";
import { Box, Container, Typography } from "@mui/material";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

import offer1 from "../assets/offers/offer1.jpg";
import offer2 from "../assets/offers/offer2.jpg";
import offer3 from "../assets/offers/offer3.jpg";
import offer4 from "../assets/offers/offer4.jpg";
import offer5 from "../assets/offers/offer5.jpg";
import offer6 from "../assets/offers/offer6.jpg";

const offers = [
  { id: 1, image: offer1 },
  { id: 2, image: offer2 },
  { id: 3, image: offer3 },
  { id: 4, image: offer4 },
  { id: 5, image: offer5 },
  { id: 6, image: offer6 },
];

function CouponsOffers() {
  return (
    <Box
      sx={{
        background: "#050816",
        py: { xs: 4, md: 6 }, // Enhanced padding so section has room to breathe
      }}
    >
      <Container maxWidth="xl" sx={{ px: { xs: 3, sm: 4, md: 6 } }}>
        <Typography
          sx={{
            color: "#6f89a8",
            fontSize: {
              xs: "1.2rem", // Scale up slightly on mobile to avoid looking blank
              sm: "1.4rem",
              md: "1.6rem",
              lg: "1.8rem",
            },
            fontWeight: 700,
            mb: 3,
            textAlign: { xs: "center", sm: "left" }, // Center aligned on phones for clean composition
            letterSpacing: "0.5px"
          }}
        >
          Coupons & Offers
        </Typography>

        <Swiper
          modules={[Autoplay]}
          loop
          speed={800}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          spaceBetween={20} // Optimized item separation gap
          breakpoints={{
            // Mobile portrait phones
            0: {
              slidesPerView: 1,
              spaceBetween: 15,
            },
            // Tablets and broad phablets
            550: {
              slidesPerView: 2,
              spaceBetween: 15,
            },
            // Standard laptops and small monitors
            950: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            // Large widescreen monitors - utilizes full screen space beautifully
            1400: {
              slidesPerView: 4,
              spaceBetween: 25,
            },
          }}
          style={{ width: "100%", padding: "4px" }}
        >
          {offers.map((offer) => (
            <SwiperSlide key={offer.id}>
              <Box
                sx={{
                  overflow: "hidden",
                  cursor: "pointer",
                  borderRadius: "16px", // Softer curves matching contemporary dashboard visuals
                  boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
                  background: "rgba(255,255,255,0.02)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 8px 30px rgba(66,133,244,0.25)",
                  }
                }}
              >
                <Box
                  component="img"
                  src={offer.image}
                  alt={`Offer ${offer.id}`}
                  sx={{
                    width: "100%",
                    // Scaled heights across breakpoints prevents empty squishing or awkward image stretching
                    height: { xs: 180, sm: 200, md: 220, lg: 240 },
                    objectFit: "cover",
                    display: "block",
                    transition: "transform 0.5s ease",
                    "&:hover": {
                      transform: "scale(1.04)",
                    },
                  }}
                />
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </Box>
  );
}

export default CouponsOffers;