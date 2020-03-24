class HistoryController {
  constructor(root, model) {
    const view = new HistoryView(root);
    model.on(HISTORY_CHANGED, () => view.updateHistory(model.getHistory()));
    view.on(DELETE_ITEM_CLICKED, id => model.removeHistoryItem(id));
    view.on(DELETE_HISTORY_CLIKED, () => model.removeHistory());
    // In case there is initial history in local storage, view needs to update initially
    if (model.getHistory().length) view.updateHistory(model.getHistory());
  }
}
