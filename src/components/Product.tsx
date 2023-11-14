import { useParams } from "react-router-dom";
import React, { createContext, useState, useEffect } from "react";
import RecipeReviewCard from "./mainCard";
const URL = process.env.url

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

export default function Product(){
    const [dataCard, setDataCard] = useState<cards[] | null>(null);
  useEffect(() => {
    const data = async () => {
      const data = await fetch(
        `${URL}products/product/${params.id}`
      );
      const dataj = await data.json();
      console.log(dataj);
      setDataCard(dataj);
    };
    data();
  }, []);
    const params = useParams();
    if(dataCard)
    return(
        <RecipeReviewCard></RecipeReviewCard>
    )
}