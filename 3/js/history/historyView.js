class HistoryView {
  constructor(root) {
    this.history = root.querySelector("#history-list");
  }

  // TODO: Implement diff checking
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

  isDeleteButton = node => node.classList.contains("remove-history-item");
  isDeleteHistory = node => node.classList.contains("remove-history");
}
