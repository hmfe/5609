class SearchView {
  constructor(root) {
    this.input = root.querySelector("#search-input");
    this.suggestions = root.querySelector("#suggestions");
  }

  // TODO: Implement diff checking
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
    li.tabindex = 2 + index;
    li.classList.add("suggestion");
    li.data = suggestion;

    const matchingSubstring = document.createElement("span");
    matchingSubstring.classList.add("bold");
    matchingSubstring.innerText = suggestion.substring(0, matchingLenght);

    li.appendChild(matchingSubstring);
    li.appendChild(document.createTextNode(suggestion.slice(matchingLenght)));
    return li;
  };

  resetSearch = () => (this.input.value = "");
  getQuery = () => this.input.value;
  isSuggestion = node => node.classList.contains("suggestion");
}
