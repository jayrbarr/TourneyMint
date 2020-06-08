import React from 'react';

const PlayerEntry = (props) => (
  <form onSubmit={props.handleSubmit}>
  <label>
    Name:
    <input type="text" placeholder='Enter new player or team' value={props.new} onChange={props.handleNameChange} />
  </label>
  <button type="submit" value="Enter" />
</form>
)

export default PlayerEntry;
