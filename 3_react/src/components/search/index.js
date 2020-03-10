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
              // We add 2 since the text field comes before, and has tabindex 1
              tabindex={2 + idx}
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
