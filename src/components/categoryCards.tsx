import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Box from '@mui/material/Box';

import { useNavigate } from 'react-router-dom';

type props = {
    img:string,
    name:string
    id:string
}
export default function ActionAreaCard(props:props) {
    const navigate = useNavigate()

  return (
    <Box>
    <Card sx={{ maxWidth: 100, borderRadius: 50}}>
      <CardActionArea  onClick={() => navigate(`/Products/${props.name}`)}>
        <CardMedia
          component="img"
          height="100"
          width="70"
          image={props.img}
          alt="green iguana"
        />
      </CardActionArea>
    </Card>
     <Typography gutterBottom variant="h5" component="div">
     {props.name}
   </Typography>
   </Box>
  );
}