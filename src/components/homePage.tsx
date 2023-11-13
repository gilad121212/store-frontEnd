import RecipeReviewCard from "./categoryCards";
import { useContext } from "react";
import { UserContext } from "../Context/CategoryContext";

export default function HomePage() {
  const context = useContext(UserContext);
  if (!context) return null;
  const { category } = context;
  return (
    <div className="page">
      {category?.map((category) => (
        <RecipeReviewCard key={category.category_id}
          img={category.img}
          name={category.category_name}
          id={category.category_id}
        ></RecipeReviewCard>
      ))}
    </div>
  );
}
