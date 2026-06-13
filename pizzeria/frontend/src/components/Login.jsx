import React, { useState } from "react";
import { login } from "../services/authService";
import { useNavigate, Link as RouterLink } from "react-router-dom";

import {
  Container,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Alert,
  Box,
  Link,
} from "@mui/material";

import LoginIcon from "@mui/icons-material/Login";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
  e.preventDefault();

  setError("");

  // Required fields validation
  if (!email.trim() || !password.trim()) {
    return setError("All fields are required.");
  }

  // Email validation
  const emailRegex =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return setError(
      "Please enter a valid email address."
    );
  }

  // Password length validation
  if (password.length < 6) {
    return setError(
      "Password must be at least 6 characters."
    );
  }

  try {
    const data = await login(
      email,
      password
    );

    localStorage.setItem(
      "token",
      data.token
    );
    localStorage.setItem(
      "role",
      data.user.role
    );
    localStorage.setItem(
      "name",
      data.user.name
    );

    navigate(
      data.user.role === "admin"
        ? "/admin"
        : "/menu"
    );
  } catch (err) {
    setError(err.message);
  }
};

  return (
    <Container
      maxWidth="sm"
      sx={{
        minHeight: "90vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card
        sx={{
          width: "100%",
          maxWidth: 500,

          background:
            "rgba(255,255,255,0.04)",

          backdropFilter: "blur(20px)",

          border:
            "1px solid rgba(66,133,244,0.2)",

          borderRadius: "24px",

          boxShadow:
            "0 0 30px rgba(66,133,244,0.15)",

          transition: "0.3s",

          "&:hover": {
            boxShadow:
              "0 0 40px rgba(66,133,244,0.3)",
          },
        }}
      >
        <CardContent sx={{ p: 5 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mb: 3,
            }}
          >
            <LoginIcon
              sx={{
                fontSize: 50,
                color: "#4285F4",
              }}
            />
          </Box>

          <Typography
            variant="h4"
            align="center"
            sx={{
              color: "#fff",
              fontWeight: 700,
              mb: 1,
            }}
          >
            Welcome Back
          </Typography>

          <Typography
            align="center"
            sx={{
              color: "#b8c7e0",
              mb: 4,
            }}
          >
            Login to access your account
          </Typography>

          {error && (
            <Alert
              severity="error"
              sx={{ mb: 3 }}
            >
              {error}
            </Alert>
          )}

          <Box
            component="form"
            onSubmit={handleLogin}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
            }}
          >
                <TextField
                label="Email Address"
                type="email"
                fullWidth
                value={email}
                error={
                  email &&
                  !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
                }
                helperText={
                  email &&
                  !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
                    ? "Invalid email format"
                    : ""
                }
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                sx={inputStyle}
              />

            <TextField
                label="Password"
                type="password"
                fullWidth
                value={password}
                error={
                  password &&
                  password.length < 6
                }
                helperText={
                  password &&
                  password.length < 6
                    ? "Minimum 6 characters"
                    : ""
                }
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                sx={inputStyle}
              />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              sx={{
                mt: 1,
                py: 1.5,
                borderRadius: "14px",

                background:
                  "linear-gradient(90deg,#4285F4,#5B9DFF)",

                boxShadow:
                  "0 0 20px rgba(66,133,244,0.45)",

                fontWeight: 600,

                "&:hover": {
                  boxShadow:
                    "0 0 30px rgba(66,133,244,0.7)",
                },
              }}
            >
              Login
            </Button>

            <Typography
              align="center"
              sx={{
                color: "#b8c7e0",
              }}
            >
              New user?{" "}
              <Link
                component={RouterLink}
                to="/register"
                sx={{
                  color: "#4285F4",
                  textDecoration: "none",
                  fontWeight: 600,
                }}
              >
                Register Here
              </Link>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}

const inputStyle = {
  "& .MuiOutlinedInput-root": {
    color: "#fff",
    borderRadius: "14px",

    "& fieldset": {
      borderColor:
        "rgba(66,133,244,0.3)",
    },

    "&:hover fieldset": {
      borderColor: "#4285F4",
    },

    "&.Mui-focused fieldset": {
      borderColor: "#4285F4",
      boxShadow:
        "0 0 15px rgba(66,133,244,0.6)",
    },
  },

  "& .MuiInputLabel-root": {
    color: "#b8c7e0",
  },

  "& .MuiInputLabel-root.Mui-focused": {
    color: "#4285F4",
  },
};
