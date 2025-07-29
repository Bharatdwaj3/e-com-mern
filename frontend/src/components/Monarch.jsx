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
const Monarch = () => {
  const [monarch, setMonarchs] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/monarchs/`)
      .then((response) => {
        setMonarchs(response.data);
      })
      .catch((error) => {
        console.error("Error fetching sodaing Monarch", error);
      });
  }, []);
  return (
    <>
      <div className=" relative  h-[1500px] w-screen bg-amber-100 ">
        <div className="h-[200px] w-screen">
          <h1 className="border-b-2 mt-96 ml-20 text-amber-950">Monarchs</h1>
        </div>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gridTemplateRows: "repeat(4, 1fr)",
            gap: 2,
            padding: 2,
            maxWidth: "1500px",
            paddingLeft: "200px",
          }}
        >
          {monarch.map((monarch) => (
            <Card key={monarch._id}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="200"
                  image={monarch.imageUrl || `/image/image_not_found_monarch.jpg`}
                  alt="monarchy??"
                  sx={{
                    objectFit:'cover',
                    
                  }}
                />

                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {monarch.name}
                  </Typography>
                  <br />
                  <Typography gutterBottom variant="h5" component="div">
                    {monarch.title}
                  </Typography>
                  <br />
                  <Typography gutterBottom variant="body" sx={{ mb: 1 }}>
                    <strong>Born: </strong>
                    {new Date(monarch.dob).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </Typography>
                  <br />
                  <Typography gutterBottom variant="body" sx={{ mb: 1 }}>
                    <strong>Died: </strong>
                    {new Date(monarch.dod).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </Typography>
                  <br />
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Mortality_Status: </strong>
                    {monarch.alive ? "Alive" : "Dead"}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Religion: </strong>
                    {monarch.religion}
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

export default Monarch;
