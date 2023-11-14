import { useParams } from "react-router-dom";
import React, { createContext, useState, useEffect } from "react";
import CardsProdact from "./prodactCard";
import Box from "@mui/material/Box";

type ContactsParams = {
  id: string;
};
type cards = {
  _id: string;
  id: number;
  title: string;
  price: number;
  description: number;
  images: [string, string, string];
  creationAt: string;
  updatedAt: string;
  category: {
    id: number;
    name: string;
    image: string;
    creationAt: string;
    updatedAt: string;
  };
  Stock: number;
  Views: number;
};

export default function Products() {
  const params = useParams();
  const [dataCard, setDataCard] = useState<cards[] | null>(null);
  useEffect(() => {
    const data = async () => {
      const data = await fetch(`http://localhost:3009/products/all/4`);
      const dataj = await data.json();
      setDataCard(dataj);
      console.log(dataj)
    };
    data();
  }, []);
  if(dataCard)
  return (
    <Box sx={{display:"flex" , marginTop:"100px",flexFlow:"wrap"}}>
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
