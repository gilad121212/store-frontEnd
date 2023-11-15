import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import MapView from "./openLaiers";

type prop = {
  img: string;
  price: number;
  titel: string;
  description: string;
};

export default function ImgMediaCard(prop: prop) {
  return (
    <div>
      <Card sx={{ maxWidth: 900, marginTop: "50px", marginLeft: "200px" }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="400"
        image={prop.img}
      />
      <CardContent>
        <Typography gutterBottom variant="h4" component="div">
        {prop.titel}
        </Typography>
        <Typography variant="h5" color="text.secondary" component="div">
          praice: {prop.price}
        </Typography>
        <Typography variant="h6" color="text.secondary">
          {prop.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">add to shopping cart</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
    </div>
    );
}
