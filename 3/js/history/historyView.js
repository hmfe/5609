class HistoryView extends EventEmitter {
  constructor(root) {
    super();
    this.history = root.querySelector("#history-list");
    root.addEventListener(
      "click",
      e =>
        e.target.classList.contains("remove-history-item") &&
        this.emit(DELETE_ITEM_CLICKED, e.target.parentNode.data)
    );

    root.addEventListener(
      "click",
      e =>
        e.target.classList.contains("remove-history") &&
        this.emit(DELETE_HISTORY_CLIKED)
    );
  }

  updateHistory = history => {
    this.history.innerHTML = "";
    history.forEach((h, idx) =>
      this.history.appendChild(this.getHistoryMarkup(h, idx))
    );
  };

  getHistoryMarkup = ({ result, at }, idx) => {
    const li = document.createElement("li");
    li.classList.add("history-item");
    li.tabindex = 12 + idx;
    li.data = idx;

    const info = document.createElement("span");
    info.classList.add("history-item-info");

    const resultName = document.createElement("p");
    resultName.innerText = result;
    const resultDate = document.createElement("time");
    resultDate.datetime = at;
    resultDate.classList.add("small");
    resultDate.innerText = formatDatetime(new Date(at));

    info.appendChild(resultName);
    info.appendChild(resultDate);

    const removeAction = document.createElement("p");
    removeAction.classList.add("remove-history-item");
    removeAction.innerHTML = "&times;";

    li.appendChild(info);
    li.appendChild(removeAction);

    return li;
  };
}
