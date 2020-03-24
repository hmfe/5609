class SearchModel extends EventEmitter {
  constructor(history) {
    super();
    this.history = history;
    this.suggestions = [];
    this.query = "";
    this.fetchSuggestions = generateDebouncedSuggestions(
      this.updateSuggestions
    );
  }

  handleInputChange = query => {
    // If query length is shorter than the older one, we don't need to fetch new suggestions, as the query will still match
    if (query.length > this.query.length) {
      this.fetchSuggestions(query);
    }
    this.query = query;
    this.emit(SEARCH_CHANGED);
  };

  updateSuggestions = suggestions => {
    this.suggestions = suggestions;
    this.emit(SEARCH_CHANGED);
  };

  selectResult = query => {
    this.history = [
      {
        result: query,
        at: new Date().toISOString()
      },
      ...this.history
    ];
    this.emit(HISTORY_CHANGED);
  };

  getSuggestions = () =>
    this.query.length
      ? this.suggestions.filter(s =>
          s.toLowerCase().startsWith(this.query.toLowerCase())
        )
      : [];

  getHistory = () => this.history;

  removeHistoryItem = idx => {
    this.history = [...this.history.filter((_, i) => i !== idx)];
    this.emit(HISTORY_CHANGED);
  };

  removeHistory = () => {
    this.history = [];
    this.emit(HISTORY_CHANGED);
  };
}
