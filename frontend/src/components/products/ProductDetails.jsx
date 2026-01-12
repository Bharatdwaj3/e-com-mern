import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Footer } from "../layout/index";
import {
  Container,
  Box,
  Typography,
  Button,
  Skeleton,
  Divider,
} from "@mui/material";
import { toast } from "react-toastify";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:5001/api/product/${id}`, {
          withCredentials: true,
        });
        setProduct(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        toast.error("Product not found or server error");
        setLoading(false);
        navigate("/product", { replace: true });
      }
    };
    fetchProduct();
  }, [id, navigate]);

  if (loading) {
    return (
      <Box className="w-screen bg-gradient-to-br from-slate-50 to-gray-100 min-h-screen pt-24">
        <Container maxWidth="lg">
          <Skeleton height={400} className="mb-6 rounded-xl" />
          <Skeleton height={60} width="60%" className="mb-4" />
          <Skeleton height={100} />
        </Container>
      </Box>
    );
  }

  if (!product) return null;

  return (
    <>
      <Box className="w-screen bg-gradient-to-br from-slate-50 to-gray-100 min-h-screen">
        <Container maxWidth="lg" className="pt-24 pb-12">
          <Button
            onClick={() => navigate(-1)}
            className="mb-6"
            startIcon={<span>Back</span>}
          >
            Back to Products
          </Button>

          <Box className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <Box className="grid md:grid-cols-2 gap-8 p-6">
              <Box>
                <img
                  src={
                    product.imageUrl?.trim() ||
                    "/image/product_not_available.jpg"
                  }
                  alt={product.type}
                  className="w-full h-auto rounded-xl object-cover shadow-md"
                />
              </Box>
              <Box>
                <Typography
                  variant="h3"
                  className="font-bold text-slate-800 mb-4"
                >
                  {product.type || "Unknown Product"}
                </Typography>
                <Typography
                  variant="h5"
                  className="text-green-600 font-bold mb-6"
                >
                  ${product.price ? Number(product.price).toFixed(2) : "—"}
                </Typography>
                <Divider className="mb-6" />
                <Box className="space-y-3 text-gray-700">
                  <Typography>
                    <strong>Brand:</strong> {product.brand || "—"}
                  </Typography>
                  <Typography>
                    <strong>Usage:</strong> {product.usage || "—"}
                  </Typography>
                  {product.size && (
                    <Typography>
                      <strong>Size:</strong> {product.size}
                    </Typography>
                  )}
                  {product.color && (
                    <Typography>
                      <strong>Color:</strong> {product.color}
                    </Typography>
                  )}
                  {product.material && (
                    <Typography>
                      <strong>Material:</strong> {product.material}
                    </Typography>
                  )}
                  {product.power !== undefined && (
                    <Typography>
                      <strong>Power:</strong> {product.power ? "Yes" : "No"}
                    </Typography>
                  )}
                  {product.port && (
                    <Typography>
                      <strong>Port:</strong> {product.port}
                    </Typography>
                  )}
                  {product.wired !== undefined && (
                    <Typography>
                      <strong>Connection:</strong>{" "}
                      {product.wired ? "Wired" : "Wireless"}
                    </Typography>
                  )}
                  {product.display !== undefined && (
                    <Typography>
                      <strong>Display:</strong> {product.display ? "Yes" : "No"}
                    </Typography>
                  )}
                  {product.storage != null && (
                    <Typography>
                      <strong>Storage:</strong> {product.storage} GB
                    </Typography>
                  )}
                </Box>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  fullWidth
                  className="mt-8"
                  onClick={() => {
                    const cart = JSON.parse(
                      localStorage.getItem("cartItems") || "[]"
                    );
                    const productId = product._id;

                    const existing = cart.find(
                      (item) => item._id === productId
                    );
                    if (existing) {
                      existing.quantity += 1;
                      toast.info("Quantity +1");
                    } else {
                      cart.push({
                        _id: productId,
                        type: product.type,
                        imageUrl: product.imageUrl,
                        price: Number(product.price),
                        quantity: 1,
                      });
                      toast.success("Added to cart!");
                    }
                    localStorage.setItem("cartItems", JSON.stringify(cart));
                  }}
                >
                  Add to Cart
                </Button>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default ProductDetails;
