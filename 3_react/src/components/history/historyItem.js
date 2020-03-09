import React from "react";
import styled from "styled-components";
import { formatDatetime, wasEnterKey } from "../../util";

const StyledListItem = styled.li`
  border-bottom: 2px solid #ececec;
  display: flex;
  border-top: ${props => (props.first ? "2px solid #ececec" : "initial")};
  display: flex;
`;

const InfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex: 1;
  align-items: center;
  padding-right: 1rem;

  time {
    font-size: 0.7rem;
    color: #b1b1b1;
  }
`;

const StyledRemoveButton = styled.p`
  color: #b1b1b1;
  padding-right: 0.2rem;
  cursor: pointer;
`;

const historyItem = ({ text, tabindex, at, first, onRemove }) => {
  return (
    <StyledListItem first={first}>
      <InfoWrapper>
        <p>{text}</p>
        <time dateTime={at}>{formatDatetime(at)}</time>
      </InfoWrapper>
      <StyledRemoveButton
        tabIndex={tabindex}
        onClick={onRemove}
        onKeyPress={e => wasEnterKey(e) && onRemove(text)}
      >
        &times;
      </StyledRemoveButton>
    </StyledListItem>
  );
};

export default historyItem;
