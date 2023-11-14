import ResponsiveAppBar from "./AppBar"
import RecipeReviewCard from "./categoryCards"
import React, { useContext } from 'react';
import { UserContext } from "../Context/CategoryContext";
import Box from "@mui/material/Box";


export default function HomePage(){
    const context = useContext(UserContext);
if (!context) return null;
const {category, setCategory } = context

    return(
       <Box sx={{display:"flex" , justifyContent:"center", alignItems:"center" , marginTop:"100px"}}>
         
         {category?.map((arr)=> (<RecipeReviewCard id={arr.category_id} img={arr.img} name={arr.category_name} ></RecipeReviewCard>) )}
         </Box>

       
       )
}