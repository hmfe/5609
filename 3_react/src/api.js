const BASE_URL = `http://api.geonames.org/searchJSON?maxRows=10&username=weknowit&isNameRequired=true&type=json&country=SE&orderby=relevance&featureCode=ADM1&featureCode=ADM2&featureCode=ADM3&featureCode=ADM4&featureCode=PPL&name_startsWith=`;

const debounce = (func, wait) => {
  let timeout;
  return function() {
    const context = this;
    const args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      timeout = null;
      func.apply(context, args);
    }, wait);
  };
};

export const generateDebouncedSuggestions = cb =>
  debounce(
    input =>
      fetch(BASE_URL + input)
        .then(res => res.json())
        .then(data => cb(data.geonames.map(el => el.toponymName)))
        .catch(err => console.error(err)),
    700
  );
