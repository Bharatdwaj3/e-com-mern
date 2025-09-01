import axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PaymentButton from "../PaymentButton";

import {
  Card,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Chip,
  Button,
  Box,
  Grid,
  Divider,
  CircularProgress,
  Container,
  Avatar,TextField,
  CardContent,
} from "@mui/material";
import {
  ShoppingCart,
  CreditCard,
  Favorite,
  Compare,
  Router as RouterIcon,
  Cable,
  Wifi,
  Storage,
  Monitor,
  CheckCircle,
  Cancel,
  Info,
} from "@mui/icons-material";

const Details = () => {
  const { id } = useParams();
  const [gadget, setGadget] = useState(null);
  const [showPayment, setShowPayment] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    axios
      .get(`http://localhost:4001/product/gadgets/${id}`)
      .then((response) => setGadget(response.data))
      .catch((error) => console.error("Error: ", error));
  }, [id]);

  const handleAddToCart = () => {
    if (!gadget) return;
    const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
    const existingItemIndex = cartItems.findIndex(
      (item) => item.id === gadget._id
    );
    if (existingItemIndex >= 0) {
      cartItems[existingItemIndex].quantity += 1;
    } else {
      cartItems.push({
        id: gadget._id,
        quantity: 1,
        addedAt: new Date().toString(),
      });
    }
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    toast.success("item added to cart!!");
  };

  if (!gadget) {
    return (
      <Box className="flex justify-center items-center h-screen mt-[70px]">
        <Box className="text-center">
          <CircularProgress size={60} className="text-cyan-600 mb-4" />
          <Typography variant="h6" className="text-gray-600">
            Loading product details ...
          </Typography>
        </Box>
      </Box>
    );
  }

  {
    /*return (
    <>
    
      <div className="relative  h-[8000px] w-screen bg-sky-100 mt-[70px]">

        <h1 className='text-cyan-950 pl-28'>{gadget.type}</h1>
        <img 
          src={gadget.imageUrl} 
          className='h-96 w-[500px] pl-28'

          alt="Image???" />
        <p className='text-cyan-950 pl-28'>Port: {gadget.port}</p>
        <p className='text-cyan-950 pl-28'>Connection: {gadget.wired ? "Wired" : "Wireless"}</p>
        <Footer/> 
      </div>
      
      
    </>
  )*/
  }
  const basicInfoRows = [
    {
      label: "Product ID",
      value: gadget.id,
      icon: <Info className="w-5 h-5" />,
    },
    {
      label: "Product Type",
      value: gadget.type,
      icon: <Info className="w-5 h-5" />,
    },
    {
      label: "Avaliablity",
      value: (
        <Chip
          label="In Stock"
          color="success"
          size="small"
          icon={<CheckCircle />}
          className="font-semibold"
        />
      ),
      icon: <CheckCircle className="w-5 h-5" />,
    },
  ];

  const connectivityRows = [
    {
      label: "Connection Type",
      value: (
        <Chip
          label={gadget.wired ? "Wired" : "Wireless"}
          color={gadget.wired ? "primary" : "secondary"}
          icon={gadget.wired ? <Cable /> : <Wifi />}
          size="small"
          className="font-semibold"
        />
      ),
    },
    {
      label: "Primary Port",
      value: gadget.port,
      className: "font-mono text-blue-600",
    },
    { label: "Additional Ports", value: "Ethernet, Power" },
    { label: "Max Data rate", value: "1 Gbps" },
  ];

  const performanceRows = [
    {
      label: "Storage Capatcity",
      value: `${gadget.storage}  GB`,
      className: "font-bold text-green-600",
    },
    {
      label: "Monitor Support",
      value: (
        <Chip
          label={gadget.Monitor ? "Yes" : "No"}
          color={gadget.Monitor ? "success" : "default"}
          icon={gadget.Monitor ? <CheckCircle /> : <Cancel />}
          size="small"
        />
      ),
    },
    { label: "Memory Type", value: "Flash Memory" },
    { label: "Processor", value: "ARM Cortex-A53" },
  ];

  const physicalRows = [
    { label: "Dimensions (L X W X H)", value: "15.2 x 10.1 x 3.8 cm" },
    { label: "Weight", value: "245g" },
    { label: "Material", value: "ABS Plastic" },
    { label: "Color", value: "Black" },
    { label: "OPerating Temperature", value: "0 deg C-40 deg C" },
    { label: "Power Requirments", value: "5V DC, 2A" },
    {
      label: "Warranty",
      value: "2 Years",
      className: "text-green-600 font-semibold",
    },
  ];

  const createSpecTable = (rows, title, bgColor = "bg-gray-50") => (
    <Card className="h-full shadow-md hover:shadow-lg transition-shadow">
      <CardContent className={`${bgColor} p-6`}>
        <Typography
          variant="h6"
          className="text-gray-800 font-semibold mb-4 flex items-center gap-2"
        >
          {title}
        </Typography>
        <TableContainer component={Paper} className="shadow-sm">
          <Table size="small">
            <TableBody>
              {rows.map((row, index) => (
                <TableRow key={index} className="hover:bg-gray-50">
                  <TableCell className="font-semibold text-gray-700 py-3 w-2/5">
                    {row.label}
                  </TableCell>
                  <TableCell
                    className={`py-3 ${row.className || "text-gray-900"}`}
                  >
                    {row.value}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );

  return (
    <>
      <div>
        <div className="relative h-[10px] bg-gradient-to-br from-sky-50 to-blue-100 pt-[70px] pb-8 w-full">
          <Container maxWidth="lg" className="py-8">
            <Card className="shadow-lg mb-6 overflow-hidden">
              <CardContent className="p-8">
                <Grid container spacing={4}>
                  <Grid item xs={12} md={6}>
                    <Box className="flex justify-center">
                      <Paper elevation={3} className="p-4 rounded-xl bg-white">
                        <img
                          src={gadget.imageUrl}
                          className="h-80 w-auto max-w-full object-contain rounded-lg"
                          alt={`${gadget.type} product image`}
                        />
                      </Paper>
                    </Box>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Box className="space-y-4">
                      <Box className="flex items-center gap-3 mb-6">
                        <Avatar className="bg-cyan-600">
                          <RouterIcon />
                        </Avatar>
                        <Typography
                          variant="h3"
                          className="text-cyan-950 font-bold"
                        >
                          {gadget.type}
                        </Typography>
                      </Box>
                      <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 shadow-sm">
                        <CardContent className="p-6">
                          <Typography
                            variant="h6"
                            className="text-cyan-900 font-semibold"
                          >
                            <Info className="text-cyan-700" />
                            Basic Product Information
                          </Typography>
                          <TableContainer
                            component={Paper}
                            className="shadow-sm"
                          >
                            <Table>
                              <TableBody>
                                {basicInfoRows.map((row, index) => (
                                  <TableRow
                                    key={index}
                                    className="hover:bg-blue-50"
                                  >
                                    <TableCell className="font'semibold text-gray-700 py-3 flex items-center gap-2">
                                      {row.icon}
                                      {row.label}
                                    </TableCell>
                                    <TableCell className="py-3">
                                      {row.value}
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </CardContent>
                      </Card>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            <Card className="shadow-lg mb-6">
              <CardContent className="p-8">
                <Typography
                  variant="h4"
                  className="text-cyan-900 font-bold mb-4 flex items-center gap-3"
                >
                  <Avatar className="bg-orange-500">
                    <Storage />
                  </Avatar>
                  Technical Specification
                </Typography>
                <Divider className="mb-6 border-cyan-200" />
                <Grid container spacing={4}>
                  <Grid item xs={12} md={6}>
                    {createSpecTable(
                      connectivityRows,
                      <>
                        <Cable className="text-blue-600" />
                        <span className="ml-2">Connectivity & Ports</span>
                      </>,
                      "bg-blue-50"
                    )}
                  </Grid>
                  <Grid item xs={12} md={6}>
                    {createSpecTable(
                      performanceRows,
                      <>
                        <Storage className="text-green-600" />
                        <span className="ml-2">Performace & Storage</span>
                      </>,
                      "bg-green-50"
                    )}
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            <Card className="shadow-lg mb-6">
              <CardContent className="p-8">
                <Typography
                  variant="h5"
                  className="text-cyan-900 font-semibold mb-6 flex items-center gap-3"
                >
                  <Avatar className="bg-purple-500 w-8 h-8">
                    <Monitor sx={{ fontSize: 20 }} />
                  </Avatar>
                  Physical Specification
                </Typography>
                <Divider className="mb-6 border-cyan-200" />
                <Card className="bg-gradient-to-r from-gray-50 to-slate-50 SHADOW-SM">
                  <CardContent component={Paper} className="shadow-sm">
                    <Table>
                      <TableBody>
                        {physicalRows.map((row, index) => (
                          <TableRow key={index} className="hover:bg-gray-50">
                            <TableCell className="font-semibold text-gray-700 py-3 w-1/3">
                              {row.label}
                            </TableCell>
                            <TableCell
                              className={`py-3 ${
                                row.className || "text-gray-900"
                              }`}
                            >
                              {row.value}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardContent className="p-8 text-center">
                <Typography variant="h6" className="text-gray-700 mb-4">
                  Ready to get this product?
                </Typography>
                <Box className="flex flex-wrap gap-4 justify-center">
                  <Button
                    variant="contained"
                    startIcon={<ShoppingCart />}
                    className="bg-cyan-600 hover:bg-cyan-700 px-8 py-4 text-lg font-semibold"
                    size="large"
                    onClick={handleAddToCart}
                  >
                    Add to Cart
                  </Button>
                  <Button
                    variant="contained"
                    startIcon={<CreditCard />}
                    className="bg-green-600 hover:bg-green-700 px-8 py-4 text-lg font-semibold"
                    size="large"
                    onClick={() => setShowPayment(true)}
                  >
                    Buy Now
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<Favorite />}
                    className="bg-red-300 text-red-600 hover:bg-red-50 px-6 py-3"
                    size="large"
                  >
                    WishList
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<Compare />}
                    className="bg-blue-300 text-blue-600 hover:bg-red-50 px-6 py-3"
                    size="large"
                  >
                    Compare
                  </Button>
                </Box>
              </CardContent>
            </Card>
            {showPayment && (
              <Card className="shadow-lg mt-6">
                <CardContent className="p-8">
                  <Typography variant="h6" className="mb-4">
                    Complete Your Purshase
                  </Typography>
                  <Grid container spacing={3} className="mb-6">
                    <Grid item xs={12} md={4}>
                      <TextField
                        fullWidth
                        label="Full Name"
                        value={customerInfo.name}
                        onChange={(e) =>
                          setCustomerInfo({
                            ...customerInfo,
                            name: e.target.value
                          })
                        }
                        required
                      />
                    </Grid>
                     <Grid item xs={12} md={4}>
                      <TextField
                        fullWidth
                        label="Email"
                        type="email"
                        value={customerInfo.email}
                        onChange={(e) =>
                          setCustomerInfo({
                            ...customerInfo,
                            email: e.target.value

                          })
                        }
                        required
                      />
                    </Grid>
                     <Grid item xs={12} md={4}>
                      <TextField
                        fullWidth
                        label="Phone (Optional)"
                        value={customerInfo.phone}
                        onChange={(e) =>
                          setCustomerInfo({
                            ...customerInfo,
                            phone: e.target.value
                          })
                        }
                      />
                    </Grid>
                    
                  </Grid>
                  <PaymentButton
                    cartItems={[{
                      id: gadget._id,
                      name: gadget.type,
                      quantity:1,
                      price:999,
                    }]}
                    customerInfo={customerInfo}
                    amount={999}
                    onSuccess={(data)=>{
                      toast.success('Purchase completed successfully!');
                      setShowPayment(false);
                    }}
                    onFailure={(error)=>{
                      toast.error('Purchase failed Please try again');
                    }}
                  />
                  <Button
        variant="outlined"
        onClick={() => setShowPayment(false)}
        className="mt-4"
      >
        Cancel
      </Button>
                </CardContent>
              </Card>
            )}
          </Container>

          <ToastContainer
            position="bottom-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeonClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </div>
      </div>
    </>
  );
};

export default Details;
