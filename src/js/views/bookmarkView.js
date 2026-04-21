import icons from 'url:../../img/icons.svg';
import view from './views.js';

class BookmarkView extends view {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = ' No bookmarks yet. Find a nice recipe and bookmark it :)';
  _sucessMessage = '';

  _generateMarkup() {
    console.log(this._data);
    return this._data.map(this._generateMarkupPreview).join('');
  }
  _generateMarkupPreview(data) {
    const id = window.location.hash.slice(1);
    console.log(id);
    return `<li class="preview">
            <a class="preview__link ${data.id === id ? 'preview__link--active' : ''}"  href="#${data.id}">
              <figure class="preview__fig">
                <img src="${data.image}" alt="${data.title}" />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${data.title}</h4>
                <p class="preview__publisher">${data.publisher}</p>
                <div class="preview__user-generated  ${data.key ? '' : 'hidden'}">
                  <svg>
                    <use xlink:href="${icons}#icon-user"></use>
                  </svg>
                </div>
              </div>
            </a>
          </li>`;
  }
}
export default new BookmarkView();
