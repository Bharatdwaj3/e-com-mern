import React, { useEffect, useState, Suspense, lazy } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Phone, Store, Person, Email,
  Star, Verified, Business, LocationCity, CreditCard, Edit,
} from "@mui/icons-material";
import {
  Box, CircularProgress, Avatar, Button,
  Typography, Divider, Chip, Grid, Paper,
  Tabs, Tab,
} from "@mui/material";

const ProductsTab = lazy(() => import("../products/productsTab"));

const SellerProfile = () => {
  const navigate = useNavigate();
  const [seller, setSeller] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [tab, setTab] = useState(0);

  useEffect(() => {
    const fetchSeller = async () => {
      try {
        const { data: userData } = await axios.get(
          "http://localhost:5001/api/user/profile",
          { withCredentials: true }
        );
        const userId = userData.user.id;

        const { data: sellerData } = await axios.get(
          `http://localhost:5001/api/user/seller/${userId}`,
          { withCredentials: true }
        );

        const { _id, userId: _, ...safeSeller } = sellerData;
        setSeller(safeSeller);
        setLoading(false);
      } catch (e) {
        console.error(e);
        setError("Failed to load your store");
        setLoading(false);
        if (e.response?.status === 401) navigate("/login");
      }
    };
    fetchSeller();
  }, [navigate]);

  if (loading) return <Box className="flex justify-center items-center h-screen"><CircularProgress /></Box>;
  if (error)   return <Box className="flex justify-center items-center h-screen p-4"><Typography color="error">{error}</Typography></Box>;

  const username = seller.storeName?.toLowerCase().replace(/\s+/g, "_") || "seller";

  const OverviewPanel = () => (
    <div className="space-y-12">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Avatar src={seller.imageUrl} sx={{ width:100, height:100 }} className="border-4 border-white shadow-lg">
            {seller.storeName?.[0]?.toUpperCase() || "S"}
          </Avatar>
          <div>
            <h1 className="text-3xl font-bold text-white">@{username}</h1>
            <p className="flex items-center gap-2 text-gray-300 mt-1">
              <Person fontSize="small" /> {seller.fullName}
            </p>
            <p className="flex items-center gap-2 text-sm text-gray-400">
              <Email fontSize="small" /> {seller.email}
            </p>
          </div>
        </div>
        <Button variant="outlined" startIcon={<Edit />} onClick={() => navigate("/seller/edit")}
          sx={{ borderColor:"#8b5cf6", color:"#8b5cf6" }}>
          Edit Store
        </Button>
      </div>

      {/* === STATS GRID === */}
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
            <div className="flex items-center gap-3">
              <Phone className="w-10 h-10 text-blue-600" />
              <div>
                <Typography variant="h5" className="font-bold text-gray-900">{seller.phone || "—"}</Typography>
                <Typography variant="body2" className="text-blue-600">Phone</Typography>
              </div>
            </div>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Paper className="p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
            <div className="flex items-center gap-3">
              <Business className="w-10 h-10 text-green-600" />
              <div>
                <Typography variant="h5" className="font-bold text-gray-900 capitalize">{seller.businessType || "—"}</Typography>
                <Typography variant="body2" className="text-green-600">Business Type</Typography>
              </div>
            </div>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Paper className="p-6 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl">
            <div className="flex items-center gap-3">
              <Star className="w-10 h-10 text-yellow-600" />
              <div>
                <Typography variant="h5" className="font-bold text-gray-900">{seller.rating?.toFixed(1) || "0.0"}</Typography>
                <Typography variant="body2" className="text-yellow-600">Rating</Typography>
              </div>
            </div>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Paper className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
            <div className="flex items-center gap-3">
              {seller.verified ? <Verified className="w-10 h-10 text-purple-600" /> : <Store className="w-10 h-10 text-purple-600" />}
              <div>
                <Typography variant="h5" className="font-bold text-gray-900">{seller.verified ? "Verified" : "Unverified"}</Typography>
                <Typography variant="body2" className="text-purple-600">Status</Typography>
              </div>
            </div>
          </Paper>
        </Grid>
      </Grid>

      <div className="flex items-center gap-3">
        <Store className="w-7 h-7 text-indigo-600" />
        <Typography variant="h4" className="font-bold text-white">{seller.storeName}</Typography>
        {seller.verified ? <Chip icon={<Verified />} label="Verified" color="success" /> : <Chip label="Unverified" color="warning" />}
      </div>

      <Divider />

     
      <div className="space-y-2">
        <Typography variant="h6" className="flex items-center gap-2 font-semibold text-gray-300">
          <LocationCity className="w-5 h-5 text-teal-600" /> Business Address
        </Typography>
        <Typography className="text-gray-300 pl-7">{seller.address || "Not set"}</Typography>
      </div>

      
      {seller.taxId && (
        <div className="space-y-2">
          <Typography variant="h6" className="flex items-center gap-2 font-semibold text-gray-300">
            <CreditCard className="w-5 h-5 text-purple-600" /> Tax ID
          </Typography>
          <Typography className="text-gray-300 pl-7 font-mono">{seller.taxId}</Typography>
        </div>
      )}

      <Divider />

     
      <div className="flex flex-wrap gap-3">
        <Button variant="contained" color="primary" href="/seller/products">Manage Products</Button>
        <Button variant="outlined" color="secondary" href="/seller/orders">View Orders</Button>
        <Button variant="outlined" color="success" href="/seller/analytics">Analytics</Button>
      </div>
    </div>
  );

  return (
    <div className="w-screen bg-gradient-to-br from-gray-900 to-black min-h-screen text-white">

    
      <Box className="border-b border-gray-700 sticky top-0 bg-gray-900 z-10">
        <Tabs value={tab} onChange={(_, v) => setTab(v)} variant="fullWidth"
          sx={{
            "& .MuiTabs-indicator": { backgroundColor: "#8b5cf6", height: 3 },
            "& .MuiTab-root": { textTransform:"none", fontWeight:600, color:"#9ca3af", "&.Mui-selected":{color:"#8b5cf6"} },
          }}>
          <Tab label="Overview" />
          <Tab label="Products" />
        </Tabs>
      </Box>

      <Box className="p-6 md:p-12 max-w-7xl mx-auto">
        {tab === 0 && <OverviewPanel />}
        {tab === 1 && (
          <Suspense fallback={<Box className="flex justify-center py-16"><CircularProgress /></Box>}>
            <ProductsTab /> 
          </Suspense>
        )}
      </Box>
    </div>
  );
};

export default SellerProfile;