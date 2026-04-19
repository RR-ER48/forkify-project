import fracty from 'fracty';
import icons from 'url:../../img/icons.svg';
import view from './views.js';

class RecipeView extends view {
  _parentElement = document.querySelector('.recipe');
  _shoppingOverlay = document.querySelector('.rit-overlay');
  _ritclose = document.querySelector('.rit-btn');
  _errorMessage = 'We could not find the recipe, Please try another one!';
  _sucessMessage = '';
  constructor() {
    super();
    this.closeShopping();
  }

  addHandlerRender(handler) {
    ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, handler));
  }
  addHandlerServings(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--update--servings');
      if (!btn) return; //gaurd clause
      console.log(btn);
      const updateTo = +btn.dataset.updateto;
      console.log(updateTo);
      if (updateTo > 0) handler(updateTo);
    });
  }
  addHandlerBookMark(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--bookmark');
      if (!btn) return; //guard clause
      handler();
    });
  }
  shoppingToggle() {
    document.querySelector('.rit-overlay').classList.remove('hidden');
  }
  addHandlerShoping(handler) {
    this._parentElement.addEventListener(
      'click',
      function (e) {
        const btn = e.target.closest('.shopping-user-btn');
        if (!btn) return; //guard clause
        this.shoppingToggle();
        handler();
      }.bind(this),
    );
  }
  closeShopping() {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.rit-close-btn');
      if (!btn) return; //guard clause
      document.querySelector('.rit-overlay').classList.add('hidden');
    });
  }

  _generateMarkup() {
    return `  <figure class="recipe__fig">
          <img src="${this._data.image}" alt="${this._data.title}" class="recipe__img" />
          <h1 class="recipe__title">
            <span>${this._data.title}</span>
          </h1>
        </figure>

        <div class="recipe__details">
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-clock"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--minutes">${this._data.cookingTime}</span>
            <span class="recipe__info-text">minutes</span>
          </div>
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-users"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--people">${this._data.servings}</span>
            <span class="recipe__info-text">servings</span>

            <div class="recipe__info-buttons">
              <button data-updateto="${this._data.servings - 1}" class="btn--tiny btn--update--servings">
                <svg>
                  <use href="${icons}#icon-minus-circle"></use>
                </svg>
              </button>
              <button data-updateto="${this._data.servings + 1}" class="btn--tiny btn--update--servings">
                <svg>
                  <use href="${icons}#icon-plus-circle"></use>
                </svg>
              </button>
            </div>
          </div>
          <div class="recipe__user-generated ${this._data.key ? '' : 'hidden'}">
            <svg>
              <use href="${icons}#icon-user"></use>
            </svg>
          </div>
          <button class="btn--round btn--bookmark">
            <svg class="">
              <use href="${icons}#icon-bookmark${this._data.bookmarked ? '-fill' : ''}"></use>
            </svg>
          </button>
        </div>

         <div class="main-shopping">
            
              <button class="shopping-user-btn">
                Shop Now
             </button>
           
             <div class="rit-overlay hidden">
              <div class="rit-shopping-list">
              <div>
               <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="rit-close-btn"
            >
              <path
                fill-rule="evenodd"
                d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <h3 class="rit-header">Order-Ingredients:)</h3>
       
          <ul class="rit-lists">
          ${this._data.ingredients.map(ing => {
            return `<li class="rit-list"><p class="rit-msg">${ing.description}</p></li>`;
          })}
            
          </ul>
          <button class="rit-btn">Order now</button>
        </div>
      </div>
    </div>
          
        <div class="recipe__ingredients">
          <h2 class="heading--2">Recipe ingredients</h2>
          <ul class="recipe__ingredient-list">
          ${this._data.ingredients.map(this._generateIngredients).join(' ')}
           
          </ul>
        </div>

        <div class="recipe__directions">
          <h2 class="heading--2">How to cook it</h2>
          <p class="recipe__directions-text">
            This recipe was carefully designed and tested by
            <span class="recipe__publisher">${this._data.publisher}</span>. Please check out
            directions at their website.
          </p>
          <a
            class="btn--small recipe__btn"
            href="${this._data.sourceUrl}"
            target="_blank"
          >
            <span>Directions</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </a>
        </div>`;
  }
  _generateIngredients(ing) {
    return `
            <li class="recipe__ingredient">
              <svg class="recipe__icon">
                <use href="${icons}#icon-check"></use>
              </svg>
              <div class="recipe__quantity">${ing.quantity ? fracty(ing.quantity) : ''}</div>
              <div class="recipe__description">
                <span class="recipe__unit">${ing.unit}</span>${ing.description}
              </div>
            </li>`;
  }
}

export default new RecipeView();
