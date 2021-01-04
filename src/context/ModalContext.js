import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const ModalContext = createContext();

const ModalProvider = (props) => {
  const [idrecipe, setIdRecipe] = useState(null);
  const [inforecipe, setRecipe] = useState({});

  useEffect(() => {
    const getRecipe = async () => {
      if (!idrecipe) return;

      const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idrecipe}`;

      const resultado = await axios.get(url);

      setRecipe(resultado.data.drinks[0]);
    };
    getRecipe();
  }, [idrecipe]);

  return (
    <ModalContext.Provider
      value={{
        inforecipe,
        setRecipe,
        setIdRecipe,
      }}
    >
      {props.children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
