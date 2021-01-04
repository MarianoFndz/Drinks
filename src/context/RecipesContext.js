import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
export const RecipesContext = createContext();

const RecipesProvider = (props) => {
  const [recipes, setRecipes] = useState([]);
  const [consult, setConsult] = useState(false);

  const [searchRecipe, setSearchRecipe] = useState({
    ingredient: "",
    category: "",
  });

  const { ingredient, category } = searchRecipe;

  useEffect(() => {
    if (consult) {
      const obtenerRecetas = async () => {
        const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}&c=${category}`;
        const resultado = await axios.get(url);

        setRecipes(resultado.data.drinks);
      };
      obtenerRecetas();
    }
  }, [searchRecipe]);

  return (
    <RecipesContext.Provider
      value={{
        recipes,
        setSearchRecipe,
        setConsult,
      }}
    >
      {props.children}
    </RecipesContext.Provider>
  );
};

export default RecipesProvider;
