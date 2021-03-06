import Axios from "axios";
import React, { createContext, useState, useEffect } from "react";

export const CategoriesContext = createContext();

const CategoriesProvider = (props) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      const url = "https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list";

      const categories = await Axios.get(url);

      setCategories(categories.data.drinks);
    };
    getCategories();
  }, []);

  return (
    <CategoriesContext.Provider
      value={{
        categories,
      }}
    >
      {props.children}
    </CategoriesContext.Provider>
  );
};

export default CategoriesProvider;
