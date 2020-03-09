import React from "react";
import styled from "styled-components";

const StyledListItem = styled.li`
  line-height: 2rem;
  cursor: pointer;
`;

const searchSuggestions = ({
  text,
  tabindex,
  numCharsMatching,
  handleSelect
}) => {
  const handleKeypress = e => {
    if (e.which === 13 || e.keyCode === 13) handleSelect(text);
  };

  return (
    <StyledListItem
      onClick={handleSelect}
      tabIndex={tabindex}
      onKeyPress={handleKeypress}
    >
      <span className="bold">{text.substring(0, numCharsMatching)}</span>
      {text.slice(numCharsMatching)}
    </StyledListItem>
  );
};

export default searchSuggestions;
