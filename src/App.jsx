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
  state = {
    players: [],
    newPlayer: '',
    exponent: null,
    started: false,
  }

  handleNameChange = (e) => {
    this.setState({
      newPlayer: e.target.value,
    });
  }

  handleSubmit = (e) => {
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

  deletePlayer = (e) => {
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

  startTourney = () => {
    this.setState({
      started: true,
    });
  }

  advancePlayer = (e) => {
    e.persist();
    console.dir(e.target.classList);
    if(e.target.classList.contains('player_grid')) {
      let row = parseInt(getComputedStyle(e.target)['grid-row-start'], 10);
      let column = parseInt(getComputedStyle(e.target)['grid-column-start'], 10);
      const player = e.target.innerText;
      const gap = 2**(column-1);
      if (column++ <= this.state.exponent) {
        if ((row/2)%2) {
          row += gap;
        } else {
          row -= gap
        }
        console.log(row, column, player);
      }
    }
  }

  render() {
    const {
      started, players, exponent, newPlayer,
    } = this.state;
    const startFunctions = started ? { advancePlayer: this.advancePlayer } : null;
    return (
      <div>
        <GlobalStyle />
        <Title>Tourney Mint</Title>
        {!started && (
          <>
            <Start startTourney={this.startTourney} />
            <PlayerEntry
              handleNameChange={this.handleNameChange}
              handleSubmit={this.handleSubmit}
              newPlayer={newPlayer}
            />
          </>
        )}
        <Brackets
          players={players}
          size={exponent === null ? 0 : 2 ** exponent}
          started={started}
          deletePlayer={this.deletePlayer}
          {...startFunctions}
        />
      </div>
    );
  }
}

export default App;
