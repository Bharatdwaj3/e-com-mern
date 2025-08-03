import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import Box from '@mui/material/Box';
import axios from "axios";
const Clothing = () => {

    const [clothings, setClothing] = useState([]);
    const server = import.meta.env.Server;

  useEffect(() => {
    axios
      .get(`http://localhost:4001/clothing/`)
      .then((response) => {
        setClothing(response.data);
      })
      .catch((error) => {
        console.error("Error fetching sodaing Clothing", error);
      });
  }, [server]);
  return (
    <>


        <div className="relative  h-[1500px] w-screen bg-amber-100">
          <div className="h-[200px] w-screen">
          <h1 className="border-b-2 mt-96 ml-20 text-amber-950">Clothing</h1>
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
          {clothings.map((clothing) => (
            <Card key={clothing._id}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="200"
                  image={clothing.imageUrl || `/image/clothing_not_avaliable.jpg`}
                  alt="clothing??"
                  sx={{
                    objectFit:'fill',
                    width:'100%',
                    height:'300px'
                  }}
                />

                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Type: <strong>{clothing.type}</strong>
                  </Typography>
                  <Typography gutterBottom variant="body2" component="div">
                    Size: {clothing.size}
                  </Typography>
                    <Typography gutterBottom variant="body2" component="div">
                    Brand: {clothing.brand}
                  </Typography>
                   <Typography gutterBottom variant="body2" component="div">
                    Color: {clothing.color}
                  </Typography>
                   <Typography gutterBottom variant="body2" component="div">
                    Material: {clothing.material}
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
  )
}

export default Clothing