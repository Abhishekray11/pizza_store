import React from "react";
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
} from "@mui/material";

import LocalPizzaIcon from "@mui/icons-material/LocalPizza";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";

export default function About() {
  const features = [
    {
      title: "Authentic Recipes",
      icon: <LocalPizzaIcon fontSize="large" />,
      desc: "Traditional Italian recipes crafted with passion and premium ingredients.",
    },
    {
      title: "Award Winning",
      icon: <EmojiEventsIcon fontSize="large" />,
      desc: "Recognized for exceptional taste, quality and customer satisfaction.",
    },
    {
      title: "Fast Delivery",
      icon: <DeliveryDiningIcon fontSize="large" />,
      desc: "Hot and fresh pizzas delivered quickly to your doorstep.",
    },
  ];

  return (
    <Container
      maxWidth="lg"
      sx={{
        py: 10,
        color: "#fff",
      }}
    >
      {/* Heading */}

      <Box textAlign="center" mb={8}>
        <Typography
        align="center"
          variant="h3"
          sx={{
            fontWeight: 700,
            mb: 2,
          }}
        >
          About Pizzeria
        </Typography>

        <Typography
            align="center"
          sx={{
            color: "#b8c7e0",
            maxWidth: 800,
            mx: "auto",
            fontSize: "1.1rem",
            mb: 4,
          }}
        >
          Bringing authentic Italian flavors to pizza lovers
          with handcrafted recipes, premium ingredients and
          exceptional customer service.
        </Typography>
      </Box>

      {/* Story Section */}

      <Box
        sx={{
          p: 3,
          borderRadius: "24px",
          background: "rgba(255,255,255,0.04)",
          backdropFilter: "blur(16px)",
          border: "1px solid rgba(66,133,244,0.15)",
          boxShadow:
            "0 0 25px rgba(66,133,244,0.12)",
          mb: 8,
        }}
      >
        <Typography
          variant="h5"
          sx={{
            mb: 3,
            fontWeight: 600,
          }}
        >
          Our Story
        </Typography>

        <Typography
          sx={{
            color: "#c5d2e8",
            lineHeight: 2,
          }}
        >
          Since our beginning, Pizzeria has been committed
          to creating unforgettable dining experiences.
          Every pizza is handcrafted using carefully selected
          ingredients, traditional Italian techniques and a
          passion for excellence. From classic Margherita to
          specialty gourmet creations, we ensure every bite
          delivers exceptional flavor and quality.
        </Typography>
      </Box>

      {/* Features */}

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            md: "repeat(3,1fr)",
          },
          gap: 4,
          mb: 8,
        }}
      >
        {features.map((item) => (
          <Card
            key={item.title}
            sx={{
              background: "rgba(255,255,255,0.04)",
              backdropFilter: "blur(16px)",
              border:
                "1px solid rgba(66,133,244,0.15)",
              borderRadius: "24px",
              color: "#fff",

              "&:hover": {
                boxShadow:
                  "0 0 30px rgba(66,133,244,0.35)",
                transform: "translateY(-8px)",
              },

              transition: "all .3s ease",
            }}
          >
            <CardContent
              sx={{
                p: 4,
                textAlign: "center",
              }}
            >
              <Box
                sx={{
                  color: "#4285F4",
                  mb: 2,
                }}
              >
                {item.icon}
              </Box>

              <Typography
                variant="h6"
                mb={2}
              >
                {item.title}
              </Typography>

              <Typography
                sx={{
                  color: "#b8c7e0",
                }}
              >
                {item.desc}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Stats */}

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(2,1fr)",
            md: "repeat(4,1fr)",
          },
          gap: 3,
        }}
      >
        {[
          {
            number: "50K+",
            label: "Orders Served",
          },
          {
            number: "25+",
            label: "Pizza Varieties",
          },
          {
            number: "15+",
            label: "Years Experience",
          },
          {
            number: "4.9★",
            label: "Customer Rating",
          },
        ].map((item) => (
          <Box
            key={item.label}
            sx={{
              textAlign: "center",
              p: 4,
              borderRadius: "20px",
              background:
                "rgba(255,255,255,0.03)",
              border:
                "1px solid rgba(66,133,244,0.12)",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                color: "#4285F4",
                fontWeight: 700,
              }}
            >
              {item.number}
            </Typography>

            <Typography
              sx={{
                mt: 1,
                color: "#c5d2e8",
              }}
            >
              {item.label}
            </Typography>
          </Box>
        ))}
      </Box>
    </Container>
  );
}