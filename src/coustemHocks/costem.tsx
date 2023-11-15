import { useParams } from "react-router-dom";
import data from "../types/dataCards";
import React, {  useState, useEffect } from "react";
const useFetch = (params) => {
    const [dataCard, setDataCard] = useState(null);
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
    return dataCard ;
    };
    export default useFetch