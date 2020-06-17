import React from 'react';
import styled from 'styled-components';

const Delete = styled.span`
  background-color: darkgreen;
  color: white;
  padding: 3px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  &::before {
    content: 'X';
    font-size: 10px;
    font-weight: bold;
  }
`;

const Player = ({ name, seed, deletePlayer, started }) => {

return <span>{name}  {seed}  {!started && <Delete data-name={name} onClick={deletePlayer} />}</span>
}

export default Player;
