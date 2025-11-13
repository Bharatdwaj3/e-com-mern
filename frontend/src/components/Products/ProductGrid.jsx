import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import Box from "@mui/material/Box";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

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
      .get("http://localhost:5001/api/product",{
        headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`
  }
      })
      .then(res => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Fetch error →", err);
        setError(err.message || "Network error");
        setLoading(false);
      });
  }, [location.pathname]);

  if (location.pathname !== "/product") {
    return null;
  }

  if (loading) return <Typography align="center" sx={{ mt: 8 }}>Loading…</Typography>;
  if (error)   return <Typography align="center" color="error" sx={{ mt: 8 }}>{error}</Typography>;

 


  if (location.pathname !== "/product") {
    return null;
  }

  return (
    <>
      <div className="relative min-h-screen w-screen bg-amber-100 pt-20">
        <header className="h-[120px] w-full">
          <h1 className="border-b-2 pt-8 pb-2 ml-20 text-4xl font-bold text-amber-950">
            All Products
          </h1>
        </header>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
              lg: "repeat(4, 1fr)",
            },
            gap: 3,
            p: { xs: 2, md: 3 },
            maxWidth: "1800px",
            mx: "auto",
          }}
        >
          {products.map(p => (
            <Card key={p._id} raised sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
              <CardActionArea onClick={() => navigate(`/product/${p._id}`)}>
                <CardMedia
                  component="img"
                  image={(p.imageUrl && p.imageUrl.trim()) ? p.imageUrl : "/image/product_not_available.jpg"}
                  alt={`${p.type} – ${p.brand}`}
                  sx={{
                    width: "100%",
                    height: { xs: 180, sm: 220, md: 260 },
                    objectFit: "cover",
                  }}
                />
              </CardActionArea>

              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" gutterBottom>
                  <strong>{p.type}</strong>
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  <strong>Brand:</strong> {p.brand || "—"}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  <strong>Usage:</strong> {p.usage || "—"}
                </Typography>

                {p.size && <Typography variant="body2" color="text.secondary"><strong>Size:</strong> {p.size}</Typography>}
                {p.color && <Typography variant="body2" color="text.secondary"><strong>Color:</strong> {p.color}</Typography>}
                {p.material && <Typography variant="body2" color="text.secondary"><strong>Material:</strong> {p.material}</Typography>}
                {p.power !== null && <Typography variant="body2" color="text.secondary"><strong>Power:</strong> {p.power === true ? "Yes" : p.power === false ? "No" : "—"}</Typography>}
                {p.port && <Typography variant="body2" color="text.secondary"><strong>Port:</strong> {p.port}</Typography>}
                {p.wired !== null && <Typography variant="body2" color="text.secondary"><strong>Connection:</strong> {p.wired ? "Wired" : "Wireless"}</Typography>}
                {p.display !== null && <Typography variant="body2" color="text.secondary"><strong>Display:</strong> {p.display === true ? "Yes" : p.display === false ? "No" : "—"}</Typography>}
                {p.storage !== null && <Typography variant="body2" color="text.secondary"><strong>Storage:</strong> {p.storage} GB</Typography>}
              </CardContent>

              <CardActions>
                <Button size="small" color="primary" onClick={() => navigate(`/product/${p._id}`)}>
                  View Details
                </Button>
              </CardActions>
            </Card>
          ))}
        </Box>
      </div>
    </>
  );
};

export default ProductGrid;