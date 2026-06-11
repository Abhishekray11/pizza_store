import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Badge,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  useMediaQuery,
  Divider,
} from "@mui/material";

import {
  LocalPizza,
  ShoppingCart,
  AccountCircle,
  Dashboard,
  Logout,
  ReceiptLong,
  Menu as MenuIcon,
  Home,
  RestaurantMenu,
  Info,
  ContactSupport,
  Login,
  PersonAdd,
  GetApp,
  RoomService,
} from "@mui/icons-material";

import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const { cart } = useCart();

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  // Responsive breakpoint
  const isMobile = useMediaQuery("(max-width:768px)");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const guestLinks = [
    { route: "/", text: "Home", icon: <Home /> },
    { route: "/services", text: "Services", icon: <RoomService /> },
    { route: "/about", text: "About Us", icon: <Info /> },
    { route: "/contact", text: "Contact", icon: <ContactSupport /> },
    { route: "/login", text: "Login", icon: <Login /> },
    { route: "/register", text: "Sign Up", icon: <PersonAdd /> },
  ];

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        background: "#050816",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <Toolbar
        sx={{
          py: 1,
          px: { xs: 2, md: 4 },
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <Box
          component={Link}
          to="/"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            textDecoration: "none",
            color: "#fff",
          }}
        >
          <LocalPizza sx={{ color: "#f5b041", fontSize: 32 }} />
          <Typography variant="h5" fontWeight="bold">
            Pizzeria
          </Typography>
        </Box>

        {/* Desktop Navbar */}
        {!isMobile && (
          <>
            {!token && (
              <Box sx={{ display: "flex", gap: 1.5, alignItems: "center" }}>
                {guestLinks.map((link) => (
                  <NavLink key={link.text} route={link.route} text={link.text} icon={link.icon} />
                ))}
                <Button
                  variant="contained"
                  startIcon={<GetApp />}
                  sx={{
                    ml: 3,
                    borderRadius: "30px",
                    px: 3,
                    bgcolor: "#fff",
                    color: "#000",
                    fontWeight: "bold",
                    "&:hover": { bgcolor: "#f5b041" },
                  }}
                >
                  Get App
                </Button>
              </Box>
            )}

            {token && role === "customer" && (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <NavLink route="/" text="Home" icon={<Home />} />
                <NavLink route="/menu" text="Menu" icon={<RestaurantMenu />} />
                <IconButton component={Link} to="/cart" sx={{ color: "#fff" }}>
                  <Badge badgeContent={cartCount} color="warning">
                    <ShoppingCart />
                  </Badge>
                </IconButton>
                <IconButton component={Link} to="/bills" sx={{ color: "#fff" }}>
                  <ReceiptLong />
                </IconButton>
                <IconButton component={Link} to="/profile" sx={{ color: "#fff" }}>
                  <AccountCircle />
                </IconButton>
                <Button
                  startIcon={<Logout />}
                  onClick={handleLogout}
                  variant="contained"
                  color="warning"
                  sx={{ borderRadius: "25px" }}
                >
                  Logout
                </Button>
              </Box>
            )}

            {token && role === "admin" && (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <NavLink route="/" text="Home" icon={<Home />} />
                <Button
                  component={Link}
                  to="/admin"
                  startIcon={<Dashboard />}
                  sx={{ color: "#fff" }}
                >
                  Dashboard
                </Button>
                <Button
                  startIcon={<Logout />}
                  onClick={handleLogout}
                  variant="contained"
                  color="warning"
                  sx={{ borderRadius: "25px" }}
                >
                  Logout
                </Button>
              </Box>
            )}
          </>
        )}

        {/* Mobile Navbar */}
        {isMobile && (
          <>
            <IconButton
              sx={{ color: "#fff" }}
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="right"
              open={drawerOpen}
              onClose={toggleDrawer(false)}
              PaperProps={{
                sx: {
                  backgroundColor: "#050816 !important",
                  backgroundImage: "none !important",
                },
              }}
            >
              {/* Core Wrapper Container */}
              <Box 
                sx={{ 
                  width: 280, 
                  height: "100%",
                  bgcolor: "#050816", 
                  color: "#ffffff",
                  p: 2,
                  boxSizing: "border-box"
                }}
              >
                {/* Drawer Branding Title */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, p: 1, mb: 1 }}>
                  <LocalPizza sx={{ color: "#f5b041", fontSize: 28 }} />
                  <Typography variant="h6" fontWeight="bold" sx={{ color: "#ffffff" }}>
                    Pizzeria
                  </Typography>
                </Box>
                <Divider sx={{ borderColor: "rgba(255,255,255,0.12)", mb: 2 }} />

                <List sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
                  {/* Guest User Navigation Links with Icons */}
                  {!token &&
                    guestLinks.map((link) => (
                      <ListItem
                        button
                        key={link.text}
                        component={Link}
                        to={link.route}
                        onClick={toggleDrawer(false)}
                        sx={{
                          borderRadius: "8px",
                          "&:hover": { bgcolor: "rgba(245, 176, 65, 0.15)" },
                        }}
                      >
                        <ListItemIcon sx={{ color: "#f5b041" }}>
                          {link.icon}
                        </ListItemIcon>
                        <ListItemText 
                          primary={link.text} 
                          primaryTypographyProps={{ style: { color: "#ffffff", fontWeight: 500 } }} 
                        />
                      </ListItem>
                    ))}

                  {/* Registered Customer Links */}
                  {token && role === "customer" && (
                    <>
                      <ListItem button component={Link} to="/" onClick={toggleDrawer(false)} sx={{ borderRadius: "8px", "&:hover": { bgcolor: "rgba(255,255,255,0.06)" } }}>
                        <ListItemIcon sx={{ color: "#f5b041" }}><Home /></ListItemIcon>
                        <ListItemText primary="Home" primaryTypographyProps={{ style: { color: "#ffffff" } }} />
                      </ListItem>

                      <ListItem button component={Link} to="/menu" onClick={toggleDrawer(false)} sx={{ borderRadius: "8px", "&:hover": { bgcolor: "rgba(255,255,255,0.06)" } }}>
                        <ListItemIcon sx={{ color: "#f5b041" }}><RestaurantMenu /></ListItemIcon>
                        <ListItemText primary="Menu" primaryTypographyProps={{ style: { color: "#ffffff" } }} />
                      </ListItem>

                      <ListItem button component={Link} to="/cart" onClick={toggleDrawer(false)} sx={{ borderRadius: "8px", "&:hover": { bgcolor: "rgba(255,255,255,0.06)" } }}>
                        <ListItemIcon sx={{ color: "#f5b041" }}>
                          <Badge badgeContent={cartCount} color="warning">
                            <ShoppingCart />
                          </Badge>
                        </ListItemIcon>
                        <ListItemText primary="Cart" primaryTypographyProps={{ style: { color: "#ffffff" } }} />
                      </ListItem>

                      <ListItem button component={Link} to="/bills" onClick={toggleDrawer(false)} sx={{ borderRadius: "8px", "&:hover": { bgcolor: "rgba(255,255,255,0.06)" } }}>
                        <ListItemIcon sx={{ color: "#f5b041" }}><ReceiptLong /></ListItemIcon>
                        <ListItemText primary="Bills" primaryTypographyProps={{ style: { color: "#ffffff" } }} />
                      </ListItem>

                      <ListItem button component={Link} to="/profile" onClick={toggleDrawer(false)} sx={{ borderRadius: "8px", "&:hover": { bgcolor: "rgba(255,255,255,0.06)" } }}>
                        <ListItemIcon sx={{ color: "#f5b041" }}><AccountCircle /></ListItemIcon>
                        <ListItemText primary="Profile" primaryTypographyProps={{ style: { color: "#ffffff" } }} />
                      </ListItem>

                      <Divider sx={{ borderColor: "rgba(255,255,255,0.12)", my: 1.5 }} />
                      
                      <ListItem button onClick={handleLogout} sx={{ borderRadius: "8px", "&:hover": { bgcolor: "rgba(231, 76, 60, 0.15)" } }}>
                        <ListItemIcon sx={{ color: "#e74c3c" }}><Logout /></ListItemIcon>
                        <ListItemText primary="Logout" primaryTypographyProps={{ style: { color: "#e74c3c", fontWeight: "bold" } }} />
                      </ListItem>
                    </>
                  )}

                  {/* Administrator Links */}
                  {token && role === "admin" && (
                    <>
                      <ListItem button component={Link} to="/" onClick={toggleDrawer(false)} sx={{ borderRadius: "8px", "&:hover": { bgcolor: "rgba(255,255,255,0.06)" } }}>
                        <ListItemIcon sx={{ color: "#f5b041" }}><Home /></ListItemIcon>
                        <ListItemText primary="Home" primaryTypographyProps={{ style: { color: "#ffffff" } }} />
                      </ListItem>

                      <ListItem button component={Link} to="/admin" onClick={toggleDrawer(false)} sx={{ borderRadius: "8px", "&:hover": { bgcolor: "rgba(255,255,255,0.06)" } }}>
                        <ListItemIcon sx={{ color: "#f5b041" }}><Dashboard /></ListItemIcon>
                        <ListItemText primary="Dashboard" primaryTypographyProps={{ style: { color: "#ffffff" } }} />
                      </ListItem>

                      <Divider sx={{ borderColor: "rgba(255,255,255,0.12)", my: 1.5 }} />

                      <ListItem button onClick={handleLogout} sx={{ borderRadius: "8px", "&:hover": { bgcolor: "rgba(231, 76, 60, 0.15)" } }}>
                        <ListItemIcon sx={{ color: "#e74c3c" }}><Logout /></ListItemIcon>
                        <ListItemText primary="Logout" primaryTypographyProps={{ style: { color: "#e74c3c", fontWeight: "bold" } }} />
                      </ListItem>
                    </>
                  )}
                </List>
              </Box>
            </Drawer>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}

function NavLink({ route, text, icon }) {
  return (
    <Button
      component={Link}
      to={route}
      startIcon={icon}
      sx={{
        color: "#fff",
        textTransform: "none", // Keeps normal capitalization
        position: "relative",
        "&::after": {
          content: '""',
          position: "absolute",
          width: "0%",
          left: 0,
          bottom: 0,
          height: "2px",
          backgroundColor: "#f5b041",
          transition: "0.3s",
          boxShadow: "0 0 10px #f5b041",
        },
        "&:hover::after": { width: "100%" },
      }}
    >
      {text}
    </Button>
  );
}