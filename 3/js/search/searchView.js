class SearchView extends EventEmitter {
  constructor(root) {
    super();
    this.input = root.querySelector("#search-input");
    this.suggestions = root.querySelector("#suggestions");
    this.root = root;

    this.input.addEventListener("input", () =>
      this.emit(QUERY_CHANGED, this.input.value)
    );
    root.addEventListener(
      "click",
      e =>
        e.target.classList.contains("suggestion") &&
        this.emit(SEARCH_SUBMITTED, e.target.data)
    );
    root.addEventListener(
      "keydown",
      e =>
        (e.which === 13 || e.keyCode === 13) &&
        this.emit(SEARCH_SUBMITTED, this.input.value)
    );
    root.addEventListener("keydown", e => {
      // Down arrow pressed
      if (e.which === 40 || e.keyCode === 40) {
        this.focusSuggestion(e.target.tabIndex + 1);
      }
      // Up arrow pressed
      else if (e.which === 38 || e.keyCode === 38) {
        this.focusSuggestion(e.target.tabIndex - 1);
      }
    });
  }

  updateSuggestions = suggestions => {
    this.suggestions.innerHTML = "";
    if (!suggestions.length) this.suggestions.classList.add("hidden");
    else this.suggestions.classList.remove("hidden");
    suggestions.forEach((s, idx) =>
      this.suggestions.appendChild(
        this.getSuggestionMarkup(s, this.input.value.length, idx)
      )
    );
  };

  getSuggestionMarkup = (suggestion, matchingLenght, index) => {
    const li = document.createElement("li");
    li.tabIndex = 2 + index;
    li.classList.add("suggestion");
    li.data = suggestion;

    const matchingSubstring = document.createElement("span");
    matchingSubstring.classList.add("bold");
    matchingSubstring.innerText = suggestion.substring(0, matchingLenght);

    li.appendChild(matchingSubstring);
    li.appendChild(document.createTextNode(suggestion.slice(matchingLenght)));
    return li;
  };

  resetSearch = () => {
    this.input.value = "";
    this.input.focus();
  };

  focusSuggestion = index => {
    if (index < 1 || index > this.suggestions.childNodes.length + 1) return;
    else if (index === 1) this.input.focus();
    else this.suggestions.childNodes[index - 2].focus();

    // Special case, we need to correct for the additional scroll that is added
    // on navigation to the first suggestion.
    if (index === 2) {
      this.suggestions.childNodes[index - 2].scrollIntoView();
    }
  };
}
