import React, { useContext } from "react";
import uuid from "react-uuid";
import styled from "styled-components";
import context from "../../context";

import TextField from "./textField";
import SearchSuggestion from "./searchSuggestion";

const StyledList = styled.ul`
  list-style: none;
  margin: 2px 0 0 0;
  padding: 1rem;
  background-color: #fff;
  max-height: 100px;
  overflow-y: scroll;
  border: 2px solid #d5d5d5;
`;

const Search = () => {
  const { query, updateQuery, suggestions, handleSelect } = useContext(context);
  return (
    <section>
      <TextField
        text={query}
        handleChange={updateQuery}
        handleSelectResult={handleSelect}
      />
      {suggestions.length ? (
        <StyledList>
          {suggestions.map((s, idx) => (
            <SearchSuggestion
              tabindex={idx + 2}
              key={uuid()}
              text={s}
              numCharsMatching={query.length}
              handleSelect={() => handleSelect(s)}
            />
          ))}
        </StyledList>
      ) : null}
    </section>
  );
};

export default Search;
