import React from 'react';
import styled from 'styled-components';

const Delete = styled.span`
  background-color: red;
  color: white;
  &::before {
    content: 'X';
    font-size: 12px;
  }
`;

const Player = ({ name, seed, deletePlayer }) => {

  return <span>{name}  {seed}  <Delete data-name={name} onClick={deletePlayer} /></span>
}

export default Player;
