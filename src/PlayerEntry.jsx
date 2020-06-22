import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Label = styled.label`
  margin: 5px;
  span {
    font-weight: bold;
  }
`;

const Button = styled.button`
background-color: darkgreen;
border-radius: 28px;
border: 1px solid #18ab29;
display: inline-block;
color: white;
padding: 3px 8px;
text-decoration: none;
&:hover {
background-color: forestgreen;
}
&:focus {
  outline: 0;
}
`;

const PlayerEntry = ({ handleSubmit, newPlayer, handleNameChange }) => (
  <form onSubmit={handleSubmit}>
    <Label>
      <span>Player/Team  </span>
      <input type="text" placeholder="Enter new player or team" value={newPlayer} onChange={handleNameChange} />
    </Label>
    <Button type="submit" value="Enter">Enter</Button>
  </form>
);

PlayerEntry.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  newPlayer: PropTypes.string.isRequired,
  handleNameChange: PropTypes.func.isRequired,
};

export default PlayerEntry;
