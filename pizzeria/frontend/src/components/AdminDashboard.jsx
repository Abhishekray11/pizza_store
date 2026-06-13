import React, { useState, useEffect } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  MenuItem,
  Button,
  Box,
  Chip,
  Divider,
  Container,
} from "@mui/material";

import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import BarChartIcon from "@mui/icons-material/BarChart";
import ShowChartIcon from "@mui/icons-material/ShowChart";

import {
  generateBill,
  downloadInvoice,
} from "../services/billService";

import {
  getStats,
  getRecentOrders,
} from "../services/dashboardService";

import {
  getMenuItems,
  deleteMenuItem,
  createMenuItem,
} from "../services/menuService";

import {
  getOrders,
  getRevenue,
  updateOrderStatus,
} from "../services/adminService";

export default function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const [revenue, setRevenue] = useState(0);
  const [stats, setStats] = useState(null);

  const [recentOrders, setRecentOrders] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [totalBills, setTotalBills] = useState(0);
  const [editItem, setEditItem] = useState(null);
  const [newItem, setNewItem] = useState({
    name: "",
    price: "",
    category: "pizza",
    description: "",
    image: ""
  });

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    try {
      const statsData = await getStats();
      setStats(statsData);
      setTotalBills(statsData.totalBills || 0);

      const recent = await getRecentOrders();
      setRecentOrders(recent);

      const menu = await getMenuItems("");
      setMenuItems(menu);

      const ordersData = await getOrders();
      setOrders(ordersData);

      if (ordersData && Array.isArray(ordersData)) {
        const aggregatedRevenue = ordersData
          .filter(order => order.status === "Accepted" || order.status === "Dispatched" || order.status === "Delivered")
          .reduce((sum, order) => sum + (Number(order.totalAmount) || 0), 0);
        
        setRevenue(aggregatedRevenue);
      } else {
        const revenueData = await getRevenue();
        const totalRevenue = Array.isArray(revenueData)
          ? revenueData.reduce((sum, item) => sum + item.revenue, 0)
          : 0;
        setRevenue(totalRevenue);
      }

    } catch (err) {
      console.error("Error loading administration parameters:", err);
    }
  };

  const handleGenerateBill = async (orderId) => {
    try {
      await generateBill(orderId);
      alert("Bill generated successfully");
      fetchAdminData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteMenu = async (id) => {
    try {
      await deleteMenuItem(id);
      fetchAdminData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus);
      fetchAdminData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateMenuItem = async (e) => {
    e.preventDefault();
    try {
      await createMenuItem(newItem);
      alert("Menu Item Published");
      setNewItem({
        name: "",
        price: "",
        category: "pizza",
        description: "",
        image: ""
      });
      fetchAdminData();
    } catch (err) {
      console.error(err);
    }
  };

  const pendingOrders = orders.filter((o) => o.status === "Pending").length;
  const completedOrders = orders.filter((o) => o.status === "Delivered" || o.status === "Dispatched").length;
  const canceledOrders = orders.filter((o) => o.status === "Rejected" || o.status === "Canceled").length;

  const getStatusColor = (status) => {
    if (status === "Pending") return "#ff9800";
    if (status === "Accepted") return "#2196f3";
    if (status === "Rejected") return "#f44336";
    return "#4caf50";
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#050816", py: { xs: 3, md: 5 } }}>
      <Container maxWidth={false} sx={{ px: { xs: 2, sm: 3, md: 5 } }}>
        
        {/* DASHBOARD MASTER TITLE */}
        <Typography
          variant="h4"
          sx={{
            color: "#fff",
            fontWeight: 700,
            mb: 4,
            textAlign: { xs: "center", sm: "middle" },
            textShadow: "0 0 15px rgba(66,133,244,.4)",
            fontSize: { xs: "1.5rem", sm: "1.8rem", md: "2.2rem" }
          }}
        >
          Pizzeria Admin Dashboard
        </Typography>

        {/* METRICS CONTROL ROW */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: { xs: "nowrap", md: "wrap" },
            gap: 3,
            overflowX: { xs: "auto", md: "visible" },
            overflowY: "hidden",
            mb: 4,
            pb: { xs: 2, md: 0 },
            width: "100%",
            boxSizing: "border-box",
            scrollSnapType: { xs: "x mandatory", md: "none" },
            WebkitOverflowScrolling: "touch",
            "&::-webkit-scrollbar": { height: { xs: "5px", md: "0px" } },
            "&::-webkit-scrollbar-thumb": {
              background: "rgba(66,133,244,0.2)",
              borderRadius: "10px",
            },
          }}
        >
          {/* CARD 1 */}
          <Box sx={mobileCardWrapper}>
            <Card sx={statsCard}>
              <CardContent sx={{ p: 2 }}>
                <ReceiptLongIcon sx={{ color: "#9c27b0", fontSize: "1.3rem", mb: 0.5 }} />
                <Typography sx={{ ...cardTitle, fontSize: "0.8rem", mb: 0.5 }}>Total Bills Issued</Typography>
                <Typography sx={{ ...cardValue, color: "#9c27b0", fontSize: "1.4rem" }}>{totalBills}</Typography>
              </CardContent>
            </Card>
          </Box>

          {/* CARD 2 */}
          <Box sx={mobileCardWrapper}>
            <Card sx={statsCard}>
              <CardContent sx={{ p: 2 }}>
                <AttachMoneyIcon sx={{ color: "#4caf50", fontSize: "1.3rem", mb: 0.5 }} />
                <Typography sx={{ ...cardTitle, fontSize: "0.8rem", mb: 0.5 }}>Monthly Revenue</Typography>
                <Typography sx={{ ...cardValue, color: "#4caf50", fontSize: "1.4rem" }}>₹{revenue}</Typography>
              </CardContent>
            </Card>
          </Box>

          {/* CARD 3 */}
          <Box sx={mobileCardWrapper}>
            <Card sx={statsCard}>
              <CardContent sx={{ p: 2 }}>
                <ShoppingBagIcon sx={{ color: "#4285F4", fontSize: "1.3rem", mb: 0.5 }} />
                <Typography sx={{ ...cardTitle, fontSize: "0.8rem", mb: 0.5 }}>Total Orders Rec</Typography>
                <Typography sx={{ ...cardValue, color: "#4285F4", fontSize: "1.4rem" }}>{orders.length}</Typography>
              </CardContent>
            </Card>
          </Box>

          {/* CARD 4 */}
          <Box sx={mobileCardWrapper}>
            <Card sx={statsCard}>
              <CardContent sx={{ p: 2 }}>
                <PendingActionsIcon sx={{ color: "#ff9800", fontSize: "1.3rem", mb: 0.5 }} />
                <Typography sx={{ ...cardTitle, fontSize: "0.8rem", mb: 0.5 }}>Pending Orders</Typography>
                <Typography sx={{ ...cardValue, color: "#ff9800", fontSize: "1.4rem" }}>{pendingOrders}</Typography>
              </CardContent>
            </Card>
          </Box>

          {/* CARD 5 */}
          <Box sx={mobileCardWrapper}>
            <Card sx={statsCard}>
              <CardContent sx={{ p: 2 }}>
                <CheckCircleIcon sx={{ color: "#4caf50", fontSize: "1.3rem", mb: 0.5 }} />
                <Typography sx={{ ...cardTitle, fontSize: "0.8rem", mb: 0.5 }}>Completed Orders</Typography>
                <Typography sx={{ ...cardValue, color: "#4caf50", fontSize: "1.4rem" }}>{completedOrders}</Typography>
              </CardContent>
            </Card>
          </Box>

          {/* CARD 6 */}
          <Box sx={mobileCardWrapper}>
            <Card sx={statsCard}>
              <CardContent sx={{ p: 2 }}>
                <CheckCircleIcon sx={{ color: "#ff0606", fontSize: "1.3rem", mb: 0.5 }} />
                <Typography sx={{ ...cardTitle, fontSize: "0.8rem", mb: 0.5 }}>Canceled Orders</Typography>
                <Typography sx={{ ...cardValue, color: "#ff0606", fontSize: "1.4rem" }}>{canceledOrders}</Typography>
              </CardContent>
            </Card>
          </Box>
        </Box>

        {/* CARD 7: ANALYTICS WIDGET */}
        <Box sx={{ width: "100%", mb: 4 }}>
          <Card sx={glassCard}>
            <CardContent sx={{ p: 2 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                <Typography variant="subtitle2" sx={{ color: "#fff", fontWeight: 700, display: "flex", alignItems: "center", gap: 1, fontSize: "0.8rem" }}>
                  <BarChartIcon sx={{ color: "#4285F4", fontSize: "1.1rem" }} />
                  Revenue Metrics
                </Typography>
                <ShowChartIcon sx={{ color: "#4caf50", fontSize: "1.1rem" }} />
              </Box>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography sx={{ color: "#b8c7e0", fontSize: "0.7rem" }}>Fulfillment Target</Typography>
                  <Typography sx={{ color: "#4caf50", fontSize: "0.7rem", fontWeight: 700 }}>60%</Typography>
                </Box>
                <Box sx={{ width: "100%", height: "6px", bgcolor: "rgba(255,255,255,0.05)", borderRadius: "3px", overflow: "hidden" }}>
                  <Box sx={{ width: "60%", height: "100%", background: "linear-gradient(90deg, #4caf50, #81c784)", borderRadius: "3px" }} />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>


        <Grid 
          container 
          spacing={3} 
          sx={{ 
            width: "100%", 
            mx: 0, 
            alignItems: "stretch" 
          }}
        >

          <Grid 
            item 
            xs={12} 
            md={6} 
            lg={6} 
            sx={{ 
              display: "flex", 
              flexDirection: "column", 
              gap: 3,
              pl: "0px !important"
            }}
          >
            {/* ADD MENU CARD ITEMS */}
            <Card sx={{ ...glassCard, width: "100%", boxSizing: "border-box" }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="subtitle1" sx={{ color: "#fff", fontWeight: 700, mb: 2.5 }}>
                  Add New Menu Item
                </Typography>

                <Box component="form" onSubmit={handleCreateMenuItem} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <TextField fullWidth size="small" label="Item Name" value={newItem.name} onChange={(e) => setNewItem({ ...newItem, name: e.target.value })} sx={inputStyle} />
                  <TextField fullWidth size="small" label="Price" type="number" value={newItem.price} onChange={(e) => setNewItem({ ...newItem, price: e.target.value })} sx={inputStyle} />
                  <TextField select fullWidth size="small" label="Category" value={newItem.category} onChange={(e) => setNewItem({ ...newItem, category: e.target.value })} sx={inputStyle}>
                    <MenuItem value="pizza">Pizza</MenuItem>
                    <MenuItem value="sides">Sides</MenuItem>
                    <MenuItem value="beverages">Beverages</MenuItem>
                    <MenuItem value="combo">Combo</MenuItem>
                  </TextField>
                  <TextField fullWidth multiline rows={3} size="small" label="Description" value={newItem.description} onChange={(e) => setNewItem({ ...newItem, description: e.target.value })} sx={inputStyle} />
                  <TextField fullWidth size="small" label="Image URL" value={newItem.image} onChange={(e) => setNewItem({ ...newItem, image: e.target.value })} sx={inputStyle} />

                  <Button type="submit" variant="contained" fullWidth sx={{ ...buttonStyle, py: 1.2 }}>
                    Publish Item
                  </Button>
                </Box>
              </CardContent>
            </Card>

            {/* ACTIVE MENU INVENTORY CARD */}
            <Card sx={{ ...glassCard, width: "100%", boxSizing: "border-box" }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="subtitle1" sx={{ color: "#fff", fontWeight: 700, mb: 2 }}>
                  Active Menu Items ({menuItems.length})
                </Typography>

                <Box sx={{ maxHeight: "250px", overflowY: "auto", pr: 0.5 }}>
                  {menuItems.map((item) => (
                    <Box
                      key={item._id}
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: 1.5,
                        mb: 1.5,
                        p: 1.2,
                        borderRadius: "10px",
                        background: "rgba(255,255,255,0.02)",
                        border: "1px solid rgba(255,255,255,0.04)"
                      }}
                    >
                      <Typography sx={{ color: "#b8c7e0", fontSize: "0.85rem", fontWeight: 500 }}>
                        {item.name} - <span style={{ color: "#ffd56a", fontWeight: 600 }}>₹{item.price}</span>
                      </Typography>

                      <Box sx={{ display: "flex", gap: 1 }}>
                        <Button size="small" variant="contained" color="info" sx={{ minWidth: "55px", height: "28px", fontSize: "0.75rem", textTransform: "none" }} onClick={() => setEditItem(item)}>
                          Edit
                        </Button>
                        <Button size="small" variant="contained" color="error" sx={{ minWidth: "55px", height: "28px", fontSize: "0.75rem", textTransform: "none" }} onClick={() => handleDeleteMenu(item._id)}>
                          Delete
                        </Button>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>

            {/* COMPACT EDITOR MODAL WIDGET CARD */}
            {editItem && (
              <Card sx={{ ...glassCard, border: "1px solid #4caf50", width: "100%", boxSizing: "border-box" }}>
                <CardContent sx={{ p: 2.5 }}>
                  <Typography sx={{ color: "#fff", fontWeight: 700, mb: 2 }} variant="subtitle1">
                    Edit Menu Item
                  </Typography>

                  <TextField fullWidth size="small" label="Name" value={editItem.name} onChange={(e) => setEditItem({ ...editItem, name: e.target.value })} sx={inputStyle} />
                  <TextField fullWidth size="small" label="Price" value={editItem.price} onChange={(e) => setEditItem({ ...editItem, price: e.target.value })} sx={{ ...inputStyle, mt: 1.8 }} />

                  <Box sx={{ display: "flex", gap: 1.5, mt: 2 }}>
                    <Button variant="contained" color="success" size="small" fullWidth sx={{ textTransform: "none" }}
                      onClick={async () => {
                        await fetch(`http://localhost:5000/api/menu/${editItem._id}`, {
                          method: "PUT",
                          headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                          },
                          body: JSON.stringify(editItem),
                        });
                        setEditItem(null);
                        fetchAdminData();
                      }}
                    >
                      Save
                    </Button>
                    <Button variant="outlined" color="error" size="small" fullWidth sx={{ textTransform: "none" }} onClick={() => setEditItem(null)}>
                      Cancel
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            )}
          </Grid>

          {/* COLUMN 2: CUSTOMER ORDERS PIPELINE (Locks 50% width on right margin side in Web View) */}
          <Grid 
            item 
            xs={12} 
            md={6} 
            lg={6} 
            sx={{ 
              display: "flex", 
              flexDirection: "column",
              pr: "0px !important",
              pl: { xs: "0px !important", md: "24px !important" }
            }}
          >
            <Typography variant="h5" sx={{ color: "#fff", fontWeight: 700, mb: 2, pl: 0.5 }}>
              Customer Orders Pipeline
            </Typography>

            <Box 
              sx={{ 
                display: "flex", 
                flexDirection: { xs: "row", md: "column" }, 
                gap: 2, 
                width: "100%",
                overflowX: { xs: "auto", md: "visible" },
                overflowY: "hidden",
                pb: { xs: 2, md: 0 },
                scrollSnapType: { xs: "x mandatory", md: "none" },
                WebkitOverflowScrolling: "touch",
                "&::-webkit-scrollbar": { height: { xs: "5px", md: "0px" } },
                "&::-webkit-scrollbar-thumb": {
                  background: "rgba(66,133,244,0.2)",
                  borderRadius: "10px",
                },
              }}
            >
              {orders.length === 0 ? (
                <Card sx={{ ...glassCard, width: "100%", flexShrink: 0 }}>
                  <CardContent sx={{ py: 6 }}>
                    <Typography sx={{ color: "#b8c7e0", textAlign: "center", fontSize: "0.95rem" }}>
                      No pending custom orders found tracked on network stream.
                    </Typography>
                  </CardContent>
                </Card>
              ) : (
                orders.map((order) => (
                  <Box 
                    key={order._id} 
                    sx={{ 
                      flex: { xs: "0 0 300px", sm: "0 0 340px", md: "initial" },
                      width: "100%",
                      scrollSnapAlign: "start"
                    }}
                  >
                    <Card sx={{ ...glassCard, width: "100%", boxSizing: "border-box" }}>
                      <CardContent sx={{ p: 2 }}>
                        <Grid container spacing={1} alignItems="center">
                          
                          <Grid item xs={12} sm={4} md={4}>
                            <Typography sx={{ color: "#fff", fontWeight: 700, fontSize: "0.85rem" }}>
                              #{order._id.substring(18)}
                            </Typography>
                            <Box sx={{ display: "flex", gap: 1.5, mt: 0.2 }}>
                              <Typography sx={{ color: "#b8c7e0", fontSize: "0.75rem" }}>
                                Bill: <span style={{ color: "#ffd56a", fontWeight: 600 }}>₹{order.totalAmount}</span>
                              </Typography>
                              <Typography sx={{ color: "#b8c7e0", fontSize: "0.75rem" }}>
                                Mode: {order.deliveryMode === "Delivery" ? "Deliv" : order.deliveryMode || "Deliv"}
                              </Typography>
                            </Box>
                          </Grid>

                          <Grid item xs={4} sm={2} md={2}>
                            <Chip
                              label={order.status}
                              size="small"
                              sx={{
                                bgcolor: getStatusColor(order.status),
                                color: "#fff",
                                fontWeight: 700,
                                fontSize: "0.65rem",
                                width: "100%",
                                height: "20px"
                              }}
                            />
                          </Grid>

                          <Grid item xs={8} sm={6} md={6}>
                            <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap", justifyContent: "flex-end" }}>
                              <Button size="small" variant="contained" color="success" sx={actionBtnStyle} onClick={() => handleUpdateStatus(order._id, "Accepted")}>
                                Accept
                              </Button>
                              <Button size="small" variant="contained" color="info" sx={actionBtnStyle} onClick={() => handleUpdateStatus(order._id, "Dispatched")}>
                                Dispatch
                              </Button>
                              <Button size="small" variant="contained" color="error" sx={actionBtnStyle} onClick={() => handleUpdateStatus(order._id, "Rejected")}>
                                Reject
                              </Button>
                              <Button size="small" variant="contained" color="secondary" sx={actionBtnStyle} onClick={() => handleGenerateBill(order._id)}>
                                Bill
                              </Button>
                              {order.billId && (
                                <Button size="small" variant="outlined" color="success" sx={actionBtnStyle} onClick={() => downloadInvoice(order.billId)}>
                                  Invoice
                                </Button>
                              )}
                            </Box>
                          </Grid>

                        </Grid>
                      </CardContent>
                    </Card>
                  </Box>
                ))
              )}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

/* ========================= CSS SYSTEM DESIGN TOKENS ========================= */

const glassCard = {
  background: "rgba(255,255,255,0.03)",
  backdropFilter: "blur(20px)",
  border: "1px solid rgba(66,133,244,0.15)",
  borderRadius: "14px",
  boxShadow: "0 0 20px rgba(66,133,244,0.08)",
};

const statsCard = {
  background: "linear-gradient(145deg,#081220,#111d35)",
  border: "1px solid rgba(66,133,244,0.15)",
  borderRadius: "14px",
  boxShadow: "0 0 20px rgba(0,0,0,0.3)",
  height: "100%",
  width: "100%"
};

const mobileCardWrapper = {
  flex: { xs: "0 0 160px", sm: "0 0 200px", md: "1 1 calc(33.333% - 24px)", lg: "1 1 calc(16.666% - 24px)" },
  scrollSnapAlign: "start",
  display: "flex"
};

const cardTitle = {
  color: "#6f89a8",
  fontSize: "0.82rem",
  fontWeight: 600,
  mb: 0.2,
};

const cardValue = {
  fontWeight: 800,
  fontSize: "1.4rem",
};

const actionBtnStyle = {
  height: "24px",
  fontSize: "0.7rem",
  textTransform: "none",
  fontWeight: 600,
  px: 1,
  minWidth: "auto",
};

const inputStyle = {
  "& .MuiOutlinedInput-root": {
    color: "#fff",
    borderRadius: "10px",
    "& fieldset": { borderColor: "rgba(66,133,244,.25)" },
    "&:hover fieldset": { borderColor: "#4285F4" },
    "&.Mui-focused fieldset": {
      borderColor: "#4285F4",
      boxShadow: "0 0 10px rgba(66,133,244,.3)",
    },
  },
  "& .MuiInputLabel-root": { color: "#b8c7e0", fontSize: "0.85rem" },
  "& .MuiInputLabel-root.Mui-focused": { color: "#4285F4" },
};

const buttonStyle = {
  mt: 1,
  py: 1,
  borderRadius: "10px",
  textTransform: "none",
  fontWeight: 700,
  background: "linear-gradient(90deg,#4285F4,#5B9DFF)",
  boxShadow: "0 0 15px rgba(66,133,244,.4)",
};