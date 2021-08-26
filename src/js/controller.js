import { async } from "regenerator-runtime/runtime";
import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";
import resultsView from "./views/resultsView.js";

// import "core-js/stable";
//Polyfill
// if (module.hot) {
//   module.hot.accept();
// }

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
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();
    //Get search query
    const query = searchView.getQuery();
    if (!query) return;

    //Load search results
    await model.loadSearchResults(query);

    //Render search results
    // resultsView.render(model.state.search.result);
    resultsView.render(model.getSearchResultsPage());
  } catch (err) {
    console.log(err);
  }
};

// controlSearchResults();

const init = function () {
  recipeView.addHandlerRender(controlRecipe); //publisher - subscriber pattern
  searchView.addHandlerSearch(controlSearchResults);
};

init();
