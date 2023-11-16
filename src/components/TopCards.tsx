import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import category from "../types/Typecategore";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";

type data = {
  data: category;
};

export default function TitlebarImageList(data: data) {
  const navigate = useNavigate();
  return (
    <ImageList sx={{ width: 500, height: 450 }}>
      <ImageListItem key="Subheader" cols={2}>
      <Typography gutterBottom variant="h4" component="div">top 5 categories</Typography>
      </ImageListItem>
      {data.data.map((item) => (
        <ImageListItem key={item.img}>
          <img
            srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
            src={`${item.img}?w=248&fit=crop&auto=format`}
            alt={item.img}
            loading="lazy"
          />
          <ImageListItemBar
          onClick={() => navigate(`/Products/${item.category_id}`)}
            title={item.category_name}
            subtitle=""
            actionIcon={
              <IconButton
                sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                aria-label={`info about ${item.img}`}
              >
                <InfoIcon />
              </IconButton>
            }
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}
