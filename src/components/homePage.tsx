import RecipeReviewCard from "./categoryCards"
import { useContext } from 'react';
import { UserContext } from "../Context/CategoryContext";


export default function HomePage(){
    const context = useContext(UserContext);
if (!context) return null;
const {category, setCategory } = context

    return(
       <div>
         
         {category?.map((arr)=> (<RecipeReviewCard img={arr.img} name={arr.category_name} ></RecipeReviewCard>) )}
       </div>
    )
}