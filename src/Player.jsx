import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

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

const Player = ({
  name, seed, deletePlayer, started,
}) => (
  <span>
    {name}
    {seed}
    {!started && <Delete data-name={name} onClick={deletePlayer} />}
  </span>
);

Player.propTypes = {
  name: PropTypes.string.isRequired,
  seed: PropTypes.number.isRequired,
  deletePlayer: PropTypes.func.isRequired,
  started: PropTypes.bool.isRequired,
};

export default Player;
