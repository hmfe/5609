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
      const isArrowUp = e.which === 40 || e.keyCode === 40;
      const isArrowDown = e.which === 38 || e.keyCode === 38;
      if (isArrowUp || isArrowDown) {
        // Prevent the default scrolling, so to not scroll away from the new target
        e.preventDefault();
        let newTargetTabIndex = e.target.tabIndex;
        if (isArrowUp) newTargetTabIndex++;
        else newTargetTabIndex--;
        this.focusSuggestion(newTargetTabIndex);
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

  focusSuggestion = newIndex => {
    if (newIndex < 1 || newIndex > this.suggestions.childNodes.length + 1)
      return;
    // Special case, if we navigate up to search bar
    else if (newIndex === 1) this.input.focus();
    else this.suggestions.childNodes[newIndex - 2].focus();
  };
}
