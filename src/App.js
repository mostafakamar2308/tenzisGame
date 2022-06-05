import React, { useEffect } from "react";
import "./App.css";

function Cube(props) {
  return (
    <div
      className={`cube ${props.class ? "freeze" : ""}`}
      onClick={props.handleClick}
      id={props.id}
    >
      {props.number}
    </div>
  );
}

function Game() {
  const [won, setWon] = React.useState(false);
  const [gameCubesState, setGameCubesState] = React.useState(
    [...Array(10)].map((ele) => {
      return { freeze: false, number: Math.floor(Math.random() * 10 + 1) };
    })
  );
  useEffect(() => {
    let gameSet = new Set(gameCubesState.map((ele) => ele.number));
    gameSet.size === 1 ? setWon(true) : setWon(false);
  }, [gameCubesState]);

  if (won === true) {
    return (
      <div>
        <div className="Winning">You Win </div>
        <button
          onClick={() => {
            setWon(false);
            setGameCubesState(
              [...Array(10)].map((ele) => {
                return {
                  freeze: false,
                  number: Math.floor(Math.random() * 10 + 1),
                };
              })
            );
          }}
          className="replay"
        >
          {" "}
          Wanna Replay?
        </button>
      </div>
    );
  }

  function freezeCube(e) {
    let targetCubeIndex = e.target.id;
    setGameCubesState((oldGameCubesState) => {
      return oldGameCubesState.map((ele, index) => {
        return Number(targetCubeIndex) === index
          ? { ...ele, freeze: !ele.freeze }
          : { ...ele };
      });
    });
  }

  function rollCubes() {
    setGameCubesState((oldGameCubesState) => {
      let newMap = oldGameCubesState.map((ele) =>
        ele.freeze
          ? { ...ele }
          : { ...ele, number: Math.floor(Math.random() * 10 + 1) }
      );
      return newMap;
    });
  }

  return (
    <div id="game">
      <div className="details">
        <h1>Tenzis</h1>
        <p>
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
      </div>
      <div className="game-container">
        {gameCubesState.map((ele, index) => (
          <Cube
            number={ele.number}
            id={index}
            key={`cube-${index}`}
            class={ele.freeze}
            handleClick={freezeCube}
          ></Cube>
        ))}
      </div>
      <button className="roll" onClick={rollCubes}>
        Roll
      </button>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <Game />
    </div>
  );
}

export default App;
