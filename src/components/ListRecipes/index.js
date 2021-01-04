import React, { useContext, useEffect } from "react";
import Recipe from "../Recipe";
import { RecipesContext } from "../../context/RecipesContext";

const ListRecipes = () => {
  const { recipes } = useContext(RecipesContext);

  console.log(recipes);

  const probar = () => {
    console.log("PROBANDO");
  };

  probar();

  useEffect(() => {
    console.log("Probando useEffect");
  });

  return (
    <div className="row mt-5">
      {recipes.map((recipe) => (
        <Recipe key={recipe.idDrink} recipe={recipe} />
      ))}
    </div>
  );
};

export default ListRecipes;
