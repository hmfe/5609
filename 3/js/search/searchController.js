class SearchController {
  constructor(root, model) {
    this.root = root;
    this.model = model;
    this.view = new SearchView(root);
    model.subscribe(
      whatHappened =>
        whatHappened === SEARCH &&
        this.view.updateSuggestions(this.model.getSuggestions())
    );
    this.addEventListeners();
  }

  // TODO: Add navigation with keys through suggestions
  addEventListeners = () => {
    // Typing in input field
    this.root.addEventListener("input", ({ target }) =>
      model.handleInputChange(target.value)
    );

    // Selecting a suggestion by click
    this.root.addEventListener("click", ({ target }) => {
      if (this.view.isSuggestion(target)) {
        this.selectResult(target.data);
      }
    });

    // Pressing enter in the input field
    this.root.addEventListener("keydown", e => {
      if (e.which === 13 || e.keyCode === 13) {
        this.selectResult(this.view.getQuery());
      }
    });
  };

  // Since manual setting of input value does not trigger "input"-event, we have to trigger the model handler manually.
  selectResult = result => {
    this.model.selectResult(result);
    this.view.resetSearch();
    this.model.handleInputChange("");
  };
}
