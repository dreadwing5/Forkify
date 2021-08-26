import View from "./View.js";
import icons from "url:../../img/icons.svg";

class PaginationView extends View {
  _parentElement = document.querySelector(".pagination");

  addHandlerClick(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn--inline");

      if (!btn) return;

      const goToPage = +btn.dataset.goto;

      handler(goToPage);
    });
  }

  _generateMarkup() {
    const currentPage = this._data.page;
    const numPages = Math.round(
      this._data.result.length / this._data.resultsPerPage
    );

    //Page 1 and, there are other pages

    if (currentPage === 1 && numPages > 1) {
      return this._generateMarkupNextButton(currentPage);
    }

    //Last page
    if (currentPage === numPages && numPages > 1) {
      return this._generateMarkupPrevButton(currentPage);
    }
    //Other page
    if (currentPage < numPages) {
      return (
        this._generateMarkupPrevButton(currentPage) +
        this._generateMarkupNextButton(currentPage)
      );
    }
    //Page 1, and there are NO pages
    return "";
  }

  _generateMarkupPrevButton(currentPage) {
    return `
      <button data-goto="${
        currentPage - 1
      }" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${currentPage - 1}</span>
      </button>
      `;
  }

  _generateMarkupNextButton(currentPage) {
    return `
    <button data-goto ="${
      currentPage + 1
    }" class="btn--inline pagination__btn--next">
        <span>Page ${currentPage + 1}</span>
        <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
        </svg>
    </button> 
    `;
  }
}
export default new PaginationView();
