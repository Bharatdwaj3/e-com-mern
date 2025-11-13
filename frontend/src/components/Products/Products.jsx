// src/pages/Product.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import {
  Card, CardContent, CardMedia, CardActionArea, CardActions,
  Typography, Button, Box, Grid, Skeleton, Container
} from "@mui/material";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5001/api/product", {
          withCredentials: true  
        });
        setProducts(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to load products");
        setLoading(false);
      }
    };

    if (location.pathname === "/product") {
      fetchProducts();
    } else {
      setLoading(false);
    }
  }, [location.pathname]);

  // Not on /product → don't render
  if (location.pathname !== "/product") return null;

  return (
    <Box className="w-screen bg-gradient-to-br from-slate-50 to-gray-100 min-h-screen">
      <Container maxWidth="xl" className="pt-24 pb-12">
        <Typography variant="h3" className="text-slate-800 font-bold mb-8 text-center">
          All Products
        </Typography>

        {loading && (
          <Grid container spacing={4}>
            {[...Array(8)].map((_, i) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
                <Skeleton variant="rectangular" height={300} className="rounded-xl" />
              </Grid>
            ))}
          </Grid>
        )}

        {error && (
          <Typography color="error" align="center" className="mt-8">
            {error}
          </Typography>
        )}

        {!loading && !error && (
          <Grid container spacing={4}>
            {products.map(p => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={p._id}>
                <Card
                  raised
                  className="h-full flex flex-col hover:shadow-xl transition-shadow"
                  onClick={() => navigate(`/product/${p._id}`)}
                >
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      image={p.imageUrl?.trim() ? p.imageUrl : "/image/product_not_available.jpg"}
                      alt={p.type}
                      className="h-48 object-cover"
                    />
                  </CardActionArea>

                  <CardContent className="flex-grow">
                    <Typography variant="h6" className="font-bold text-slate-800">
                      {p.type}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Brand:</strong> {p.brand || "—"}
                    </Typography>
                    {p.price && (
                      <Typography variant="h6" className="text-green-600 font-bold mt-2">
                        ${p.price.toFixed(2)}
                      </Typography>
                    )}
                  </CardContent>

                  <CardActions>
                    <Button
                      size="small"
                      color="primary"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/product/${p._id}`);
                      }}
                    >
                      View Details
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default Products;