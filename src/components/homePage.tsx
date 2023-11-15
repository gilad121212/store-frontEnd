import RecipeReviewCard from "./categoryCards";
import { useContext } from "react";
import { UserContext } from "../Context/CategoryContext";
import Box from "@mui/material/Box";
import TopCategory from "./topProdacts";
import TopProdact from "./TopCategorys";
import TitlebarImageList from "./TopCards";


export default function HomePage() {
  const context = useContext(UserContext);
  if (!context) return null;
  const { category, setCategory } = context;

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "100px",
        }}
      >
        {category?.map((arr) => (
          <RecipeReviewCard
            id={arr.category_id}
            img={arr.img}
            name={arr.category_name}
          ></RecipeReviewCard>
        ))}
      </Box >
     <Box sx={{display:"flex", margin: "50px" ,justifyContent:"space-around" , alignItems:"center"}}>
     <TopProdact></TopProdact>
      <TopCategory></TopCategory>
     </Box>
    </Box>
  );
}
