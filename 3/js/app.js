const model = new SearchModel();

new SearchController(document.body.querySelector("#search"), model);
new HistoryController(document.body.querySelector("#history"), model);
