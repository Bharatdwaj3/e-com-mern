// src/pages/CustomerProfile.jsx
import React, { useEffect, useState, Suspense, lazy } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Phone, ShoppingCart, AttachMoney, Home, Person, Email,
  Cake, Transgender, FamilyRestroom,
} from "@mui/icons-material";
import {
  Tabs, Tab, Box, CircularProgress, Avatar, Button,
  Container, Typography, Divider, Skeleton
} from "@mui/material";

// Lazy-load Cart to avoid loading it on Overview tab
const Cart = lazy(() => import("../layout/Cart"));

const CustomerProfile = () => {
  const navigate = useNavigate();
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [tab, setTab] = useState(0); // 0=Overview, 1=Cart

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data: userData } = await axios.get(
          "http://localhost:5001/api/user/profile",
          { withCredentials: true }
        );
        const userId = userData.user.id;

        const { data: cust } = await axios.get(
          `http://localhost:5001/api/user/customer/profile/${userId}`,
          { withCredentials: true }
        );

        setCustomer(cust);
        setLoading(false);
      } catch (e) {
        console.error(e);
        setError("Failed to load profile");
        setLoading(false);
        if (e.response?.status === 401) navigate("/login");
      }
    };
    fetchProfile();
  }, [navigate]);

  if (loading) return <Box className="flex items-center justify-center h-screen bg-gray-50"><CircularProgress /></Box>;
  if (error)   return <Box className="flex items-center justify-center h-screen bg-gray-50 p-4"><Box className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg max-w-md w-full text-center">{error}</Box></Box>;

  const username = customer.fullName?.toLowerCase().replace(/\s+/g, "_") || "customer";

  const OverviewPanel = () => (
    <div className="space-y-12">
     
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <a href={`tel:${customer.phone}`} className="bg-blue-50 rounded-xl p-6 flex items-center gap-4 hover:bg-blue-100 transition">
          <Phone className="w-10 h-10 text-blue-600" />
          <div>
            <div className="text-xl font-bold text-gray-900">{customer.phone || "—"}</div>
            <div className="text-sm text-blue-600">Phone</div>
          </div>
        </a>
        
      </div>

      {/* ADDRESSES */}
      <div className="space-y-6">
        <div>
          <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-2">
            <Home className="w-5 h-5 text-cyan-600" /> Shipping Address
          </h3>
          <p className="text-gray-600 pl-7">{customer.shippingAddress || "Not set"}</p>
        </div>
        {customer.billingAddress && (
          <div>
            <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-2">
              <Home className="w-5 h-5 text-purple-600" /> Billing Address
            </h3>
            <p className="text-gray-600 pl-7">{customer.billingAddress}</p>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* FULL-WIDTH WHITE CARD */}
      <div className="w-screen bg-white min-h-screen">

        {/* HEADER */}
        <div className="border-b border-gray-200 px-6 py-8 md:px-12">
          <div className="max-w-7xl mx-auto flex items-center gap-6">
            <Avatar
              src={customer.imageUrl}
              alt={customer.fullName}
              sx={{ width: 80, height: 80 }}
              className="border-4 border-white shadow-md"
            >
              {customer.fullName?.[0]?.toUpperCase() || "U"}
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">@{username}</h1>
              <p className="flex items-center gap-2 text-gray-600 mt-1">
                <Person fontSize="small" /> {customer.fullName}
              </p>
              <p className="flex items-center gap-2 text-sm text-gray-500">
                <Email fontSize="small" /> {customer.email}
              </p>
            </div>
          </div>
        </div>

        {/* TABS */}
        <Box className="border-b border-gray-200">
          <Tabs
            value={tab}
            onChange={(_, v) => setTab(v)}
            variant="fullWidth"
            sx={{
              "& .MuiTabs-indicator": { backgroundColor: "#1da1f2", height: 3 },
              "& .MuiTab-root": {
                textTransform: "none",
                fontWeight: 600,
                color: "#6b7280",
                "&.Mui-selected": { color: "#1da1f2" },
              },
            }}
          >
            <Tab label="Overview" />
            <Tab label="Cart" icon={<ShoppingCart fontSize="small" />} iconPosition="start" />
          </Tabs>
        </Box>

        {/* CONTENT */}
        <Box className="p-6 md:p-12 max-w-7xl mx-auto">
          {tab === 0 && <OverviewPanel />}

          {tab === 1 && (
            <Suspense fallback={
              <Box className="flex justify-center py-16">
                <CircularProgress />
              </Box>
            }>
              {/* YOUR FULL CART.JSX EMBEDDED HERE */}
              <Box className="w-full">
                <Cart />
              </Box>
            </Suspense>
          )}
        </Box>
      </div>
    </>
  );
};

export default CustomerProfile;