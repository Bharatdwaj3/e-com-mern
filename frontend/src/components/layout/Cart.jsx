// src/components/Cart.jsx
import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NumericFormat } from 'react-number-format';
import { Footer } from './index';

import {
  Card, CardContent, Typography, Button, Box, Grid, Divider, Container,
  Avatar, IconButton, TextField, Chip, Badge, Table, TableBody, TableCell,
  TableContainer, TableRow, Tooltip,
} from "@mui/material";

import {
  ShoppingCart, Remove, Add, Delete, LocalShipping, CreditCard, ArrowBack, Security, Timer,
} from "@mui/icons-material";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("cartItems") || "[]");
    const itemsWithDetails = stored.map(item => ({
      ...item,
      // Mock product data (replace with real fetch if needed)
      name: `Product ${item.id}`,
      price: Math.floor(Math.random() * 150) + 50,
      image: "/image/product_not_available.jpg",
    }));
    setCartItems(itemsWithDetails);
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    const idsOnly = cartItems.map(item => ({ id: item.id, quantity: item.quantity, addedAt: item.addedAt }));
    localStorage.setItem("cartItems", JSON.stringify(idsOnly));
  }, [cartItems]);

  const updateQuantity = (id, newQty) => {
    if (newQty < 1) return;
    setCartItems(prev => prev.map(item =>
      item.id === id ? { ...item, quantity: newQty } : item
    ));
  };

  const removeItem = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
    toast.error("Item removed");
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  if (cartItems.length === 0) {
    return (
      <Box className="w-screen bg-gradient-to-br from-slate-50 to-gray-100 min-h-screen pt-24">
        <Container maxWidth="lg">
          <Box className="text-center py-16">
            <ShoppingCart className="w-24 h-24 text-gray-300 mx-auto mb-4" />
            <Typography variant="h5" className="text-gray-600 mb-4">Your cart is empty</Typography>
            <Button variant="contained" color="primary" href="/product">
              Continue Shopping
            </Button>
          </Box>
        </Container>
        <Footer />
      </Box>
    );
  }

  return (
    <>
      <Box className="w-screen bg-gradient-to-br from-slate-50 to-gray-100 min-h-screen pt-24">
        <Container maxWidth="lg">
          <Typography variant="h4" className="font-bold text-slate-800 mb-6">
            Shopping Cart <Badge badgeContent={totalItems} color="primary" className="ml-2" />
          </Typography>

          <Grid container spacing={4}>
            <Grid item xs={12} md={8}>
              {cartItems.map(item => (
                <Card key={item.id} className="mb-4">
                  <CardContent>
                    <Grid container spacing={2} alignItems="center">
                      <Grid item xs={3} sm={2}>
                        <Avatar variant="rounded" src={item.image} className="w-full h-20" />
                      </Grid>
                      <Grid item xs={9} sm={10}>
                        <Typography variant="h6">{item.name}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          <NumericFormat value={item.price} displayType="text" thousandSeparator prefix="$" /> each
                        </Typography>

                        <Box className="flex items-center gap-2 mt-2">
                          <IconButton size="small" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                            <Remove />
                          </IconButton>
                          <TextField
                            value={item.quantity}
                            onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                            size="small"
                            className="w-16"
                            inputProps={{ min: 1 }}
                          />
                          <IconButton size="small" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                            <Add />
                          </IconButton>
                          <IconButton size="small" color="error" onClick={() => removeItem(item.id)}>
                            <Delete />
                          </IconButton>
                        </Box>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              ))}
            </Grid>

            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6" className="mb-4">Order Summary</Typography>
                  <Divider className="mb-4" />
                  <Box className="space-y-2">
                    <Box className="flex justify-between">
                      <Typography>Subtotal</Typography>
                      <Typography><NumericFormat value={subtotal} displayType="text" thousandSeparator prefix="$" /></Typography>
                    </Box>
                    <Box className="flex justify-between">
                      <Typography>Shipping</Typography>
                      <Typography>Free</Typography>
                    </Box>
                    <Divider className="my-2" />
                    <Box className="flex justify-between font-bold">
                      <Typography variant="h6">Total</Typography>
                      <Typography variant="h6"><NumericFormat value={subtotal} displayType="text" thousandSeparator prefix="$" /></Typography>
                    </Box>
                  </Box>

                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    size="large"
                    className="mt-6"
                    startIcon={<CreditCard />}
                    onClick={() => toast.success("Proceeding to checkout!")}
                  >
                    Proceed to Checkout
                  </Button>

                  <Button
                    variant="outlined"
                    fullWidth
                    className="mt-2"
                    startIcon={<ArrowBack />}
                    href="/product"
                  >
                    Continue Shopping
                  </Button>
                </CardContent>
              </Card>

              <Box className="mt-6 space-y-2 text-sm text-gray-600">
                <Box className="flex items-center gap-2"><Security /> Secure 256 SSL Checkout</Box>
                <Box className="flex items-center gap-2"><LocalShipping /> Free Shipping over $100</Box>
                <Box className="flex items-center gap-2"><Timer /> Express delivery available</Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
        <Footer />
      </Box>

      <ToastContainer position="bottom-right" />
    </>
  );
};

export default Cart;