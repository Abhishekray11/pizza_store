import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../services/authService";

import {
  Container,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Alert,
  Box,
  MenuItem,
} from "@mui/material";

import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer",
  });

  const [error, setError] = useState("");

  const navigate = useNavigate();


  
  const handleRegister = async (e) => {
  e.preventDefault();

  setError("");

  // Name validation
  if (!form.name.trim()) {
    return setError("Name is required.");
  }

  if (form.name.trim().length < 3) {
    return setError(
      "Name must be at least 3 characters."
    );
  }

  // Email validation
  const emailRegex =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(form.email)) {
    return setError(
      "Please enter a valid email address."
    );
  }

  // Password validation
  if (form.password.length < 6) {
    return setError(
      "Password must be at least 6 characters."
    );
  }

  // Strong password validation
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;

  if (!passwordRegex.test(form.password)) {
    return setError(
      "Password must contain uppercase, lowercase and a number."
    );
  }

  try {
    await register(form);
    navigate("/login");
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
          maxWidth: 550,

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
            <PersonAddAlt1Icon
              sx={{
                fontSize: 55,
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
            Create Account
          </Typography>

          <Typography
            align="center"
            sx={{
              color: "#b8c7e0",
              mb: 4,
            }}
          >
            Join Pizzeria and start ordering your
            favorite pizzas.
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
            onSubmit={handleRegister}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
            }}
          >
            <TextField
              label="Full Name"
              fullWidth
              value={form.name}
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value,
                })
              }
              sx={inputStyle}
            />

            <TextField
              label="Email Address"
              type="email"
              fullWidth
              value={form.email}
              error={
                form.email &&
                !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
                  form.email
                )
              }
              helperText={
                form.email &&
                !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
                  form.email
                )
                  ? "Invalid email format"
                  : ""
              }
              onChange={(e) =>
                setForm({
                  ...form,
                  email: e.target.value,
                })
              }
              sx={inputStyle}
            />

            <TextField
              label="Password"
              type="password"
              fullWidth
              value={form.password}
              error={
                form.password &&
                form.password.length < 6
              }
              helperText={
                form.password &&
                form.password.length < 6
                  ? "Minimum 6 characters"
                  : ""
              }
              onChange={(e) =>
                setForm({
                  ...form,
                  password: e.target.value,
                })
              }
              sx={inputStyle}
            />

            <TextField
              select
              label="Account Type"
              value={form.role}
              onChange={(e) =>
                setForm({
                  ...form,
                  role: e.target.value,
                })
              }
              sx={inputStyle}
            >
              <MenuItem value="customer">
                Customer
              </MenuItem>

              <MenuItem value="admin">
                Admin
              </MenuItem>
            </TextField>

            <Button
              type="submit"
              variant="contained"
              size="large"
              sx={{
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
              Create Account
            </Button>
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
