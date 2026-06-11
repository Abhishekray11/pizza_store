import React from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Box,
} from "@mui/material";

import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import CelebrationIcon from "@mui/icons-material/Celebration";
import LocalPizzaIcon from "@mui/icons-material/LocalPizza";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";

const services = [
  {
    title: "Fast Delivery",
    icon: <DeliveryDiningIcon sx={{ fontSize: 55 }} />,
    desc: "Quick and reliable delivery at your doorstep.",
  },
  {
    title: "Online Orders",
    icon: <ShoppingBagIcon sx={{ fontSize: 55 }} />,
    desc: "Order your favorite pizza anytime online.",
  },
  {
    title: "Party Catering",
    icon: <CelebrationIcon sx={{ fontSize: 55 }} />,
    desc: "Professional catering for parties and events.",
  },
  {
    title: "Fresh Ingredients",
    icon: <LocalPizzaIcon sx={{ fontSize: 55 }} />,
    desc: "Premium ingredients sourced fresh every day.",
  },
  {
    title: "24/7 Support",
    icon: <SupportAgentIcon sx={{ fontSize: 55 }} />,
    desc: "Dedicated customer support whenever needed.",
  },
  {
    title: "Custom Pizza",
    icon: <RestaurantMenuIcon sx={{ fontSize: 55 }} />,
    desc: "Build your own pizza with custom toppings.",
  },
];

export default function Services() {
  return (
    <Container
      maxWidth="xl"
      sx={{
        py: 12,
      }}
    >
      <Typography
        variant="h3"
        align="center"
        sx={{
          color: "#fff",
          fontWeight: 700,
          mb: 2,
        }}
      >
        Our Services
      </Typography>

      <Typography
        align="center"
        sx={{
          color: "#b8c7e0",
          mb: 8,
          maxWidth: 700,
          mx: "auto",
        }}
      >
        Enjoy premium pizza experiences with quality ingredients,
        fast delivery and exceptional customer service.
      </Typography>

      <Box
        sx={{
          display: "grid",

          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2,1fr)",
            lg: "repeat(3,1fr)",
          },

          gap: 4,

          maxWidth: "1200px",
          mx: "auto",
        }}
      >
        {services.map((service) => (
          <Card
            key={service.title}
            sx={{
              height: 260,

              borderRadius: "24px",

              background:
                "rgba(255,255,255,0.04)",

              backdropFilter: "blur(16px)",

              border:
                "1px solid rgba(66,133,244,0.15)",

              display: "flex",
              alignItems: "center",
              justifyContent: "center",

              transition: "all .3s ease",

              "&:hover": {
                transform: "translateY(-8px)",

                border:
                  "1px solid rgba(66,133,244,0.6)",

                boxShadow:
                  "0 0 30px rgba(66,133,244,0.35)",
              },
            }}
          >
            <CardContent
              sx={{
                textAlign: "center",
                px: 4,
              }}
            >
              <Box
                sx={{
                  color: "#4285F4",
                  mb: 2,
                }}
              >
                {service.icon}
              </Box>

              <Typography
                variant="h6"
                sx={{
                  color: "#fff",
                  fontWeight: 600,
                  mb: 2,
                }}
              >
                {service.title}
              </Typography>

              <Typography
                sx={{
                  color: "#b8c7e0",
                  fontSize: "0.95rem",
                  lineHeight: 1.7,
                }}
              >
                {service.desc}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Container>
  );
}