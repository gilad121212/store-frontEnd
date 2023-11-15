import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import ListSubheader from "@mui/material/ListSubheader";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import category from "../types/typeCategory";
import React, { useState, useEffect } from "react";
import data from "../types/dataCards";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";


export default function TopCategory() {
  const navigate = useNavigate();
  const [dataCard, setDataCard] = useState<data | null>(null);
  useEffect(() => {
    const data = async () => {
      const data = await fetch(`http://localhost:3009/products/top5/products`);
      const dataj = await data.json();
      setDataCard(dataj);
    };
    data();
  }, []);
  if (dataCard)
    return (
      <ImageList  sx={{ width: 500, height: 450 }}>
        <ImageListItem key="Subheader" cols={2}>
        <Typography gutterBottom variant="h4" component="div">top 5 category</Typography>
        </ImageListItem>
        {dataCard.data.map((item) => (
          <ImageListItem key={item.images[0]}>
            <img
              srcSet={`${item.images[0]}?w=248&fit=crop&auto=format&dpr=2 2x`}
              src={`${item.images[0]}?w=248&fit=crop&auto=format`}
              alt={item.images[0]}
              loading="lazy"
            />
            <ImageListItemBar
              onClick={() => navigate(`/Product/${item.id}`)}
              title={item.images[0]}
              subtitle="gilad"
              actionIcon={
                <IconButton
                  sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                  aria-label={`info about ${item.images[0]}`}
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
