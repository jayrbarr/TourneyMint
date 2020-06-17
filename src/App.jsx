import React, { Component} from "react";
import PlayerEntry from "./PlayerEntry.jsx";
import Brackets from "./Brackets.jsx";
import styled, { createGlobalStyle } from 'styled-components';
import Start from "./Start.jsx";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  html {
    background-color: mintcream;
    color: forestgreen;
    font-family: Arial, Helvetica, sans-serif;
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
      started: false,
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

  deletePlayer(e) {
    const player = e.target.dataset.name;
    const index = this.state.players.indexOf(player);
    const players = this.state.players.slice(0, index).concat(this.state.players.slice(index+1));
    const exponent = this.getExponent(players.length);
    this.setState({
      players,
      exponent,
    })
  }

  startTourney(e) {
    this.setState({
      started: true,
    })
  }

  render(){
    return(
      <div>
        <GlobalStyle />
        <Title>Tourney Mint</Title>
        {!this.state.started && <><Start startTourney={(e)=>{this.startTourney(e)}} /><PlayerEntry handleNameChange={(e)=>{this.handleNameChange(e)}} handleSubmit={(e)=>{this.handleSubmit(e)}} new={this.state.new} /></>}
        <Brackets players={this.state.players} size={this.state.exponent === null ? 0 : 2**this.state.exponent} started={this.state.started} deletePlayer={(e) => {this.deletePlayer(e)}} />
      </div>
    );
  }
}

export default App;
