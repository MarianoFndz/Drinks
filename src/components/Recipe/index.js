import React, { useContext, useState } from "react";
import { ModalContext } from "../../context/ModalContext";

import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 450,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  h1Color: {
    color: "#ccc",
  },
}));

const Recipe = ({ recipe }) => {
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const { inforecipe, setIdRecipe, setRecipe } = useContext(ModalContext);
  const classes = useStyles();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const showIngredients = (info) => {
    let ingredients = [];

    for (let i = 1; i < 16; i++) {
      if (inforecipe[`strIngredient${i}`]) {
        ingredients.push(
          <li key={i}>
            {inforecipe[`strIngredient${i}`]} {inforecipe[`strMeasure${i}`]}
          </li>
        );
      }
    }
    return ingredients;
  };

  return (
    <div className="col-md-4 mb-3">
      <div className="card">
        <h2 className="card-header">{recipe.strDrink}</h2>
        <img
          className="card-img-top"
          src={recipe.strDrinkThumb}
          alt={`${recipe.strDrink}`}
        />

        <div className="card-body">
          <button
            type="button"
            className="btn btn-block btn-primary"
            onClick={() => {
              setIdRecipe(recipe.idDrink);
              handleOpen();
            }}
          >
            Ver receta
          </button>
          <Modal
            open={open}
            onClose={() => {
              setIdRecipe(null);
              setRecipe({});
              handleClose();
            }}
          >
            <div style={modalStyle} className={classes.paper}>
              <h1 className={classes.h1Color}>{inforecipe.strDrink}</h1>
              <h3 className="mt-4">Instrucciones</h3>
              <p>{inforecipe.strInstructions}</p>
              <img
                className="img-fluid my-4"
                src={inforecipe.strDrinkThumb}
                alt={`${inforecipe.strDrink}`}
              />
              <h3>Ingredientes y cantidades</h3>
              <ul>{showIngredients(inforecipe)}</ul>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Recipe;
