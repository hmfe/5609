import React, { useContext } from "react";
import styled from "styled-components";
import context from "../../context";

import HistoryItem from "./historyItem";

const Wrapper = styled.section`
  padding: 1rem;
`;

const StyledList = styled.ul`
  list-style: none;
`;

const Upper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ClickableText = styled.p`
  cursor: pointer;
  text-decoration: underline;
  font-size: 0.7rem;
`;

const History = () => {
  const { history, removeHistory, removeHistoryItem } = useContext(context);
  return (
    <Wrapper>
      <Upper>
        <h2>Search history</h2>
        <ClickableText onClick={removeHistory}>
          Clear search history
        </ClickableText>
      </Upper>
      <StyledList>
        {history.length
          ? history.map(({ result, at, id }, idx) => (
              <HistoryItem
                key={id}
                text={result}
                at={at}
                first={idx === 0}
                tabindex={12 + idx}
                onRemove={() => removeHistoryItem(id)}
              />
            ))
          : null}
      </StyledList>
    </Wrapper>
  );
};

export default History;
