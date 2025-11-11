import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import{AnimatePresence  } from "framer-motion";
import { debounce } from "lodash";
import { format } from "date-fns";
import { Footer } from '../components/index';
import { NumericFormat } from 'react-number-format';

import {
  Card,
  CardContent,
  Typography,
  Paper,
  Button,
  Box,
  Grid,
  Divider,
  Container,
  Avatar,
  IconButton,
  TextField,
  Chip,
  Skeleton,
  Badge,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Tooltip,
} from "@mui/material";

import {
  ShoppingCart,
  Remove,
  Add,
  Info,
  Wifi,
  ShoppingBag,
  LocalOffer,
  Delete,
  LocalShipping,
  CreditCard,
  ArrowBack,
  Security,
  Timer,
  Cable,
} from "@mui/icons-material";

const useCartData = () => {
  return useQuery({
    queryKey: ["cartItems"],
    queryFn: async () => {
      const cartItemIds = JSON.parse(localStorage.getItem("cartItems") || "[]");
      if (cartItemIds.length === 0) return [];
      const cartPromises = cartItemIds.map(async (cartItem) => {
        const response = await axios.get(
          `http://localhost:4001/product/gadgets/${cartItem.id}`
        );
        return {
          ...response.data,
          id:cartItem.id || `item_${Date.now()}_${Math.random}`,
          price: Math.floor(Math.random() * 200) + 50,
          addedAt: cartItem.addedAt || new Date().toISOString(),
        };
      });
      return Promise.all(cartPromises);
    },
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
  });
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, x: -100 },
};

const buttonVariants = {
  hover: { scale: 1.05 },
  tap: { scale: 0.95 },
};

