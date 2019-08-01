import React from "react";
import * as firebase from "firebase/app";
import "firebase/database";
import { valid } from "./Valid";

class Tina extends React.Component {
  state = {
    hand: [],
    opponentHand: [null],
    previousTurn: "pass",
    playerTurn: null,
    selected: {}
  };

  componentDidMount() {
    var db = firebase.database().ref();
    if (this.state.hand.length !== 0) {
      this.setState({ hand: [] });
    }
    db.child("game")
      .child("previousTurn")
      .on("value", snapshot => {
        if (snapshot.val() !== null) {
          this.setState({ previousTurn: snapshot.val() });
        }
      });
    db.child("game")
      .child("playerTurn")
      .on("value", snapshot => {
        if (snapshot.val() !== null) {
          this.setState({ playerTurn: snapshot.val() });
        }
      });
    db.child("tina")
      .child("cards")
      .on("value", snapshot => {
        if (snapshot.val() !== null) {
          this.setState({ hand: snapshot.val() });
        } else {
          this.setState({ hand: ["win"] });
        }
      });
    db.child("tommy")
      .child("cards")
      .on("value", snapshot => {
        if (snapshot.val() !== null) {
          this.setState({ opponentHand: snapshot.val() });
        } else {
          this.setState({ opponentHand: ["win"] });
        }
      });
  }

  componentDidUpdate() {
    if (this.state.hand[0] === "win") {
      this.props.playerWin("Tina");
    } else if (this.state.opponentHand.length === 0) {
      this.props.playerWin("Tommy");
    }
  }

  selectCard(card) {
    if (this.state.selected[card.value] === undefined) {
      this.setState(state => {
        state.selected[card.value] = card;
        return state;
      });
    } else {
      this.setState(state => {
        let newSelected = state.selected;
        delete newSelected[card.value];
        return (state.selected = newSelected);
      });
    }
  }

  makeArray(obj) {
    let keys = Object.keys(obj);
    let arr = [];
    for (let i = 0; i < keys.length; i++) {
      arr.push(obj[keys[i]]);
    }
    return arr;
  }

  render() {
    const { readyUp, passTurn, submitTurn, started } = this.props;
    const {
      hand,
      opponentHand,
      previousTurn,
      selected,
      playerTurn
    } = this.state;
    return (
      <div>
        <button onClick={() => readyUp("tina")}>Tina - Ready</button>
        {playerTurn === "Tina" ? (
          <div>
            <button
              onClick={() => {
                if (this.makeArray(selected).length !== 0) {
                  if (valid(selected, previousTurn)) {
                    submitTurn("tina", selected);
                    this.setState({ selected: {} });
                  } else {
                    alert("Invalid cards");
                  }
                }
              }}
            >
              Submit
            </button>
            <button onClick={passTurn}>Pass</button>
          </div>
        ) : playerTurn === "Tommy" ? (
          ""
        ) : (
          ""
        )}
        {started ? (
          <div>
            <h2>
              <div>
                {playerTurn}'s turn, Tommy's Cards:{" "}
                {this.makeArray(opponentHand).length}
              </div>
              <br />
              {previousTurn === "pass" ? (
                <div>Passed</div>
              ) : (
                <div>
                  Last turn:
                  {this.makeArray(previousTurn).map(card => {
                    return (
                      <button key={card.value}>{`${card.rank} of ${
                        card.suit
                      }`}</button>
                    );
                  })}
                </div>
              )}
              <br />
              {Object.keys(selected).length === 0 ? (
                <div>Selected</div>
              ) : (
                <div>
                  Selected:
                  {this.makeArray(selected).map(card => {
                    return (
                      <button key={card.value}>{`${card.rank} of ${
                        card.suit
                      }`}</button>
                    );
                  })}
                </div>
              )}
            </h2>
            <div>
              {this.makeArray(hand).map(card => {
                return (
                  <button
                    key={card.value}
                    onClick={() => {
                      this.selectCard(card);
                    }}
                  >{`${card.rank} of ${card.suit}`}</button>
                );
              })}
            </div>
          </div>
        ) : (
          <div>Please ready up by clicking your name</div>
        )}
      </div>
    );
  }
}

export default Tina;
