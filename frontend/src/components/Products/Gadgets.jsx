
import  React, { useEffect, useState} from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import Box from "@mui/material/Box";
import axios from "axios";
const Gadgets = () => {
  const [gadgets, setGadgets] = useState([])

  useEffect(() => {
    axios
      .get(`http://localhost:4001/gadgets/`)
      .then((response) => {
        setGadgets(response.data);
      })
      .catch((error) => {
        console.error("Error fetching gadget", error);
      });
  }, );
  return (
    <>
      <div className="relative  h-[1500px] w-screen bg-amber-100 mt-[70px]">
        <div className="h-[200px] w-screen">
          <h1 className="border-b-2 mt-96 ml-20 text-amber-950">Gadgets </h1>
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
          {gadgets.map((gadget) => (
            <Card key={gadget._id}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="200"
                  image={gadget.imageUrl || `/image/gadget_not_avaliable.jpg`}
                  alt="gadget??"
                  sx={{
                    objectFit:'fill',
                    width:'100%',
                    height:'300px'
                  }}
                />

                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    <strong>{gadget.type}</strong>
                  </Typography>
                  <Typography gutterBottom variant="body2" component="div">
                    Port: {gadget.port}
                  </Typography>
                   <Typography gutterBottom variant="body2" component="div">
                    Connection: {gadget.wired ? "Wired" : "Wireless"}
                  </Typography>
                   <Typography gutterBottom variant="body2" component="div">
                    Display: {gadget.display}
                  </Typography>
                   <Typography gutterBottom variant="body2" component="div">
                    Storage: {gadget.storage}
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

export default Gadgets;
