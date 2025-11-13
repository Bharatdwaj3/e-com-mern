// src/components/Cart.jsx
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { NumericFormat } from "react-number-format";
import { Link } from "react-router-dom";

import {
  Container, Box, Typography, Button, Card, CardContent,
  Grid, Avatar, IconButton, TextField, Divider, Badge
} from "@mui/material";

import {
  ShoppingCart, Add, Remove, Delete, ArrowBack, CreditCard
} from "@mui/icons-material";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  // === CART LOGIC (ALL INSIDE) ===

  const loadCart = () => {
    try {
      const stored = JSON.parse(localStorage.getItem("cartItems") || "[]");
      return stored.map(item => ({
        ...item,
        quantity: Number(item.quantity) || 1,
        price: Number(item.price) || 0,   // ← fallback if missing
      }));
    } catch (e) {
      console.error("Cart load error", e);
      return [];
    }
  };

  const saveCart = (items) => {
    localStorage.setItem("cartItems", JSON.stringify(items));
  };

  const updateQuantity = (_id, newQty) => {
    if (newQty < 1) return;
    const updated = cartItems.map(item =>
      item._id === _id ? { ...item, quantity: newQty } : item
    );
    setCartItems(updated);
    saveCart(updated);
  };

  const removeItem = (_id) => {
    const filtered = cartItems.filter(item => item._id !== _id);
    setCartItems(filtered);
    saveCart(filtered);
    toast.error("Item removed");
  };

  useEffect(() => {
    setCartItems(loadCart());
  }, []);

  // === CALCULATIONS (NOW CORRECT) ===
  const subtotal = cartItems.reduce((sum, item) => {
    const price = Number(item.price) || 0;
    const qty = Number(item.quantity) || 0;
    return sum + (price * qty);
  }, 0);

  const totalItems = cartItems.reduce((sum, item) => sum + (item.quantity || 0), 0);

  // === EMPTY STATE ===
  if (cartItems.length === 0) {
    return (
      <Box className="w-screen bg-gradient-to-br from-slate-50 to-gray-100 min-h-screen pt-24">
        <Container maxWidth="lg">
          <Box className="text-center py-16">
            <ShoppingCart className="w-24 h-24 text-gray-300 mx-auto mb-4" />
            <Typography variant="h5" className="text-gray-600 mb-4">
              Your cart is empty
            </Typography>
            <Button variant="contained" color="primary" component={Link} to="/product">
              Continue Shopping
            </Button>
          </Box>
        </Container>
      </Box>
    );
  }

  // === FULL CART UI ===
  return (
    <Box className="w-screen bg-gradient-to-br from-slate-50 to-gray-100 min-h-screen pt-24">
      <Container maxWidth="lg">
        <Typography variant="h4" className="font-bold text-slate-800 mb-6">
          Shopping Cart
          <Badge badgeContent={totalItems} color="primary" className="ml-2" />
        </Typography>

        <Grid container spacing={4}>
          {/* Items */}
          <Grid item xs={12} md={8}>
            {cartItems.map(item => (
              <Card key={item._id} className="mb-4">
                <CardContent>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={3} sm={2}>
                      <Avatar
                        variant="rounded"
                        src={item.imageUrl?.trim() || "/image/product_not_available.jpg"}
                        alt={item.type}
                        className="w-full h-20 object-cover"
                      />
                    </Grid>

                    <Grid item xs={9} sm={10}>
                      <Typography variant="h6">{item.type || "Unknown"}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        <NumericFormat
                          value={item.price}
                          displayType="text"
                          thousandSeparator
                          prefix="$"
                        /> each
                      </Typography>

                      <Box className="flex items-center gap-2 mt-2">
                        <IconButton size="small" onClick={() => updateQuantity(item._id, item.quantity - 1)}>
                          <Remove />
                        </IconButton>

                        <TextField
                          value={item.quantity}
                          onChange={e => updateQuantity(item._id, parseInt(e.target.value) || 1)}
                          size="small"
                          className="w-16"
                          inputProps={{ min: 1, style: { textAlign: "center" } }}
                        />

                        <IconButton size="small" onClick={() => updateQuantity(item._id, item.quantity + 1)}>
                          <Add />
                        </IconButton>

                        <IconButton size="small" color="error" onClick={() => removeItem(item._id)}>
                          <Delete />
                        </IconButton>
                      </Box>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            ))}
          </Grid>

          {/* Summary */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" className="mb-4">Order Summary</Typography>
                <Divider className="mb-4" />

                <Box className="space-y-2">
                  <Box className="flex justify-between">
                    <Typography>Subtotal</Typography>
                    <Typography>
                      <NumericFormat value={subtotal} displayType="text" thousandSeparator prefix="$" />
                    </Typography>
                  </Box>
                  <Box className="flex justify-between">
                    <Typography>Shipping</Typography>
                    <Typography>Free</Typography>
                  </Box>
                  <Divider className="my-2" />
                  <Box className="flex justify-between font-bold">
                    <Typography variant="h6">Total</Typography>
                    <Typography variant="h6">
                      <NumericFormat value={subtotal} displayType="text" thousandSeparator prefix="$" />
                    </Typography>
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
                  component={Link}
                  to="/product"
                >
                  Continue Shopping
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Cart;