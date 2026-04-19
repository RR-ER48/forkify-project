class SearchView {
  #parentElement = document.querySelector('.search');
  getQuery() {
    const query = this.#parentElement.querySelector('.search__field').value;
    this.#inputClear();
    return query;
  }
  #inputClear() {
    this.#parentElement.querySelector('.search__field').value = '';
  }
  addHandlerSearch(handler) {
    this.#parentElement.addEventListener('click', function (e) {
      e.preventDefault();
      handler();
    });
  }
}
export default new SearchView();
