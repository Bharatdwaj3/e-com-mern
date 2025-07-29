
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
const Bourgouise = () => {

    const [Bourgouise, setBourgouise] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/bourgouise/`)
      .then((response) => {
        setBourgouise(response.data);
      })
      .catch((error) => {
        console.error("Error fetching sodaing Bourgouise", error);
      });
  }, []);
  return (
    <>
      <div className="relative  h-[1500px] w-screen bg-amber-100 mt-[70px]">

        <div className="h-[200px] w-screen">
          <h1 className="border-b-2 mt-96 ml-20 text-amber-950">Bourgouise</h1>
        </div>
        
      
         
        <Box sx={{
        display:'grid', 
        gridTemplateColumns:'repeat(4, 1fr)',
        gridTemplateRows:'repeat(4, 1fr)',
        gap:2,
        padding:2,
        maxWidth:'1500px',
        paddingLeft:'200px'
      }}>
          
                 {Bourgouise.map((Bourgouise)=>(
            <Card  key={Bourgouise._id}>
              <CardActionArea>
                <CardMedia
                    component="img"
                    height="200"
                    image={`/image/Image_not_found_bourgeois.jpg`}
                    alt="Bourgouisey??"
                />

                <CardContent >
                  <Typography gutterBottom variant='h5' component="div">{Bourgouise.name}</Typography>
                   <br /><Typography gutterBottom variant='h5' component="div">{Bourgouise.title}</Typography>
                   <br /><Typography gutterBottom variant='body' sx={{mb:1}}><strong>Born: </strong>{new Date(Bourgouise.dob).toLocaleDateString('en-US',{
                year:'numeric',
                month:'long',
                day:'numeric',
              })}</Typography>
               <br />
                  <Typography gutterBottom variant='body' sx={{mb:1}}><strong>Died: </strong>{new Date(Bourgouise.dod).toLocaleDateString('en-US',{
                year:'numeric',
                month:'long',
                day:'numeric',
              })}</Typography>
              <br />
                  <Typography variant='body2' sx={{mb:1}}><strong>Mortality_Status: </strong>{Bourgouise.alive? 'Alive':'Dead'}</Typography>
                  <Typography variant='body2'><strong>Religion: </strong>{Bourgouise.religion}</Typography>
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

export default Bourgouise