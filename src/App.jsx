import React, { Component } from 'react';
import styled, { createGlobalStyle } from 'styled-components';

import PlayerEntry from './PlayerEntry';
import Brackets from './Brackets';
import Start from './Start';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  html {
    background-color: mintcream;
    color: forestgreen;
    font-family: Arial, Helvetica, sans-serif;
  }
`;

const Title = styled.h1`
  color: darkgreen;
`;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      players: [],
      newPlayer: '',
      exponent: null,
      started: false,
    };
  }

  handleNameChange(e) {
    this.setState({
      newPlayer: e.target.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const getExponent = (size) => {
      let exponent = 1;
      while (size > (2 ** exponent)) {
        exponent += 1;
      }
      return exponent;
    };
    const { newPlayer } = this.state;
    if (newPlayer.length > 0) {
      const { players } = this.state;
      players.push(newPlayer);
      const newExponent = getExponent(players.length);
      this.setState({
        players,
        exponent: newExponent,
        newPlayer: '',
      });
    }
  }

  deletePlayer(e) {
    const player = e.target.dataset.name;
    const { players } = this.state;
    const index = players.indexOf(player);
    const playersList = players.slice(0, index).concat(players.slice(index + 1));
    const exponent = this.getExponent(playersList.length);
    this.setState({
      players: playersList,
      exponent,
    });
  }

  startTourney() {
    this.setState({
      started: true,
    });
  }

  render() {
    const {
      started, players, exponent, newPlayer,
    } = this.state;
    return (
      <div>
        <GlobalStyle />
        <Title>Tourney Mint</Title>
        {!started && (
        <>
          <Start startTourney={(e) => { this.startTourney(e); }} />
          <PlayerEntry
            handleNameChange={(e) => { this.handleNameChange(e); }}
            handleSubmit={(e) => { this.handleSubmit(e); }}
            newPlayer={newPlayer}
          />
        </>
        )}
        <Brackets
          players={players}
          size={exponent === null ? 0 : 2 ** exponent}
          started={started}
          deletePlayer={(e) => { this.deletePlayer(e); }}
        />
      </div>
    );
  }
}

export default App;
