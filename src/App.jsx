import React, { Component} from "react";
import PlayerEntry from "./PlayerEntry.jsx";
import Brackets from "./Brackets.jsx";
import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  html {
    background-color: mintcream;
    color: forestgreen;
  }
`

const Title = styled.h1`
  color: darkgreen;
`;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      players: [],
      new: '',
      exponent: null,
    }
  }

  handleNameChange(e) {
    this.setState({
      new: e.target.value,
    })
  }

  getExponent(size) {
    let exponent = 1;
    while (size > (2**exponent)) {
      exponent++;
    }
    return exponent;
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.new.length > 0) {
      const newPlayers = this.state.players;
      newPlayers.push(this.state.new);
      const newExponent = this.getExponent(newPlayers.length);
      this.setState({
        players: newPlayers,
        exponent: newExponent,
        new: '',
      })
    }
  }

  deletePlayer(name, e) {
    const player = e.target.dataset.name;
    console.log(player);
    const index = this.state.players.indexOf(player);
    const players = this.state.players.slice(0, index).concat(this.state.players.slice(index+1));
    const exponent = this.getExponent(players.length);
    this.setState({
      players,
      exponent,
    })
  }

  render(){
    return(
      <div>
        <GlobalStyle />
        <Title>Tourney Mint</Title>
        <PlayerEntry handleNameChange={(e)=>{this.handleNameChange(e)}} handleSubmit={(e)=>{this.handleSubmit(e)}} new={this.state.new} />
        <Brackets players={this.state.players} size={this.state.exponent === null ? 0 : 2**this.state.exponent} deletePlayer={(e) => {this.deletePlayer(name, e)}} />
      </div>
    );
  }
}

export default App;
