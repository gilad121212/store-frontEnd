import  { useEffect, useState } from "react";
import Typecategore from "../types/Typecategore";
import process from "process";
const URL = process.env.URL;

const useFetch = () => {
  const [dataProduct, setPataProduct] = useState<Typecategore | null>(null);
  useEffect(() => {
    const data = async () => {
      const data = await fetch(
        `http://localhost:3009/products/top5/categories`
      );
      const dataj = await data.json();
      setPataProduct(dataj);
    };
    data();
  }, []);
  return [dataProduct];
};
export default useFetch;
