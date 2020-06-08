import React, { Component} from "react";
import PlayerEntry from "./PlayerEntry.jsx";
import PlayerList from "./PlayerList.jsx";
import Brackets from "./Brackets.jsx";

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

  handleSubmit(e) {
    e.preventDefault();
    const newPlayers = this.state.players;
    newPlayers.push(this.state.new);
    const size = newPlayers.length;
    const bracketSize = this.state.exponent === null ? 0 : 2**this.state.exponent;
    const newExponent = size > bracketSize ? this.state.exponent + 1 : this.state.exponent;
    this.setState({
      players: newPlayers,
      exponent: newExponent,
      new: '',
    })
  }

  render(){
    return(
      <div>
        <PlayerEntry handleNameChange={(e)=>{this.handleNameChange(e)}} handleSubmit={(e)=>{this.handleSubmit(e)}} new={this.state.new} />
        <Brackets players={this.state.players} size={this.state.exponent === null ? 0 : 2**this.state.exponent}/>
      </div>
    );
  }
}

export default App;
