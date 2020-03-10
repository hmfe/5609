class HistoryController {
  constructor(root, model) {
    this.root = root;
    this.model = model;
    this.view = new HistoryView(root);
    this.model.subscribe(
      whatHappened =>
        whatHappened === HISTORY && this.view.updateHistory(model.getHistory())
    );
    // In case there is initial history in local storage, view needs to update initially
    if (model.getHistory().length) this.view.updateHistory(model.getHistory());
    this.addEventListeners();
  }

  addEventListeners = () => {
    // Clicking remove on history item
    this.root.addEventListener("click", e => {
      this.view.isDeleteButton(e.target) &&
        this.model.removeHistoryItem(e.target.parentNode.data);
    });

    // Cliking remove entire history
    this.root.addEventListener("click", e => {
      this.view.isDeleteHistory(e.target) && this.model.removeHistory();
    });
  };
}
