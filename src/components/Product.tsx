import { useParams } from "react-router-dom";
import React, {  useState, useEffect } from "react";
import ImgMediaCard from "./mainCard";

type cards = {
  _id: string;
  id: number;
  title: string;
  price: number;
  description: string;
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

export default function Product() {
  const [dataCard, setDataCard] = useState<cards | null>(null);
  useEffect(() => {
    const data = async () => {
      const data = await fetch(
        `http://localhost:3009/products/product/${params.id}`
      );
      const dataj = await data.json();
      console.log(dataj);
      setDataCard(dataj);
    };
    data();
  }, []);
  const params = useParams();
  if (dataCard)
    return (
      <ImgMediaCard
        description={dataCard.data.description}
        key={dataCard.data.id}
        price={dataCard.data.price}
        img={dataCard.data.images[0]}
        titel={dataCard.data.title}
      >
        {" "}
      </ImgMediaCard>
    );
}
