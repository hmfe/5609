import React from "react";
import styled from "styled-components";

const TextField = styled.input`
  box-sizing: border-box;
  padding: 0.5rem 1rem;
  border: 2px solid #d5d5d5;
  width: 100%;

  &:focus {
    outline: none;
  }
`;

const textField = ({ text, handleChange, handleSelectResult }) => {
  const handleKeypress = e => {
    if (e.which === 13 || e.keyCode === 13) handleSelectResult(text);
  };

  return (
    <TextField
      title="Search query"
      autoFocus
      tabIndex={1}
      value={text}
      onChange={e => handleChange(e.target.value)}
      onKeyPress={handleKeypress}
    />
  );
};

export default textField;
