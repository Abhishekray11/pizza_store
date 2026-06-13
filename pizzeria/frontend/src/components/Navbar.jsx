import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Popover,
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
  keyframes,
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
  CheckCircle,
  NotificationsNone,
  QrCodeScanner,
} from "@mui/icons-material";

import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { getNotifications } from "../services/notificationService";
import { toast } from "react-toastify";
import { markNotificationRead } from "../services/notificationService";

// Animation for the unique red/blue blinking and glowing logo
const redBlueBlinkGlow = keyframes`
  0% {
    color: #ff0000;
    filter: drop-shadow(0 0 8px #ff0000) drop-shadow(0 0 20px #8b0000);
    opacity: 1;
    transform: scale(1);
  }
  50% {
    color: #0088ff;
    filter: drop-shadow(0 0 12px #0088ff) drop-shadow(0 0 25px #00008b);
    opacity: 0.6;
    transform: scale(0.95);
  }
  100% {
    color: #ff0000;
    filter: drop-shadow(0 0 8px #ff0000) drop-shadow(0 0 20px #8b0000);
    opacity: 1;
    transform: scale(1);
  }
`;

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

  // Notification States
  const [notifications, setNotifications] = useState([]);
  const [lastNotificationId, setLastNotificationId] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const openNotifications = Boolean(anchorEl);

  const handleNotificationOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNotificationClose = () => {
    setAnchorEl(null);
  };

  // Get App Popover States
  const [appAnchorEl, setAppAnchorEl] = useState(null);
  const openGetApp = Boolean(appAnchorEl);

  const handleGetAppOpen = (event) => {
    setAppAnchorEl(event.currentTarget);
  };

  const handleGetAppClose = () => {
    setAppAnchorEl(null);
  };

  const handleNotificationClick = async (id) => {
    try {
      await markNotificationRead(id);

      setNotifications((prev) =>
        prev.map((n) =>
          n._id === id ? { ...n, isRead: true } : n
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  const fetchNotifications = async () => {
    try {
      const data = await getNotifications();

      if (
        data.length > 0 &&
        data[0]._id !== lastNotificationId
      ) {
        if (lastNotificationId !== null) {
          toast.success(data[0].message);
        }

        setLastNotificationId(data[0]._id);
      }

      setNotifications(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (!token || role !== "customer") return;
    fetchNotifications();

    const interval = setInterval(() => {
      fetchNotifications();
    }, 5000);

    return () => clearInterval(interval);
  }, [token, role]);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

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
            gap: 1.5,
            textDecoration: "none",
          }}
        >
          <LocalPizza
            sx={{
              fontSize: 34,
              animation: `${redBlueBlinkGlow} 1.5s infinite ease-in-out`,
            }}
          />
          <Typography
            variant="h5"
            sx={{
              fontFamily: "'Pacifico', 'Dancing Script', cursive, sans-serif",
              fontWeight: 800,
              fontSize: "1.8rem",
              background: "linear-gradient(45deg, #ff3333, #3399ff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              letterSpacing: "1px",
              filter: "drop-shadow(0px 0px 5px rgba(255,255,255,0.15))",
            }}
          >
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
                  onClick={handleGetAppOpen}
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
                <IconButton sx={{ color: "#fff" }} onClick={handleNotificationOpen}>
                  <Badge badgeContent={unreadCount} color="error">
                    <NotificationsIcon />
                  </Badge>
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
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              {token && role === "customer" && (
                <IconButton sx={{ color: "#fff" }} onClick={handleNotificationOpen}>
                  <Badge badgeContent={unreadCount} color="error">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
              )}

              <IconButton sx={{ color: "#fff" }} onClick={toggleDrawer(true)}>
                <MenuIcon />
              </IconButton>
            </Box>

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
              <Box
                sx={{
                  width: 280,
                  height: "100%",
                  bgcolor: "#050816",
                  color: "#ffffff",
                  p: 2,
                  boxSizing: "border-box",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, p: 1, mb: 1 }}>
                  <LocalPizza
                    sx={{
                      fontSize: 30,
                      animation: `${redBlueBlinkGlow} 1.5s infinite ease-in-out`,
                    }}
                  />
                  <Typography
                    variant="h6"
                    sx={{
                      fontFamily: "'Pacifico', 'Dancing Script', cursive, sans-serif",
                      fontWeight: 800,
                      fontSize: "1.5rem",
                      background: "linear-gradient(45deg, #ff3333, #3399ff)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      letterSpacing: "1px",
                      filter: "drop-shadow(0px 0px 5px rgba(255,255,255,0.15))",
                    }}
                  >
                    Pizzeria
                  </Typography>
                </Box>
                <Divider sx={{ borderColor: "rgba(255,255,255,0.12)", mb: 2 }} />

                <List sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
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
                        <ListItemIcon sx={{ color: "#f5b041" }}>{link.icon}</ListItemIcon>
                        <ListItemText
                          primary={link.text}
                          primaryTypographyProps={{ style: { color: "#ffffff", fontWeight: 500 } }}
                        />
                      </ListItem>
                    ))}

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

      {/* THEMED NOTIFICATION POPOVER */}
      <Popover
        open={openNotifications}
        anchorEl={anchorEl}
        onClose={handleNotificationClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        slotProps={{
          paper: {
            sx: {
              backgroundColor: "#050816 !important",
              backgroundImage: "none !important",
              border: "1px solid rgba(66, 133, 244, 0.25)",
              borderRadius: "16px",
              boxShadow: "0px 10px 30px rgba(0,0,0,0.7), 0 0 20px rgba(66,133,244,0.2)",
              overflow: "hidden",
              mt: 1,
            },
          },
        }}
      >
        <Box
          sx={{
            width: 350,
            maxHeight: 420,
            display: "flex",
            flexDirection: "column",
            background: "rgba(13, 21, 45, 0.6)",
            backdropFilter: "blur(20px)",
          }}
        >
          {/* Header */}
          <Box sx={{ p: 2, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Typography
              variant="h6"
              sx={{
                color: "#ffffff !important",
                fontWeight: 700,
                fontSize: "1.1rem",
                textShadow: "0 0 15px rgba(255,255,255,0.3)",
              }}
            >
              Notifications
            </Typography>
          </Box>

          <Divider sx={{ borderColor: "rgba(66, 133, 244, 0.15)" }} />

          {/* List Wrapper Container */}
          <Box sx={{ overflowY: "auto", p: 1.5, flexGrow: 1 }}>
            {notifications.length === 0 ? (
              <Box
                sx={{
                  py: 5,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <NotificationsNone sx={{ color: "#ffffff !important", opacity: 0.4, fontSize: "2rem" }} />
                <Typography
                  sx={{
                    color: "#ffffff !important",
                    textAlign: "center",
                    fontSize: "0.85rem",
                    opacity: 0.8,
                  }}
                >
                  No notifications yet
                </Typography>
              </Box>
            ) : (
              <List disablePadding>
                {notifications.map((notification) => {
                  const isUnread = !notification.isRead;

                  return (
                    <ListItem key={notification._id} disablePadding sx={{ mb: 1 }}>
                      <Box
                        component="button"
                        onClick={() => handleNotificationClick(notification._id)}
                        sx={{
                          width: "100%",
                          textAlign: "left",
                          border: "none",
                          cursor: "pointer",
                          p: 1.5,
                          borderRadius: "12px",
                          display: "flex",
                          alignItems: "flex-start",
                          gap: 1.5,
                          transition: "transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease",
                          color: "#ffffff !important",

                          background: isUnread
                            ? "rgba(66, 133, 244, 0.08)"
                            : "rgba(255, 255, 255, 0.02)",

                          border: isUnread
                            ? "1px solid rgba(66, 133, 244, 0.3)"
                            : "1px solid rgba(255, 255, 255, 0.03)",

                          "&:hover": {
                            transform: "translateY(-2px)",
                            borderColor: "#4285F4",
                            background: isUnread
                              ? "rgba(66, 133, 244, 0.15)"
                              : "rgba(255, 255, 255, 0.06)",
                            boxShadow: "0 0 15px rgba(66, 133, 244, 0.25)",
                          },
                        }}
                      >
                        {isUnread && (
                          <CheckCircle
                            sx={{
                              fontSize: "14px",
                              color: "#ffffff !important",
                              mt: 0.4,
                              flexShrink: 0,
                              filter: "drop-shadow(0 0 4px #ffffff)",
                            }}
                          />
                        )}

                        <ListItemText
                          primary={notification.message}
                          secondary={new Date(notification.createdAt).toLocaleString()}
                          primaryTypographyProps={{
                            sx: {
                              color: "#ffffff !important",
                              fontWeight: isUnread ? 600 : 400,
                              fontSize: "0.88rem",
                              lineHeight: 1.4,
                              mb: 0.5,
                            },
                          }}
                          secondaryTypographyProps={{
                            sx: {
                              color: "#ffffff !important",
                              fontSize: "0.72rem",
                              fontWeight: 500,
                              opacity: isUnread ? 0.85 : 0.45,
                            },
                          }}
                          sx={{ m: 0 }}
                        />
                      </Box>
                    </ListItem>
                  );
                })}
              </List>
            )}
          </Box>
        </Box>
      </Popover>

      {/* THEMED GET APP POPOVER */}
      <Popover
        open={openGetApp}
        anchorEl={appAnchorEl}
        onClose={handleGetAppClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        slotProps={{
          paper: {
            sx: {
              backgroundColor: "#050816 !important",
              backgroundImage: "none !important",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              borderRadius: "16px",
              boxShadow: "0px 10px 30px rgba(0,0,0,0.8), 0 0 25px rgba(255,255,255,0.1)",
              overflow: "hidden",
              mt: 1.5,
            },
          },
        }}
      >
        <Box
          sx={{
            width: 300,
            p: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            background: "rgba(13, 21, 45, 0.4)",
            backdropFilter: "blur(20px)",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              color: "#ffffff !important",
              fontWeight: 700,
              fontSize: "1.2rem",
              mb: 2,
              textShadow: "0 0 10px rgba(255,255,255,0.6), 0 0 20px rgba(255,255,255,0.2)",
            }}
          >
            Download App on Playstore
          </Typography>

          {/* QR Code Container */}
          <Box
            sx={{
              p: 2,
              bgcolor: "#ffffff",
              borderRadius: "12px",
              boxShadow: "0 0 20px rgba(255,255,255,0.15)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mb: 2.5,
              width: 140,
              height: 140,
            }}
          >
            {/* You can replace this icon container with your actual QR code component or standard <img> tag */}
            <QrCodeScanner sx={{ fontSize: 110, color: "#050816" }} />
          </Box>

          <Typography
            variant="body2"
            sx={{
              color: "rgba(255, 255, 255, 0.6)",
              fontSize: "0.8rem",
              mb: 2,
            }}
          >
            Scan the QR code or use the link below to get direct access to our official mobile application setup.
          </Typography>

          <Button
            href="https://play.google.com/store"
            target="_blank"
            rel="noopener noreferrer"
            variant="contained"
            fullWidth
            sx={{
              borderRadius: "25px",
              fontWeight: "bold",
              textTransform: "none",
              bgcolor: "#ffffff",
              color: "#000000",
              boxShadow: "0 0 10px rgba(255,255,255,0.5)",
              "&:hover": {
                bgcolor: "#f5b041",
                color: "#000000",
                boxShadow: "0 0 15px #f5b041",
              },
            }}
          >
            Open Play Store
          </Button>
        </Box>
      </Popover>
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
        textTransform: "none",
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
