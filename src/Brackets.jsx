import React from 'react';
import { Bracket } from './Styles.jsx';

function getBracket(participantsCount)
{
  var rounds = Math.ceil(Math.log(participantsCount)/Math.log(2));
  var bracketSize = Math.pow(2, rounds);
  var requiredByes = bracketSize - participantsCount;
    
  if(participantsCount < 2) {
    return [];
  }
    
  var matches = [[1,2]];
  
  for(var round = 1; round < rounds; round++) {
    var roundMatches = [];
    var sum = Math.pow(2, round + 1) + 1;
    
    for(var i = 0; i < matches.length; i++) {
      var home = changeIntoBye(matches[i][0], participantsCount);
      var away = changeIntoBye(sum - matches[i][0], participantsCount);
      roundMatches.push([home, away]);
      home = changeIntoBye(sum - matches[i][1], participantsCount);
      away = changeIntoBye(matches[i][1], participantsCount);
      roundMatches.push([home, away]);
    }
    matches = roundMatches;   
    
  }   
  
  return matches.flat();    
}

function changeIntoBye(seed, participantsCount)
{
    return seed <= participantsCount ?  seed : null;
}

const Brackets = ({ size, players }) => {
  let brackets = [];
  let seedings = getBracket(players.length);
  for (let i = 0; i < size; i++) {
    const pushHTML = seedings[i] && players[seedings[i]-1] ? players[seedings[i]-1] : 'Bye';
    brackets.push(<Bracket key={i.toString()} >{pushHTML}</Bracket>);

  }
  return <div>{brackets}</div>
}

export default Brackets;
