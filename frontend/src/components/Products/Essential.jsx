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
const Essential = () => {
  const [essentials, setEssentials] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:4001/essential/`)
      .then((response) => {
        setEssentials(response.data);
      })
      .catch((error) => {
        console.error("Error fetching sodaing Essential", error);
      });
  }, []);
  return (
    <>
      <div className=" relative  h-[1500px] w-screen bg-amber-100 ">
        <div className="h-[200px] w-screen">
          <h1 className="border-b-2 mt-96 ml-20 text-amber-950">Essentials</h1>
        </div>

         <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gridTemplateRows: "repeat(4, 1fr)",
            gap: 2,
            padding: 2,
            maxWidth: "1800px",
            maxHeight: "2500px",
            paddingLeft: "100px",
          }}
        >
          {essentials.map((essential) => (
            <Card key={essential._id}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="200"
                  image={essential.imageUrl || `/image/essential_not_avaliable.jpg`}
                  alt="essential??"
                  sx={{
                    objectFit:'fill',
                    width:'100%',
                    height:'300px'
                  }}
                />

                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    <strong>Product Type: {essential.product_type}</strong>
                  </Typography>
                  <Typography gutterBottom variant="body2" component="div">
                    Brand: {essential.brand}
                  </Typography>
                   <Typography gutterBottom variant="body2" component="div">
                    Material: {essential.wired}
                  </Typography>
                   <Typography gutterBottom variant="body2" component="div">
                    Color: {essential.color}
                  </Typography>
                   <Typography gutterBottom variant="body2" component="div">
                    Usage: {essential.usage}
                  </Typography> 
                  <Typography gutterBottom variant="body2" component="div">
                    Power Source Needed? : {essential.power ? "Yes" : "No"}
                  </Typography>
                    
                </CardContent>
                <CardActionArea>
                  <CardActions>
                    <Button size="small" color="primary">
                      View Details
                    </Button>
                  </CardActions>
                </CardActionArea>
              </CardActionArea>
            </Card>
          ))}
        </Box>
      </div>
    </>
  );
};

export default Essential;
