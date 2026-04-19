import { API_URL, KEY } from './config';
import { getJson, sendJson } from './helpers';
export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    page: 1,
    resultPage: 10,
  },
  bookmarks: [],
};

export async function loadRecipe(id) {
  try {
    // const res = await fetch(
    //   `${API_URL}/${id}`,
    //   // `https://forkify-api.jonas.io/api/v2/recipes/${id}`,
    //   // `https://forkify-api.jonas.io/api/v2/recipes/664c8f193e7aa067e94e8605`,
    // );
    // // console.log(res);
    // const data = await res.json();
    // // console.log(data);
    // if (!res.ok) throw new Error(`${data.message}, (${res.status})`);

    const data = await getJson(`${API_URL}${id}?key=${KEY}`); //we add key because when you search own recipe you see not others
    const { recipe } = data.data;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
      ...(recipe.key && { key: recipe.key }), //if key exist in recipe
    };
    // state.recipe = recipe;
    //bookmark
    if (state.bookmarks.some(b => b.id === id))
      state.recipe.bookmarked = true; //
    else state.recipe.bookmarked = false;

    console.log(state.recipe);
    console.log(state);
  } catch (err) {
    // alert(err);
    console.error(`${err} 💥💥💥`);
    throw err;
  }
}
// console.log(state);

export async function loadSearchResults(query) {
  try {
    state.search.query = query;
    const data = await getJson(`${API_URL}?search=${query}&key=${KEY}`); //we add key because when you search own recipe you see not others
    console.log(data);
    // console.log(data.data.recipes);
    state.search.results = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,

        image: rec.image_url,
        ...(rec.key && { key: rec.key }), //if key exist in recipe
      };
    });
    console.log(state.search.results);
    state.search.page = 1; // when ever search back to page 1
  } catch (err) {
    console.log(`${err} 💥💥💥`);
  }
}
// loadSearchResults('pizza');

export function getPage(page = state.search.page) {
  state.search.page = page;
  const start = (page - 1) * state.search.resultPage;
  const end = page * state.search.resultPage;
  console.log(start, end, state.search.page);
  return state.search.results.slice(start, end);
}

export function updateServings(newServings) {
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
  });
  state.recipe.servings = newServings;
}

function presistBookmark() {
  localStorage.setItem('bookmark', JSON.stringify(state.bookmarks));
}

export function addBookMark(recipe) {
  //add book mark
  state.bookmarks.push(recipe);
  // mark current recipe as book mark
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;

  presistBookmark();
}

export function deleteBookmark(id) {
  const index = state.bookmarks.findIndex(el => el.id === id);
  state.bookmarks.splice(index, 1);
  //mark current recipe not bookmark
  if (id === state.recipe.id) state.recipe.bookmarked = false;

  presistBookmark();
}

function init() {
  const storage = localStorage.getItem('bookmark');
  if (storage) state.bookmarks = JSON.parse(storage);
}
init();
function clearBookmark() {
  localStorage.clear('bookmarks');
}
// clearBookmark();
console.log(state.bookmarks);

export async function uploadRecipe(newRecipe) {
  try {
    console.log(Object.entries(newRecipe));
    const ingredients = Object.entries(newRecipe)
      .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
      .map(ing => {
        // const ingArr = ing[1].replaceAll(' ', '').split(',');
        const ingArr = ing[1].split(',').map(el => el.trim());
        if (ingArr.length !== 3)
          throw new Error(
            'wrong ingredient format! please use tge correct format',
          );
        const [quantity, unit, description] = ingArr;
        return { quantity: quantity ? +quantity : null, unit, description };
      });

    console.log(ingredients);

    const recipe1 = {
      title: newRecipe.title,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.image,
      publisher: newRecipe.publisher,
      cooking_time: newRecipe.cookingTime,
      servings: newRecipe.servings,
      ingredients,
    };
    console.log(recipe1);

    const data = await sendJson(`${API_URL}?key=${KEY}`, recipe1);
    const { recipe } = data.data;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
      ...(recipe.key && { key: recipe.key }), //if key exist in recipe
    };
    console.log(data);
    // console.log(recipe);
    console.log(state.recipe);
    //bookmark always
    addBookMark(state.recipe);
  } catch (err) {
    throw err;
  }
}
