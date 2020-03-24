import React from "react";
import styled from "styled-components";
import { isEnterKey } from "../../util";

const TextField = styled.input`
  box-sizing: border-box;
  padding: 0.5rem 1rem;
  border: 2px solid #d5d5d5;
  width: 100%;

  &:focus {
    outline: none;
  }
`;

const textField = ({ text, handleChange, handleSelectResult }) => (
  <TextField
    title="Search query"
    autoFocus
    tabIndex={1}
    value={text}
    onChange={e => handleChange(e.target.value)}
    onKeyPress={e => isEnterKey(e) && handleSelectResult(text)}
  />
);

export default textField;
