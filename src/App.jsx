import "./App.css";
import Die from "./components/Die";
import Heading from "./components/Heading";
import Sidebar from "./components/Sidebar";
import { useEffect, useRef, useState } from "react";
import { nanoid } from "nanoid";

function App() {
  const [dicesNum, setDicesNum] = useState(10);
  const [dice, setDice] = useState(allNewDice);
  const [tenzies, setTenzies] = useState(false);
  const [rolls, setRolls] = useState(0);
  const [bestScore, setBestScore] = useState(100);

  function createNewDice() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }

  // generate an array with full of new dices
  function allNewDice() {
    let dicesArray = new Array(dicesNum);

    for (let i = 0; i < dicesNum; i++) {
      dicesArray[i] = createNewDice();
    }
    return dicesArray;
  }

  function reset() {
    const allClear = dice.some((e) => e.isHeld);
    if (allClear || tenzies) {
      setRolls(0);
      setDice(allNewDice);
      setTenzies(false);
      return;
    }
  }
  // refresh all boxes with isHeld === false
  function reroll() {
    if (tenzies) {
      reset();
      return;
    }
    const newArr = dice.map((dice) => {
      return dice.isHeld ? dice : createNewDice();
    });
    setDice(newArr);
    setRolls((prevRoll) => prevRoll + 1);
  }

  // map space key to trigger the main button
  const buttonRef = useRef(null);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.code === "Space") {
        buttonRef.current.click();
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  // change isHeld state when user clicks on a box
  function toggleHold(id) {
    const newArr = dice.map((dice) => {
      return dice.id === id ? { ...dice, isHeld: !dice.isHeld } : dice;
    });
    setDice(newArr);
  }

  // map over dice state and make elements
  const diceElements = dice.map((dice) => {
    return (
      <Die
        key={nanoid()}
        value={dice.value}
        toggleHold={() => toggleHold(dice.id)}
        isHeld={dice.isHeld}
      />
    );
  });

  // track every change in dices to check for win
  useEffect(() => {
    // take the first dice number and check if all has the same num
    const firstNum = dice[0].value;
    const allHeld = dice.every((e) => e.isHeld);
    const allSameNum = dice.every((e) => e.value === firstNum);

    if (allHeld && allSameNum) {
      setTenzies(true);
      if (rolls < bestScore) {
        setBestScore(rolls);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dice]);

  function changeDiceNum(e) {
    setDicesNum(e);
  }
  // when the number of dices change refresh the game
  useEffect(() => {
    setDice(allNewDice);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dicesNum]);

  return (
    <main>
      <p className="bestScore">
        Best Score: <span>{bestScore}</span>
      </p>
      {!tenzies && <Sidebar changeDiceNum={changeDiceNum} currNum={dicesNum} />}
      <div className="game">
        {tenzies ? (
          <div className="endGame">
            <h3>Good Job!</h3>
            <p>
              You finished with <span className="rolls">{rolls}</span> rolls
            </p>
          </div>
        ) : (
          <>
            <Heading count={dicesNum} />
            <div className="diceHolder">{diceElements}</div>
          </>
        )}
        {!tenzies && (
          <p className="hint">
            Press <span>SPACE</span> or
          </p>
        )}
        <div className="mainButtons">
          {!tenzies && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="resetButton"
              onClick={reset}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
              />
            </svg>
          )}
          <button ref={buttonRef} className="rollButton" onClick={reroll}>
            {tenzies ? "Play Again" : "Roll"}
          </button>
        </div>
      </div>
    </main>
  );
}

export default App;
