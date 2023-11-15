import { useParams } from "react-router-dom";
import React, {  useState, useEffect } from "react";
import CardsProdact from "./prodactsCard";
import Box from "@mui/material/Box";
import data from "../types/dataCards";



export default function Products() {
  const params = useParams();
  const [dataCard, setDataCard] = useState<data | null>(null);
  useEffect(() => {
    const data = async () => {
      const data = await fetch(
        `http://localhost:3009/products/all/${params.name}`
      );
      const dataj = await data.json();
      setDataCard(dataj);
      console.log(dataj);
    };
    data();
  }, []);
  if (dataCard)
    return (
      <Box sx={{ display: "flex", marginTop: "100px", flexFlow: "wrap" }}>
        {dataCard.data.map((arr) => (
          <CardsProdact
            key={arr.id}
            img={arr.images[0]}
            id={arr.id}
            title={arr.title}
          ></CardsProdact>
        ))}
      </Box>
    );
}
