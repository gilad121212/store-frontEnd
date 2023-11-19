import CardsProdact from "./SortProdactsCard";
import TypeprodactsCard from "../types/TypeprodactsCard";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
export default function Comparison() {
  const [dataCard, setDataCard] = useState<TypeprodactsCard[] | null>();
  useEffect(() => {
    const arr = localStorage.getItem("arr");
    if (arr) {
      const arrJ = JSON.parse(arr);
      setDataCard(arrJ);
    }
  }, []);
  function clean() {
    localStorage.removeItem("arr");
    localStorage.setItem("arr", JSON.stringify([]));
    setDataCard(null);
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexFlow: "wrap",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
        <Button onClick={clean}>clean everything</Button>
      </Box>
      <Box sx={{ display: "flex", flexFlow: "wrap" }}>
        {dataCard?.map((card) => (
          <CardsProdact
            title={card.title}
            id={card.id}
            price={card.price}
            img={card.img}
          ></CardsProdact>
        ))}
      </Box>
    </Box>
  );
}
