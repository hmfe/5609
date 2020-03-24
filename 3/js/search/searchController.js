class SearchController {
  constructor(root, model) {
    this.root = root;
    this.model = model;
    this.view = new SearchView(root);
    model.on(SEARCH_CHANGED, () =>
      this.view.updateSuggestions(this.model.getSuggestions())
    );
    this.view.on(QUERY_CHANGED, query => model.handleInputChange(query));
    this.view.on(SEARCH_SUBMITTED, query => this.selectResult(query));
  }

  selectResult = result => {
    this.model.selectResult(result);
    this.view.resetSearch();
    this.model.handleInputChange("");
  };
}
