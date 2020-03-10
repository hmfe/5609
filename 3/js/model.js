class SearchModel {
  constructor() {
    this.observers = [];
    this.history = [];
    this.suggestions = [];
    this.query = "";
    this.fetchSuggestions = generateDebouncedSuggestions(
      this.updateSuggestions
    );
  }

  subscribe = cb => this.observers.push(cb);
  notifyObservers = whatHappened =>
    this.observers.forEach(cb => cb(whatHappened));

  handleInputChange = query => {
    // If query length is shorter than the older one, we don't need to fetch new suggestions, as the query will still match
    if (query.length > this.query.length) {
      this.fetchSuggestions(query);
    }
    this.query = query;
    this.notifyObservers(SEARCH);
  };

  updateSuggestions = suggestions => {
    this.suggestions = suggestions;
    this.notifyObservers(SEARCH);
  };

  selectResult = query => {
    this.history = [
      {
        result: query,
        at: new Date().toISOString()
      },
      ...this.history
    ];
    this.notifyObservers(HISTORY);
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
    this.notifyObservers(HISTORY);
  };

  removeHistory = () => {
    this.history = [];
    this.notifyObservers(HISTORY);
  };
}
