import React from "react";
import { Router } from "@reach/router";
import * as firebase from "firebase/app";
import "firebase/database";
import Home from "./Home";
import Tommy from "./Tommy";
import Tina from "./Tina";

class App extends React.Component {
  state = {
    tommy: false,
    tina: false,
    started: false,
    playerTurn: null,
    previousTurn: null
  };

  playerWin = name => {
    alert(`${name} is the champion!!!`);
    var db = firebase.database().ref();
    db.child("tina").remove();
    db.child("tommy").remove();
  };

  readyUp = name => {
    var db = firebase.database().ref();
    db.child("game")
      .child(`${name}Ready`)
      .set(true);
  };

  passTurn = () => {
    var db = firebase
      .database()
      .ref()
      .child("game");
    db.child("previousTurn").set("pass");
    if (this.state.playerTurn === "Tommy") {
      db.child("playerTurn").set("Tina");
    } else if (this.state.playerTurn === "Tina") {
      db.child("playerTurn").set("Tommy");
    }
  };

  submitTurn = (name, selected) => {
    var db = firebase.database().ref();
    db.child("game")
      .child("previousTurn")
      .set(null);
    let keys = Object.keys(selected);
    for (let i = 0; i < keys.length; i++) {
      db.child(name)
        .child("cards")
        .child(keys[i])
        .remove();
      db.child("game")
        .child("previousTurn")
        .child(keys[i])
        .set(selected[keys[i]]);
    }
    // this.passTurn();
  };

  componentDidMount() {
    var db = firebase.database().ref();
    db.child("game")
      .child("playerTurn")
      .set(null);
    db.child("game")
      .child("tommyReady")
      .set(null);
    db.child("game")
      .child("tinaReady")
      .set(null);
    db.child("game")
      .child("tinaReady")
      .on("value", snapshot => {
        if (snapshot.val() !== null) {
          this.setState({ tina: snapshot.val() });
        }
      });
    db.child("game")
      .child("tommyReady")
      .on("value", snapshot => {
        if (snapshot.val() !== null) {
          this.setState({ tommy: snapshot.val() });
        }
      });
    db.child("game")
      .child("playerTurn")
      .on("value", snapshot => {
        if (snapshot.val() !== null) {
          this.setState({ playerTurn: snapshot.val() });
        }
      });
  }

  componentDidUpdate() {
    if (
      this.state.tina === true &&
      this.state.tommy === true &&
      this.state.started === false
    ) {
      let ranks = [
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "J",
        "Q",
        "K",
        "A",
        "2"
      ];
      let suits = ["Spades", "Clubs", "Diamonds", "Hearts"];
      let deck = [];
      for (let i = 0; i < 52; i++) {
        deck.push({
          rank: ranks[Math.floor(i / 4)],
          suit: suits[i % 4],
          value: i,
          shuffleNum: Math.floor(Math.random() * 1000)
        });
      }
      let sorted = deck.sort((card1, card2) => {
        if (card1.shuffleNum < card2.shuffleNum) {
          return -1;
        }
        if (card1.shuffleNum > card2.shuffleNum) {
          return 1;
        }
        return 0;
      });
      let tommyCards = sorted.slice(0, 13);
      let tinaCards = sorted.slice(13, 26);
      let sortValue = (card1, card2) => {
        if (card1.value < card2.value) {
          return -1;
        }
        if (card1.value > card2.value) {
          return 1;
        }
        return 0;
      };
      tommyCards.sort(sortValue);
      tinaCards.sort(sortValue);
      let playerTurn = Math.round(Math.random()) === 1 ? "Tommy" : "Tina";
      var db = firebase.database().ref();
      let tommyCardsObj = {};
      let tinaCardsObj = {};
      for (let i = 0; i < 13; i++) {
        tommyCardsObj[tommyCards[i].value] = tommyCards[i];
        tinaCardsObj[tinaCards[i].value] = tinaCards[i];
      }
      db.child("game").set({ playerTurn, previousTurn: "pass" });
      db.child("tommy").set({ cards: tommyCardsObj });
      db.child("tina").set({ cards: tinaCardsObj });
      this.setState({
        playerTurn,
        started: true
      });
    }
  }

  render() {
    return (
      <div>
        <Router>
          <Home path="/" />
          <Tommy
            path="/tommy"
            readyUp={this.readyUp}
            playerTurn={this.state.playerTurn}
            passTurn={this.passTurn}
            submitTurn={this.submitTurn}
            started={this.state.started}
            playerWin={this.playerWin}
          />
          <Tina
            path="/tina"
            readyUp={this.readyUp}
            playerTurn={this.state.playerTurn}
            passTurn={this.passTurn}
            submitTurn={this.submitTurn}
            started={this.state.started}
            playerWin={this.playerWin}
          />
        </Router>
      </div>
    );
  }
}

export default App;
