import React, { useState, useEffect } from "react";
import TitlebarImageList from "./TopCards";

type category = {
  img: string;
  category_name: string;
  category_id: string;
}[];

type data = {
  data: category;
};

export default function TopProdact() {
  const [dataProdact, setPataProdact] = useState<data | null>(null);
  useEffect(() => {
    const data = async () => {
      const data = await fetch(
        `http://localhost:3009/products/top5/categories`
      );
      const dataj = await data.json();
      console.log(dataj);
      setPataProdact(dataj);
    };
    data();
  }, []);
  if (dataProdact)
    return <TitlebarImageList data={dataProdact.data}></TitlebarImageList>;
}
