
import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const ProductGrid = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== "/product") {
      setLoading(false);
      return;
    }

    axios
      .get("http://localhost:5001/api/product", {
        withCredentials: true,
      })
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error →", err);
        setError("Failed to load products");
        setLoading(false);
      });
  }, [location.pathname]);

  if (location.pathname !== "/product") return null;
  if (loading)
    return (
      <Typography align="center" sx={{ mt: 16, fontSize: "1.2rem", color: "#92400e" }}>
        Loading amazing products…
      </Typography>
    );
  if (error)
    return (
      <Typography align="center" color="error" sx={{ mt: 16 }}>
        {error}
      </Typography>
    );

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.3 },
    },
  };

  const cardAnim = {
    hidden: { opacity: 0, y: 80, rotateX: -15 },
    show: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: { type: "spring", stiffness: 110, damping: 20 },
    },
  };

  return (
    <div className="h-[2900px] bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 w-screen ">
   
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center mb-12"
      >
        <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-700 to-orange-600">
          All Products
        </h1>
        <p className="mt-3 text-lg text-amber-700">Discover innovation in every click</p>
      </motion.div>

    
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full px-4 md:px-8"
      >
        <AnimatePresence>
          {products.map((p, index) => {
            const isFeatured = index % 7 === 0;
            return (
              <motion.div
                key={p._id}
                variants={cardAnim}
                layout
                whileHover={{
                  y: -16,
                  scale: 1.04,
                  rotateY: 4,
                  rotateX: 4,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                style={{
                  gridRowEnd: isFeatured ? "span 2" : "span 1",
                }}
                className="w-full h-full flex flex-col relative group"
              >
                <Card
                  raised
                  className="h-full flex flex-col"
                  sx={{
                    height: "500px",
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: 5,
                    overflow: "hidden",
                    background: "linear-gradient(145deg, #ffffff, #f8f4f0)",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                    transition: "all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)",
                    "&:hover": {
                      boxShadow: "0 25px 50px rgba(0,0,0,0.2)",
                    },
                  }}
                >

                  <Box
                    sx={{
                      position: "relative",
                      overflow: "hidden",
                      flexGrow: 1,
                      minHeight: 0,
                    }}
                    onClick={() => navigate(`/product/${p._id}`)}
                    className="cursor-pointer"
                  >
                    <CardMedia
                      component="img"
                      image={
                        p.imageUrl && p.imageUrl.trim()
                          ? p.imageUrl
                          : "/image/product_not_available.jpg"
                      }
                      alt={p.type}
                      sx={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        transition: "transform 0.7s ease",
                        "&:hover": { transform: "scale(1.12)" },
                      }}
                    />
             
                    <Box
                      sx={{
                        position: "absolute",
                        inset: 0,
                        background: isFeatured
                          ? "linear-gradient(135deg, rgba(251,146,60,0.3), rgba(194,65,12,0.5))"
                          : "linear-gradient(135deg, rgba(0,0,0,0.1), rgba(0,0,0,0.4))",
                        transition: "opacity 0.4s",
                        opacity: 0.7,
                        "&:hover": { opacity: 0.9 },
                      }}
                    />
                    
                    <Box
                      sx={{
                        position: "absolute",
                        bottom: 12,
                        right: 12,
                        bgcolor: "rgba(251, 146, 60, 0.95)",
                        color: "white",
                        px: 2,
                        py: 0.5,
                        borderRadius: 3,
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                        transform: "translateY(20px)",
                        transition: "transform 0.3s ease",
                        "&:hover": { transform: "translateY(0)" },
                      }}
                   >
                      VIEW DETAILS
                    </Box>
                  </Box>

                 
                  <CardContent
                    sx={{
                      pb: 1,
                      pt: 2,
                      background: "rgba(255, 255, 255, 0.95)",
                      flexGrow: 0,
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 800,
                        color: "#1a1a1a",
                        fontSize: isFeatured ? "1.4rem" : "1.1rem",
                      }}
                    >
                      {p.type}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
                      {p.brand || "Premium Brand"}
                    </Typography>
                    {p.usage && (
                      <Typography variant="body2" color="amber.700" sx={{ fontSize: "0.85rem", mt: 0.5 }}>
                        {p.usage}
                      </Typography>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default ProductGrid;