import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

type prop = {
  img: string;
  price: number;
  titel: string;
  description: string;
};

export default function ImgMediaCard(prop: prop) {
  return (
    <Card sx={{ maxWidth: 900, marginTop: "50px", marginLeft: "200px" }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="400"
        image={prop.img}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          praice {prop.price}
        </Typography>
        <Typography variant="h6" color="text.secondary">
          {prop.titel}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {prop.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">add to shopping cart</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}
