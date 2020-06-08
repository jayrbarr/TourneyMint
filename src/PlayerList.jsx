import React from 'react';

const PlayerList = ({ players }) => {
  const playerList = players.map((player, i) => (
    <h2 key={i.toString()} >{player}</h2>
  ));
  return <div>{playerList}</div>
}

export default PlayerList;
