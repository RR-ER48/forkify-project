import icons from 'url:../../img/icons.svg';
import view from './views.js';

class PaginationView extends view {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return; //guard clause
      console.log(btn);
      const goToPage = +btn.dataset.goto;
      console.log(goToPage);
      handler(goToPage);
    });
  }

  _generateMarkup() {
    console.log(this._data);
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultPage,
    );
    console.log(numPages);
    // Page 1 and there are other pages
    if (curPage === 1 && numPages > 1) {
      return `<button data-goto="${curPage + 1}" class="btn--inline pagination__btn--next">
            <span>Page ${curPage + 1}</span>
            <svg class="search__icon">
              <use xlink:href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>`;
      // return this._generateNext(curPage);
    }

    //last page
    if (curPage === numPages && numPages > 1) {
      return `<button data-goto="${curPage - 1}" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use xlink:href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage - 1}</span>
          </button>
          `;
      // return this._generatePrevious(curPage);
    }

    //other page
    if (curPage < numPages) {
      return `<button data-goto="${curPage - 1}" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use xlink:href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage - 1}</span>
          </button>
          <button data-goto="${curPage + 1}" class="btn--inline pagination__btn--next">
            <span>Page ${curPage + 1}</span>
            <svg class="search__icon">
              <use xlink:href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>`;
      // return this._generatePrevious(curPage) + this._generateNext(curPage);
    }

    //page 1 and there is no other pages
    else {
      return '';
    }
  }
  _generateNext(curPage) {
    return `<button data-goto="${curPage + 1}" class="btn--inline pagination__btn--next">
            <span>Page ${curPage + 1}</span>
            <svg class="search__icon">
              <use xlink:href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>`;
  }
  _generatePrevious(curPage) {
    return `<button data-goto="${curPage - 1}" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use xlink:href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage - 1}</span>
          </button>`;
  }
}
export default new PaginationView();
