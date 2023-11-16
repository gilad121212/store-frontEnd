import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import ImgMediaCard from "./ProductCard";
import TypeProductsSort from "../types/TypeProductsSort";

export default function Product() {
  const [dataCard, setDataCard] = useState<TypeProductsSort | null>(null);
  useEffect(() => {
    const data = async () => {
      const data = await fetch(
        `http://localhost:3009/products/product/${params.id}`
      );
      const dataj = await data.json();
      console.log("gilad")
      console.log(dataj);
      setDataCard(dataj.data);
    };
    data();
  }, []);
  const params = useParams();
  if (dataCard)
    return (
      <ImgMediaCard
        key={dataCard.id}
        img={dataCard.images[0]}
        description={dataCard.description}
        price={dataCard.price}
        title={dataCard.title}
      ></ImgMediaCard>
    );
}
