/* eslint-disable react/state-in-constructor */
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
    const { exponent } = this.state;
    if (e.target.classList.contains('player_grid')) {
      let row = parseInt(getComputedStyle(e.target)['grid-row-start'], 10);
      let column = parseInt(getComputedStyle(e.target)['grid-column-start'], 10);
      const player = e.target.innerText;
      const gap = 2 ** (column - 1);
      if (column <= exponent) {
        column += 1;
        if ((row / 2) % 2) {
          row += gap;
        } else {
          row -= gap;
        }
      }
    }
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
          advancePlayer={started ? this.advancePlayer : null}
        />
      </div>
    );
  }
}

export default App;
