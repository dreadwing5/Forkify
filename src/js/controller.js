import { async } from "regenerator-runtime/runtime";
import * as model from "./model.js";
import recipeView from "./views/recipeView.js";

// import "core-js/stable";
//Polyfill

const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;

    //1). Loading Recipe

    recipeView.renderSpinner();

    await model.loadRecipe(id);

    //2).Rendering Recipe

    recipeView.render(model.state.recipe);
  } catch (err) {
    console.log(err);
  }
};

["hashchange", "load"].forEach((ev) =>
  window.addEventListener(ev, controlRecipe)
);
