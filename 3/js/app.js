let history = [];
if (localStorage.getItem(HISTORY)) {
  history = JSON.parse(localStorage.getItem(HISTORY));
}

const model = new SearchModel(history);

model.on(HISTORY_CHANGED, () =>
  localStorage.setItem(HISTORY, JSON.stringify(model.getHistory()))
);

new SearchController(document.body.querySelector("#search"), model);
new HistoryController(document.body.querySelector("#history"), model);
