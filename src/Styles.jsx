import React from 'react';
import styled from 'styled-components';

export const FirstRow = styled.div`
  div:nth-child(2n) {
    border-right: 1px solid black;
  }
`;
export const Bracket = styled.div`
  display: flex;
  width: 100px;
  height: 60px;
  padding: 5px;
  border-bottom: 1px solid black;
  span {
    align-self: flex-end;
  }
`;
