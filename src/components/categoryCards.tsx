import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Box from "@mui/material/Box";

import { useNavigate } from "react-router-dom";

type props = {
  img: string;
  id: string;
  name: string;
};
export default function ActionAreaCard(props: props) {
  const navigate = useNavigate();

  return (
    <Box sx={{ margin: "50px" }}>
      <Card sx={{ maxWidth: 100, borderRadius: 50 }}>
        <CardActionArea onClick={() => navigate(`/Products/${props.id}`)}>
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
