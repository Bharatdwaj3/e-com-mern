// src/components/Cart.jsx
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { NumericFormat } from "react-number-format";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import {
  Container,
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Avatar,
  IconButton,
  TextField,
  Divider,
  Badge,
  CircularProgress,
} from "@mui/material";

import {
  ShoppingCart,
  Add,
  Remove,
  Delete,
  ArrowBack,
  CreditCard,
} from "@mui/icons-material";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const navigate = useNavigate();

  // === FETCH USER FROM BACKEND (WORKS WITH httpOnly COOKIES) ===
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/api/user/profile", { withCredentials: true });
        setUser(res.data.user || res.data);
      } catch (err) {
        console.log("User not logged in or token expired",err);
        setUser(null);
      } finally {
        setLoadingUser(false);
      }
    };
    fetchUser();
  }, []);

  // === CART LOGIC ===
  const loadCart = () => {
    try {
      const stored = JSON.parse(localStorage.getItem("cartItems") || "[]");
      return stored.map((item) => ({
        ...item,
        quantity: Number(item.quantity) || 1,
        price: Number(item.price) || 0,
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
    const updated = cartItems.map((item) =>
      item._id === _id ? { ...item, quantity: newQty } : item
    );
    setCartItems(updated);
    saveCart(updated);
  };

  const removeItem = (_id) => {
    const filtered = cartItems.filter((item) => item._id !== _id);
    setCartItems(filtered);
    saveCart(filtered);
    toast.error("Item removed");
  };

  useEffect(() => {
    setCartItems(loadCart());
  }, []);

  const subtotal = cartItems.reduce((sum, item) => {
    return sum + (Number(item.price) || 0) * (Number(item.quantity) || 0);
  }, 0);

  const totalItems = cartItems.reduce((sum, item) => sum + (item.quantity || 0), 0);

  // === CUSTOMER INFO FROM BACKEND USER ===
  const customerInfo = user
    ? {
        name: user.name || user.username || "Customer",
        email: user.email || "",
        phone: user.phone || user.mobile || "",
      }
    : null;

  // === EMPTY CART ===
  return (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 pt-24 pb-12">
    {/* CENTERED CONTAINER */}
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

      {/* TITLE */}
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Shopping Cart <span className="text-blue-600">({totalItems})</span>
      </h1>

      {/* CONDITIONAL RENDERING — STILL WORKS */}
      {cartItems.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl shadow-md">
          <p className="text-xl text-gray-600 mb-6">Your cart is empty</p>
          <Button
            variant="contained"
            component={Link}
            to="/product"
            startIcon={<ArrowBack />}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Continue Shopping
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT: CART ITEMS */}
          <div className="lg:col-span-2 space-y-6">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-xl shadow-md p-6 flex items-center gap-4 hover:shadow-lg transition-shadow"
              >
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-20 h-20 flex-shrink-0" />
                
                <div className="flex-grow">
                  <h3 className="font-semibold text-lg text-gray-800">{item.name}</h3>
                  <p className="text-sm text-gray-600">
                    <NumericFormat value={item.price} displayType="text" thousandSeparator prefix="₹" /> each
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <IconButton
                    size="small"
                    onClick={() => updateQuantity(item._id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                  >
                    <Remove />
                  </IconButton>
                  <TextField value={item.quantity} size="small" className="w-16" inputProps={{ readOnly: true }} />
                  <IconButton size="small" onClick={() => updateQuantity(item._id, item.quantity + 1)}>
                    <Add />
                  </IconButton>
                </div>

                <IconButton onClick={() => removeItem(item._id)} className="text-red-500 hover:text-red-700">
                  <Delete />
                </IconButton>
              </div>
            ))}
          </div>

          {/* RIGHT: ORDER SUMMARY */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
              <Typography variant="h6" className="mb-4 font-bold">Order Summary</Typography>
              <Divider className="mb-4" />

              <div className="space-y-3">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal</span>
                  <span><NumericFormat value={subtotal} displayType="text" thousandSeparator prefix="₹" /></span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Shipping</span>
                  <span className="text-green-600 font-medium">Free</span>
                </div>
                <Divider className="my-3" />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-blue-600">
                    <NumericFormat value={subtotal} displayType="text" thousandSeparator prefix="₹" />
                  </span>
                </div>
              </div>

              <Button
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                className="mt-6 bg-blue-600 hover:bg-blue-700"
                startIcon={<CreditCard />}
                disabled={loadingUser || !user}
                onClick={() => {
                  if (!user) {
                    toast.error("Please login to checkout");
                    navigate("/login");
                    return;
                  }
                  navigate("/checkout", { state: { cartItems, subtotal, customerInfo } });
                }}
              >
                {loadingUser ? "Loading..." : !user ? "Login Required" : "Proceed to Checkout"}
              </Button>

              <Button
                variant="outlined"
                fullWidth
                className="mt-3 border-blue-600 text-blue-600 hover:bg-blue-50"
                startIcon={<ArrowBack />}
                component={Link}
                to="/product"
              >
                Continue Shopping
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  </div>
);
};

export default Cart;