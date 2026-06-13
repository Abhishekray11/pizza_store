import React, { useState, useEffect } from "react";
import {
  Container,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Chip,
  Divider,
  TextField,
  InputAdornment,
} from "@mui/material";

import ReceiptIcon from "@mui/icons-material/Receipt";
import SearchIcon from "@mui/icons-material/Search";
import DownloadIcon from "@mui/icons-material/Download";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import { getMyBills, downloadInvoice } from "../services/billService";


/**
 * @param {Array} billsData - Pass your live database array directly here from the Admin screen
 */
export default function BillList({ billsData }) {
  const [bills, setBills] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const fetchBills = async () => {
  try {
    const data = await getMyBills();

    const formattedBills = data.map((bill) => ({
      ...bill,
      customerName:
        bill.customerId?.name ||
        bill.customerId?.username ||
        "Customer",
      totalAmount: bill.totalBill,
    }));

    setBills(formattedBills);
  } catch (error) {
    console.error("Error loading bills:", error);
  }
};
useEffect(() => {
  fetchBills();
}, []);


  // Download Trigger Handler
  const handleDownload = async (billId) => {
    try {
      if (typeof downloadInvoice === "function") {
        await downloadInvoice(billId);
      }
    } catch (err) {
      console.error("Primary download routine failed, processing system-level snapshot fallback:", err);
      
      const targetBill = bills.find((b) => b._id === billId);
      if (!targetBill) return;


     
      const invoiceContent = `
========================================
         INVOICE TRANSACTION LOG        
========================================
Invoice Reference: ${targetBill._id}
Order Reference:   ${targetBill.orderId}
Customer Name:     ${targetBill.customerName}
Issue Date:        ${formatDate(targetBill.createdAt)}
Payment Protocol:  ${targetBill.paymentMode}
Payment Status:    ${targetBill.status}
----------------------------------------
Total Paid Amount: ₹${targetBill.totalAmount}
========================================
      `;

      const blob = new Blob([invoiceContent], { type: "text/plain;charset=utf-8" });
      const downloadUrl = URL.createObjectURL(blob);
      const virtualLink = document.createElement("a");
      virtualLink.href = downloadUrl;
      virtualLink.setAttribute("download", `Invoice_Snapshot_${billId.substring(18)}.txt`);
      document.body.appendChild(virtualLink);
      virtualLink.click();
      document.body.removeChild(virtualLink);
    }
  };

  const filteredBills = bills.filter(
    (bill) =>
      bill._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (bill.customerName || "")
  .toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    if (status === "Paid") return "#4caf50";
    if (status === "Pending") return "#ff9800";
    return "#f44336";
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#050816", py: { xs: 3, md: 5 }, overflowX: "hidden" }}>
      <Container maxWidth={false} sx={{ px: { xs: 2, sm: 3, md: 5 } }}>
        
        {/* TOP BAR SEARCH AND HEADER */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "stretch", sm: "center" },
            gap: 2,
            mb: 4,
          }}
        >
          <Typography
            variant="h4"
            sx={{
              color: "#fff",
              fontWeight: 700,
              fontSize: { xs: "1.4rem", sm: "1.8rem" },
              textShadow: "0 0 15px rgba(66,133,244,.5)",
              textAlign: { xs: "center", sm: "left" },
            }}
          >
            <ReceiptIcon
              sx={{
                mr: 1,
                color: "#4285F4",
                verticalAlign: "middle",
                fontSize: { xs: "1.6rem", sm: "1.8rem" },
              }}
            />
            Invoice Statements
          </Typography>

          <TextField
            placeholder="Search invoice or name..."
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={inputStyle}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "rgba(66,133,244,0.6)", fontSize: "1rem" }} />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        {filteredBills.length === 0 ? (
          <Card sx={{ ...glassCard, textAlign: "center", py: 6 }}>
            <CardContent>
              <Typography sx={{ color: "#b8c7e0", fontSize: "0.9rem" }}>
                No invoices found tracking that query criteria 🍕
              </Typography>
            </CardContent>
          </Card>
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" }, // Flex vertical on mobile, row map on desktop
              flexWrap: "wrap",
              gap: 3,
              width: "100%",
              boxSizing: "border-box",
            }}
          >
            {filteredBills.map((bill) => (
              <Box
                key={bill._id}
                sx={{
                  // Guarantees 100% exact edge-to-edge container widths on mobile viewports
                  flex: { xs: "1 1 100%", md: "0 0 calc(50% - 12px)", lg: "0 0 calc(33.333% - 16px)", xl: "0 0 calc(25% - 18px)" },
                  width: "100%",
                  boxSizing: "border-box",
                }}
              >
                <Card sx={{ ...glassCard, height: "100%", display: "flex", flexDirection: "column" }}>
                  <CardContent sx={{ p: { xs: 2, md: 2.5 }, flexGrow: 1, display: "flex", flexDirection: "column", boxSizing: "border-box" }}>
                    
                    {/* Header Row */}
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 1.5 }}>
                      <Box>
                        <Typography sx={{ color: "#fff", fontWeight: 700, fontSize: { xs: "0.95rem", md: "1.05rem" } }}>
                          Invoice #{bill._id.substring(18)}
                        </Typography>
                        <Typography sx={{ color: "rgba(66,133,244,0.8)", fontSize: { xs: "0.72rem", md: "0.75rem" }, mt: 0.2 }}>
                          Order: #{bill.orderId?._id?.slice(-6)}
                        </Typography>
                      </Box>
                      <Chip
                        label={bill.status}
                        size="small"
                        sx={{ 
                          bgcolor: getStatusColor(bill.status), 
                          color: "#fff", 
                          fontWeight: 700, 
                          fontSize: { xs: "0.7rem", md: "0.75rem" },
                          height: { xs: "20px", md: "24px" }
                        }}
                      />
                    </Box>

                    <Divider sx={{ mb: 1.5, borderColor: "rgba(255,255,255,.06)" }} />

                    {/* Meta Fields Content Body */}
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 1, flexGrow: 1, mb: 2 }}>
                      <Box sx={infoRow}>
                        <AccountCircleIcon sx={{ ...infoIcon, fontSize: { xs: "1rem", md: "1.1rem" } }} />
                        <Typography sx={{ color: "#fff", fontSize: { xs: "0.85rem", md: "0.9rem" }, fontWeight: 500 }}>
                          {bill.customerName}
                        </Typography>
                      </Box>
                      <Box sx={infoRow}>
                        <CalendarMonthIcon sx={{ ...infoIcon, fontSize: { xs: "1rem", md: "1.1rem" } }} />
                        <Typography sx={{ color: "#b8c7e0", fontSize: { xs: "0.8rem", md: "0.85rem" } }}>
                          {formatDate(bill.createdAt)}
                        </Typography>
                      </Box>
                    </Box>

                    {/* Bottom Action Section */}
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mt: "auto",
                        pt: 1.5,
                        borderTop: "1px dashed rgba(255,255,255,.06)",
                      }}
                    >
                      <Box>
                        <Typography sx={{ color: "#5f7287", fontSize: { xs: "0.68rem", md: "0.75rem" }, fontWeight: 600, textTransform: "uppercase" }}>
                          Amount ({bill.paymentMode})
                        </Typography>
                        <Typography sx={{ color: "#4285F4", fontWeight: 800, fontSize: { xs: "1.15rem", md: "1.3rem" } }}>
                          ₹{bill.totalAmount}
                        </Typography>
                      </Box>

                      <Button
                        variant="contained"
                        size="small"
                        startIcon={<DownloadIcon sx={{ fontSize: "14px !important" }} />}
                        onClick={() => handleDownload(bill._id)}
                        sx={{
                          borderRadius: "6px",
                          textTransform: "none",
                          fontSize: { xs: "0.75rem", md: "0.8rem" },
                          fontWeight: 600,
                          px: { xs: 1.8, md: 2 },
                          py: { xs: 0.5, md: 0.6 },
                          height: { xs: "30px", md: "34px" },
                          background: "linear-gradient(90deg,#4285F4,#5B9DFF)",
                          boxShadow: "0 0 10px rgba(66,133,244,.3)",
                          "&:hover": { boxShadow: "0 0 15px rgba(66,133,244,.6)" },
                        }}
                      >
                        PDF
                      </Button>
                    </Box>

                  </CardContent>
                </Card>
              </Box>
            ))}
          </Box>
        )}
      </Container>
    </Box>
  );
}

const glassCard = {
  background: "rgba(255,255,255,0.03)",
  backdropFilter: "blur(20px)",
  border: "1px solid rgba(66,133,244,0.15)",
  borderRadius: "14px",
  boxShadow: "0 0 25px rgba(66,133,244,0.1)",
  transition: "transform 0.3s ease, border-color 0.3s ease",
  "&:hover": { transform: "translateY(-2px)", borderColor: "rgba(66,133,244,0.35)" },
};

const infoRow = { display: "flex", alignItems: "center", gap: 1 };
const infoIcon = { color: "rgba(184, 199, 224, 0.4)" };
const inputStyle = {
  width: { xs: "100%", sm: "300px" },
  "& .MuiOutlinedInput-root": {
    color: "#fff",
    borderRadius: "10px",
    height: "38px",
    fontSize: "0.85rem",
    backgroundColor: "rgba(255,255,255,0.02)",
    "& fieldset": { borderColor: "rgba(66,133,244,.25)" },
    "&:hover fieldset": { borderColor: "#4285F4" },
    "&.Mui-focused fieldset": { borderColor: "#4285F4", boxShadow: "0 0 10px rgba(66,133,244,.3)" },
  },
};