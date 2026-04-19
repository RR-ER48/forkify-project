import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationViews.js';
import bookmarkView from './views/bookmarkView.js';
import addRecipeView from './views/addRecipeView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

// console.log(icons);

const recipeContainer = document.querySelector('.recipe');

// NEW API URL (instead of the one shown in the video)
// https://forkify-api.jonas.io

///////////////////////////////////////

// if (Module.hot) {
//   Module.hot.accept();
// }

console.log('TESTritwik');
console.log('helo');

async function showRecipe() {
  try {
    const id = window.location.hash.slice(1);
    console.log(id);
    if (!id) return; //guard clause
    recipeView.renderSpinner();

    //0 when select then mark
    resultsView.render(model.getPage());
    bookmarkView.render(model.state.bookmarks);
    //1. loading the recipe
    await model.loadRecipe(id);
    const { recipe } = model.state;

    console.log(recipe);
    //2. rendering the recipe
    recipeView.render(model.state.recipe);
    console.log(recipe);
  } catch (err) {
    // alert(err);
    console.log(err);
    recipeView.renderError();
  }
}

async function controlSearchResults() {
  try {
    resultsView.renderSpinner();
    // user search
    const query = searchView.getQuery();
    // loading result
    await model.loadSearchResults(query);
    console.log(model.state.search.results);
    console.log(model.state.search.query);
    // render result
    // resultsView.render(model.state.search.results);
    resultsView.render(model.getPage());

    // render initialing pagination
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
    resultsView.renderError();
  }
}

function controlPagination(goToPage) {
  console.log('pag control');
  resultsView.render(model.getPage(goToPage));

  // render initialing pagination
  paginationView.render(model.state.search);
}

function controlServings(newServings) {
  model.updateServings(newServings);
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
}

function controlBookmark() {
  //1 add and remove bookmark
  if (!model.state.recipe.bookmarked) {
    model.addBookMark(model.state.recipe);
  } else {
    model.deleteBookmark(model.state.recipe.id);
  }
  console.log(model.state.recipe);
  //2.render/update bookmark
  recipeView.render(model.state.recipe);
  //3 render bookmark in bookmark
  bookmarkView.render(model.state.bookmarks);
}
async function controlAddRecipe(newRecipe) {
  try {
    addRecipeView.renderSpinner();
    //upload the newRecipe
    console.log(newRecipe);
    await model.uploadRecipe(newRecipe);
    //change id in url
    window.history.pushState(null, '', `#${model.state.recipe.id}`);
    //render recipe
    recipeView.render(model.state.recipe);
    //render boomark
    bookmarkView.render(model.state.bookmarks);
    //success message
    addRecipeView.renderMessage();
    //close window
    addRecipeView.closeWindow();
    location.reload();
  } catch (err) {
    console.log(err);
    addRecipeView.renderError(err.message);
  }
}
function controlShopping() {
  // shopping.renderShop(model.state.recipe);
  // console.log(model.state.recipe.ingredients);
  console.log('button');
  // recipeView.render(model.state.recipe);
}
// controlSearchResults();
// showRecipe();

// window.addEventListener('hashchange', showRecipe);
// window.addEventListener('load', showRecipe);
function init() {
  recipeView.addHandlerRender(showRecipe);
  recipeView.addHandlerShoping(controlShopping);
  searchView.addHandlerSearch(controlSearchResults);
  recipeView.addHandlerBookMark(controlBookmark);
  paginationView.addHandlerClick(controlPagination);
  recipeView.addHandlerServings(controlServings);
  addRecipeView.addHandlerUpload(controlAddRecipe);
  console.log('welcome');
}
init();