const Cart = () => {
  const queryClient = useQueryClient();
  const { data: cartItems = [], isLoading, error } = useCartData();
  const [localCartItems, setLocalCartItems] = useState([]);

  useEffect(() => {
    if (cartItems) {
      setLocalCartItems(cartItems);
    }
  }, [cartItems]);

  const debounceQuantityUpdate = debounce((id, newQuantity) => {
    updateCartInStorage(id, newQuantity);
    queryClient.invalidateQueries(["cartItems"]);
  }, 500);

  const updateCartInStorage = (id, newQuantity) => {
    const cartItemIds = JSON.parse(localStorage.getItem("cartItems") || "[]");
    const updateIds = cartItemIds.map((item) =>
      item.id === id
        ? {
            ...item,
            quantity: newQuantity,
          }
        : item
    );
    localStorage.setItem("cartItems", JSON.stringify(updateIds));
  };

  const updateQuantityMutation = useMutation({
    mutationFn: ({ id, newQuantity }) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          updateCartInStorage(id, newQuantity);
          resolve({ id, newQuantity });
        }, 100);
      });
    },
    onMutate: async ({ id, newQuantity }) => {
      await queryClient.cancelQueries(["cartItems"]);
      const previousItems = queryClient.getQueryData(["cartItems"]);
      const updatedItems = localCartItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      );
      setLocalCartItems(updatedItems);
      return { previousItems };
    },
    onError: (err, variables, context) => {
      if (context?.previousItems) {
        setLocalCartItems(context.previousItems);
      }
      toast.error("Failed to update quantity");
    },
    onSuccess: () => {
      toast.success("Quantity updated!!");
    },
    onSettled: () => {
      queryClient.invalidateQueries(["cartItems"]);
    },
  });

  const removeItemMutation = useMutation({
    mutationFn: (id) => {
      return new Promise((resolve) => {
        const cartItemsIds = JSON.parse(
          localStorage.getItem("cartItems") || "[]"
        );
        const updatedIds = cartItemsIds.filter((item) => item.id !== id);
        localStorage.setItem("cartItems", JSON.stringify(updatedIds));
        resolve(id);
      });
    },
    onMutate: async (id) => {
      await queryClient.cancelQueries(["cartItems"]);
      const previousItems = queryClient.getQueryData(["cartItems"]);
      const updatedItems = localCartItems.filter((item) => item.id !== id);
      setLocalCartItems(updatedItems);
      return { previousItems };
    },
    onError: (err, variables, context) => {
      if (context?.previousItems) {
        setLocalCartItems(context.previousItems);
      }
      toast.error("Failed to remove item");
    },
    onSuccess: () => {
      toast.success("Item removed from cart");
    },
    onSettled: () => {
      queryClient.invalidateQueries(["cartItems"]);
    },
  });

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity <= 0) {
      removeItemMutation.mutate(id);
      return;
    }
    updateQuantityMutation.mutate({ id, newQuantity });
  };

  const subtotal = localCartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 100 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const savings = subtotal > 200 ? subtotal * 0.05 : 0;
  const total = subtotal + shipping + tax - savings;
  if (isLoading) {
    return (
      <div className="w-full">
        <Box className="min-h-screen bg-gradient-to-br from -sky-50 to-blue-100 mt-[70px]">
          <Container maxWidth="xl" className="py-8 px-4">
            <Card className='shadow-lg mb-6 overflow-hidden'>
              <CardContent className="p-8">
                <CardContent className="p-8">
                  <Skeleton variant="text" width={300} height={40} />
                  <Skeleton variant="text" width={150} height={30} />
                </CardContent>
              </CardContent>
            </Card>
            <Grid container spacing={4}>
              <Grid item xs={12} md={8}>
                {[1, 2, 3].map((item) => (
                  <Card key={item} className="shadow-lg mb-4">
                    <CardContent className="p-4">
                      <Grid container spacing={3}>
                        <Grid item xs={3}>
                          <Skeleton variant="rectangular" height={80} />
                        </Grid>
                        <Grid item xs={6}>
                          <Skeleton variant="text" height={30} />
                          <Skeleton variant="text" height={20} />
                          <Skeleton variant="text" height={20} />
                        </Grid>
                        <Grid item xs={3}>
                          <Skeleton variant="text" height={30} />
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                ))}
              </Grid>
              <Grid item xs={12} md={4}>
                <Card className="shadow-lg">
                  <CardContent className="p-6">
                    <Skeleton variant="text" width={200} height={30} />
                    <Skeleton variant="rectangular" width={200} height={200} />
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Container>
        </Box>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full">
        <Box container="min-h-screen bg-gradient-to-br from-sky-50 to-blue-100 mt-[70px]">
          <Container maxWidth="xl" className="py-8 px-4">
            <Card className="shadow-lg text-center">
              <CardContent className="p-12">
                <Avatar className="bg-red-400 w-16 h-16 mx-auto mb-4">
                  <Info sx={{ fontSize: 32 }} />
                </Avatar>
                <Typography variant="h4" className="text-red-600 mb-4">
                  Error Loading Cart
                </Typography>
                <Typography variant="body1" className="text-gray-500 mb-6">
                  {error.message}
                </Typography>
                <Button
                  variant="contained"
                  onClick={() => queryClient.invalidateQueries(["cartItems"])}
                  className="bg-cyan-600 hover:bg-cyan-700"
                >
                  Try Again
                </Button>
              </CardContent>
            </Card>
          </Container>
        </Box>
        <Footer />
      </div>
    );
  }

  if (localCartItems.length === 0) {
    return (
      <div className="w-full">
        <Box className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-100 mt-[70px] pb-8 w-full overflow-x-hidden">
          <Container maxWidth="xl" className="py-8 px-4">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="shadow-lg text-center">
                <CardContent className="p-12">
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Avatar className="bg-gray-400 w-20 h-20 mxa-auto mb-4">
                      <ShoppingBag sx={{ fontSize: 40 }} />
                    </Avatar>
                  </motion.div>
                  <Typography variant="h4" className="text-gray-600 mb-4">
                    Your Cart is empty
                  </Typography>
                  <Typography variant="body1" className="text-gray-500 mb-6">
                    Discover amazing products and add them to your card!!
                  </Typography>
                  <motion.div
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <Button
                      variant="contained"
                      startIcon={<ShoppingCart/>}
                      className="bg-cyan-600 hover:bg-cyan-700 px-8 py-3"
                      size="large"
                    >
                      Start Shopping
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          </Container>
        </Box>
        <Footer />
        <ToastContainer position="bottom-right" />
      </div>
    );
  }

  return (
    <>
      <div className="w-full">
        <Box className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-100 mt-[70px] pb-8 w-full overflow-x-hidden">
          <Container maxWidth="xl" className="py-8 px-4">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="shadow-lg mb-6 overflow-hidden">
                <CardContent className="p-8">
                  <Box className="flex items-center justify-between">
                    <Box className="flex items-center gap-3">
                      <Badge
                        badgeContent={localCartItems.length}
                        color="primary"
                      >
                        <Avatar className="bg-cyan-600">
                          <ShoppingCart />
                        </Avatar>
                      </Badge>
                      <div>
                        <Typography
                          variant="h3"
                          className="text-cyan-950 font-bold"
                        >
                          Shopping Cart
                        </Typography>
                        <Typography variant="body1" className="text-gray-600">
                          Last Updated: {format(new Date(), "PPp")}
                        </Typography>
                      </div>
                    </Box>
                    {savings > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          delay: 0.3,
                        }}
                      >
                        <Chip
                          icon={<LocalOffer />}
                          label={`Saving $${savings.toFixed(2)}`}
                          color="success"
                          className="text-lg px-4 py-2"
                        />
                      </motion.div>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </motion.div>

            <Grid container spacing={4}>
              <Grid className="shadow-lg">
                <CardContent className="p-6">
                  <Typography
                    variant="h5"
                    className="text-cyan-900 font-semibold mb-6 flex items-center gap-3"
                  >
                    <Avatar className="bg-blue-500 w-8 h-8">
                      <Info sx={{ fontSize: 20 }} />
                    </Avatar>
                    Card Items ({localCartItems.length})
                  </Typography>
                  <Divider className="mb-6 border-cyan-200" />
                  <AnimatePresence>
                    {localCartItems.map((item, index) => (
                      <motion.div
                        key={item.id}
                        variants={cardVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        layout
                      >
                        <Card className="bg-gray-50 shadow-sm hover:shadow-md transition-all duration-300 mb-4">
                          <CardContent className="p-4">
                            <Grid container spacing={3} alignItems="center">
                              <Grid item xs={12} sm={3}>
                                <motion.div whileHover={{ scale: 1.05 }}>
                                  <Paper
                                    elevation={2}
                                    className="p-2 bg-white overflow-hidden"
                                  >
                                    <img
                                      src={item.imageUrl}
                                      className="h-28 w-full object-contain rounded transition-transform duration-300"
                                      alt={`${item.type} product`}
                                    />
                                  </Paper>
                                </motion.div>
                              </Grid>
                              <Grid item xs={12} sm={4}>
                                <Typography
                                  variant="h6"
                                  className="text-gray-800 font-semibold"
                                >
                                  {item.type}
                                </Typography>
                                <div className="flex items-center gap-2 mb-2">
                                  <motion.div>
                                    <Chip
                                      label={item.wired ? "Wired" : "Wireless"}
                                      color={
                                        item.wired ? "Primary" : "Secondary"
                                      }
                                      icon={item.wired ? <Cable /> : <Wifi />}
                                      size="small"
                                    />
                                  </motion.div>
                                </div>
                                <Typography
                                  variant="body2"
                                  className="text-gray-600 mb-1"
                                >
                                  Port:{" "}
                                  <span className="font-mono text-blue-600">
                                    {item.port}
                                  </span>
                                </Typography>
                                <Typography
                                  variant="body2"
                                  className="text-gray-600 mb-1"
                                >
                                  Storage:{" "}
                                  <span className="font-semibold">
                                    {item.storage}GB
                                  </span>
                                </Typography>
                                <Typography
                                  variant="caption"
                                  className="text-gray-500 mb-1"
                                >
                                  Added:
                                  {format(
                                    new Date(item.addedAt),
                                    "MMM dd, yyyy"
                                  )}
                                </Typography>
                              </Grid>

                              <Grid item xs={12} sm={2}>
                                <Box className="flex items-center gap-2 bg-white p-2 rounded-lg">
                                  <Tooltip title="Decrease quantity">
                                    <motion.div
                                      variants={buttonVariants}
                                      whileHover="hover"
                                      whileTap="tap"
                                    >
                                      <IconButton
                                        onClick={() =>
                                          handleQuantityChange(
                                            item.id,
                                            item.quantity - 1
                                          )
                                        }
                                        className="text-gray-600 hover:bg-red-50 hover:text-red-600"
                                        size="small"
                                        disabled={
                                          updateQuantityMutation.isLoading
                                        }
                                      >
                                        <Remove />
                                      </IconButton>
                                    </motion.div>
                                  </Tooltip>
                                  <NumericFormat
                                    value={item.quantity}
                                    onValueChange={(values) => {
                                      const newQuantity =
                                        parseInt(values.value) || 1;
                                      debounceQuantityUpdate(
                                        item.id,
                                        newQuantity
                                      );
                                    }}
                                    customInput={TextField}
                                    size="small"
                                    className="w-16"
                                    inputProps={{
                                      min: 1,
                                      style: { textAlign: "center" },
                                      "aria-label": `Quantity for ${item.type}`,
                                    }}
                                    allowNegative={false}
                                    decimalScale={0}
                                  />

                                  <Tooltip title="Increase quantitty">
                                    <motion.div
                                      variants={buttonVariants}
                                      whileHover="hover"
                                      whileTap="tap"
                                    >
                                      <IconButton
                                        onClick={() =>
                                          handleQuantityChange(
                                            item.id,
                                            item.quantity + 1
                                          )
                                        }
                                        className="text-gray-600 hover:bg-green-50 hover:text-green-600"
                                        size="small"
                                        disabled={
                                          updateQuantityMutation.isLoading
                                        }
                                      >
                                        <Add />
                                      </IconButton>
                                    </motion.div>
                                  </Tooltip>
                                </Box>
                              </Grid>
                              <Grid item xs={12} sm={3}>
                                <Box className="text-center">
                                  <NumericFormat
                                    value={item.price * item.quantity}
                                    displayType="text"
                                    thousandSeparator=" ,"
                                    prefix="$"
                                    decimalScale={2}
                                    fixedDecimalScale
                                    renderText={(formattedValue) => (
                                      <Typography
                                        variant="h6"
                                        className="text-green-600 font-bold mb-2"
                                      >
                                        {formattedValue}
                                      </Typography>
                                    )}
                                  />
                                  <NumericFormat
                                    value={item.price}
                                    displayType="text"
                                    thousandSeparator=" ,"
                                    prefix="$"
                                    decimalScale={2}
                                    fixedDecimalScale
                                    renderText={(formattedValue) => (
                                      <Typography
                                        variant="caption"
                                        className="text-green-500"
                                      >
                                        {formattedValue} each
                                      </Typography>
                                    )}
                                  />

                                  <motion.div
                                    variants={buttonVariants}
                                    whileHover="hover"
                                    whileTap="tap"
                                    className="mt-2"
                                  >
                                    <Button
                                      onClick={() =>
                                        removeItemMutation.mutate(item.id)
                                      }
                                      startIcon={<Delete />}
                                      className="text-red-600 hover:bg-red-50"
                                      size="small"
                                      disabled={removeItemMutation.isLoading}
                                    >
                                      Remove
                                    </Button>
                                  </motion.div>
                                </Box>
                              </Grid>
                            </Grid>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </CardContent>
              </Grid>
            </Grid>

            



            {/*Donote
            Tes
            LeRae*/}
            <Grid>
              <Grid item xs={12} md={4}>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card className="shadow-lg h-fit sticky top-4">
                  <CardContent className="p-6">
                    <Typography
                      variant="h5"
                      className="text-cyan-900 font-semibold mb-6 flex items-center gap-3"
                    >
                      <Avatar className="bg-green-500 w-8 h-8">
                        <CreditCard sx={{ fontSize: 20 }} />
                      </Avatar>
                      Order Summary
                    </Typography>
                    <Divider className="mb-6 border-cyan-200" />
                    <TableContainer
                      component={Paper}
                      className="shadow-sm mb-6"
                    >
                      <Table>
                        <TableBody>
                          <TableRow className="hover:bg-gray-50">
                            <TableCell className="font-semibold text-gray-700 py-3">
                              SubTotal:
                            </TableCell>
                            <TableCell className="py-3 text-gray-900">
                              <NumericFormat
                                value={subtotal}
                                displayType="text"
                                thousandSeparator=" ,"
                                prefix="$"
                                decimalScale={2}
                                fixedDecimalScale
                              />
                            </TableCell>
                          </TableRow>
                          <TableRow className="hover:bg-gray-50">
                            <TableCell className="font-semibold text-gray-700 py-3">
                              Shipping:
                            </TableCell>
                            <TableCell className="py-3 text-gray-900">
                              {shipping === 0 ? (
                                <Chip
                                  label="FREE"
                                  color="success"
                                  size="small"
                                />
                              ) : (
                                <NumericFormat
                                  value={shipping}
                                  displayType="text"
                                  prefix="$"
                                  decimalScale={2}
                                  fixedDecimalScale
                                />
                              )}
                            </TableCell>
                          </TableRow>
                          <TableRow className="hover:bg-gray-50">
                            <TableCell className="font-semibold text-gray-700 py-3">
                              Tax (8%):
                            </TableCell>
                            <TableCell>
                              <NumericFormat
                                value={tax}
                                displayType="text"
                                prefix="$"
                                decimalScale={2}
                                fixedDecimalScale
                              />
                            </TableCell>
                          </TableRow>
                          {savings > 0 && (
                            <TableRow className="hover:bg-green-50">
                              <TableCell className="font-semibold text-green-700 py-3">
                                Discount (5%):
                              </TableCell>
                              <TableCell className="py-3 text-green-600">
                                <NumericFormat
                                  value={savings}
                                  displayType="text"
                                  prefix="$"
                                  decimalScale={2}
                                  fixedDecimalScale
                                />
                              </TableCell>
                            </TableRow>
                          )}
                          <TableRow className="bg-cyan-50">
                            <TableCell className="font-bold text-cyan-900 py-4 text-lg">
                              Total:
                            </TableCell>
                            <TableCell className="py-4">
                              <NumericFormat
                                value={total}
                                displayType="text"
                                thousandSeparator=","
                                prefix="$"
                                decimalScale={2}
                                fixedDecimalScale
                                renderText={(formattedValue) => (
                                  <Typography
                                    variant="h5"
                                    className="text-green-600 font-bold"
                                  >
                                    {formattedValue}
                                  </Typography>
                                )}
                              />
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                    <div className="space-y-3">
                      <motion.div
                        variant={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                      >
                        <Button
                          variants="contained"
                          startIcon={<CreditCard/>}
                          className="bg-green-600 hover:bg-green-700 w-full py-3 text-lg font-semibold"
                          size="large"
                          onClick={() =>
                            toast.success("Prodeeding to checkout!")
                          }
                        >
                          Proceed to Checkout
                        </Button>
                      </motion.div>
                      <motion.div
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                      >
                        <Button
                          variant="outlined"
                          startIcon={<ArrowBack />}
                          className="bg-cyan-300 text-cyan-600 hover:bg-cyan-50 w-full py-3"
                          size="large"
                        >
                          Continue Shopping
                        </Button>
                      </motion.div>
                    </div>
                    <Box className="mt-6 pt-6 border-t border-gray-200">
                      <motion.div
                        className="flex items-center gap-2 mb-3"
                        whileHover={{ scale: 1.02 }}
                      >
                        <Security className="text-green-600" />
                        <Typography variant="body2" classname="text-gray-700">
                          Secure 256 SSL Checkout
                        </Typography>
                      </motion.div>

                      <motion.div
                        className="flex items-center gap-2 mb-3"
                        whileHover={{ scale: 1.02 }}
                      >
                        <LocalShipping className="text-blue-600" />
                        <Typography variant="body2" classname="text-gray-700">
                          Free Shipping over $100
                        </Typography>
                      </motion.div>

                      <motion.div
                        className="flex items-center gap-2"
                        whileHover={{ scale: 1.02 }}
                      >
                        <Timer className="text-orange-600" />
                        <Typography variant="body2" classname="text-gray-700">
                          Express delivery avaliable
                        </Typography>
                      </motion.div>
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
            </Grid>
          </Container>
        </Box>
        
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </>
  );
};

export default Cart;
