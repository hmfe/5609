import React from "react";
import styled from "styled-components";
import { isEnterKey } from "../../util";

const StyledListItem = styled.li`
  line-height: 2rem;
  cursor: pointer;
`;

const searchSuggestions = ({
  text,
  tabindex,
  numCharsMatching,
  handleSelect
}) => (
  <StyledListItem
    onClick={handleSelect}
    tabIndex={tabindex}
    onKeyPress={e => isEnterKey(e) && handleSelect(text)}
  >
    <span className="bold">{text.substring(0, numCharsMatching)}</span>
    {text.slice(numCharsMatching)}
  </StyledListItem>
);

export default searchSuggestions;
