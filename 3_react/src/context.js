import React, { createContext, useReducer, useState, useRef } from "react";
import uuid from "react-uuid";
import { generateDebouncedSuggestions } from "./api";

const ADD_HISTORY_ITEM = "ADD_HISTORY_ITEM";
const REMOVE_HISTORY_ITEM = "REMOVE_HISTORY_ITEM";
const REMOVE_HISTORY = "REMOVE_HISTORY";

const historyReducer = (state, action) => {
  switch (action.type) {
    case ADD_HISTORY_ITEM:
      return [
        { result: action.payload, at: new Date().toISOString(), id: uuid() },
        ...state
      ];
    case REMOVE_HISTORY_ITEM:
      return state.filter(({ id }) => id !== action.payload);
    case REMOVE_HISTORY:
      return [];
    default:
      return state;
  }
};

const Context = createContext();

const ContextProvider = ({ children }) => {
  const [history, dispatch] = useReducer(historyReducer, []);
  const [query, setQuery] = useState("");
  // To preserve data, we differentiate the fetched suggestions from the filtered ones, so that even if a user mistypes, they can still go back and the result will not have been forgotten through filtering.
  const [fetchedSuggestions, setFetchedSuggestions] = useState([]);
  // We use ref to create a variable that survives rerenders. This prevents data-leaks through multiple subscriptions
  const doSearch = useRef(generateDebouncedSuggestions(setFetchedSuggestions));

  // *** History functionality ***
  const addHistoryItem = result =>
    dispatch({ type: ADD_HISTORY_ITEM, payload: result });

  const removeHistoryItem = id =>
    dispatch({ type: REMOVE_HISTORY_ITEM, payload: id });

  const removeHistory = () => dispatch({ type: REMOVE_HISTORY });

  // *** Query functionality ***
  const updateQuery = newQuery => {
    if (newQuery.length > query.length) {
      doSearch.current(newQuery);
    }
    setQuery(newQuery);
  };

  const resetQuery = () => updateQuery("");

  const handleSelect = query => {
    addHistoryItem(query);
    resetQuery();
  };

  return (
    <Context.Provider
      value={{
        history,
        query,
        handleSelect,
        removeHistoryItem,
        removeHistory,
        updateQuery,
        resetQuery,
        suggestions: query.length
          ? fetchedSuggestions.filter(s =>
              s.toLowerCase().startsWith(query.toLowerCase())
            )
          : []
      }}
    >
      {children}
    </Context.Provider>
  );
};

export { ContextProvider };
export default Context;
