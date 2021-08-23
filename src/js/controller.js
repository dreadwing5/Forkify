import {
  getRecipeHtml,
  getSpinnerHtml,
  renderRecipe,
  renderSpinner,
} from "./template";

//Polyfill
/* import "core-js/stable";
import "regenerator-runtime/runtime"; */

const recipeContainer = document.querySelector(".recipe");

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

const showRecipe = async function () {
  try {
    //1). Loading Recipe
    const spinnerHtml = getSpinnerHtml();
    recipeContainer.insertAdjacentHTML("afterbegin", spinnerHtml);

    const res = await fetch(
      "https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bcc7e"
    );
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);

    console.log(res, data);
    let { recipe } = data.data;
    recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };

    //2).Rendering Recipe
    recipeContainer.innerHTML = "";
    const recipeHtml = getRecipeHtml(recipe);

    recipeContainer.insertAdjacentHTML("afterbegin", recipeHtml);

    console.log(recipe);
  } catch (err) {
    alert(err);
  }
};

showRecipe();
