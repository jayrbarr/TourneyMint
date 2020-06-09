import React from 'react';
import styled from 'styled-components';
import Player from './Player.jsx';

const Bracket = styled.div`
  grid-row-start: ${props => props.row};
  grid-column-start: ${props => props.column};
  display: flex;
  width: 100%;
  height: 100%;
  padding: 5px;
  ${({ right }) => right && `
  border-right: 1px solid black;`}
  ${({ empty }) => !empty && `
  border-bottom: 1px solid black;`}
  span {
    align-self: flex-end;
  }
`;

const Stretch = styled.div`
  grid-area: ${props => props.gridArea};
  border-right: 1px solid black;
  `;

const Top = styled.div`
  grid-row-start: ${props => props.row};
  grid-column-start: ${props => props.column};
  border-top: 1px solid black;
  `;

const Grid = styled.div`
  display: grid;
  grid-template: repeat(${props => props.rows}, 30px) / repeat(${props => props.columns ? props.columns + 1: 2}, 120px);
`;

function getBracket(numPlayers, rounds)
{
  var bracketSize = Math.pow(2, rounds);
  var requiredByes = bracketSize - numPlayers;
    
  var matches = [[1,2]];
  
  for(var round = 1; round < rounds; round++) {
    var roundMatches = [];
    var sum = Math.pow(2, round + 1) + 1;
    
    for(var i = 0; i < matches.length; i++) {
      var home = changeIntoBye(matches[i][0], numPlayers);
      var away = changeIntoBye(sum - matches[i][0], numPlayers);
      roundMatches.push([home, away]);
      home = changeIntoBye(sum - matches[i][1], numPlayers);
      away = changeIntoBye(matches[i][1], numPlayers);
      roundMatches.push([home, away]);
    }
    matches = roundMatches;   
    
  }   
  
  return matches.flat();    
}

function changeIntoBye(seed, numPlayers)
{
    return seed <= numPlayers ?  seed : null;
}

const Brackets = ({ size, players, deletePlayer }) => {
  let right = false;
  let brackets = [];
  let numPlayers = players.length;
  var rounds = Math.ceil(Math.log(numPlayers)/Math.log(2));
  let seedings = getBracket(numPlayers, rounds);
  for (let i = 0; i < size*2; i++) {
    const checkSeed = Math.floor(i/2);
    const pushHTML = seedings[checkSeed] && players[seedings[checkSeed]-1] ? <Player name={players[seedings[checkSeed]-1]} seed={seedings[checkSeed]} deletePlayer={deletePlayer}/> : <span><b>BYE</b></span>;
    if (i%2) {
      brackets.push(<Bracket key={i.toString()} right={right} empty={false} row={i+1} column="1">{pushHTML}</Bracket>);
      if (!right) brackets.push(<Bracket key={(i+1).toString()} right={true} empty={true} row={i+2} column="1"></Bracket>)
      right = !right;
    }
  }
  for (let r = 1; r < rounds; r++) {
    if (!(size%(2**r))) {
      const pairings = Math.floor(size/(2**(r+1)));
      for (let j = 0; j < pairings; j++) {
        const start = j*(2**(r+2))+(2+2**r);
        brackets.push(<Stretch key={'grid'+ size*2+j*2+(r-1)*size} gridArea={`${start} / ${r+1} / ${start+(2**(r+1))} / ${r+2}`}/>);
        brackets.push(<Top key={size*2+j*2+(r-1)*size} row={start} column={r+1} />);
        brackets.push(<Top key={size*2+j*2+1+(r-1)*size} row={start+(2**(r+1))} column={r+1} />);
      }
    }
  }
  let final = rounds ? rounds : 1;
  if (size) brackets.push(<Top key={size*(2+rounds)+1} row={2+2**final} column={final+1} />);
  return <Grid rows={size*2} columns={rounds}>{brackets}</Grid>
}

export default Brackets;
