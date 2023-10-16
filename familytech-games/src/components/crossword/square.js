import React, { useState, useEffect } from "react";
import styles from "@/styles/crossword.module.css";

function Square(props) {
  let {
    character,
    key_character,
    handleSquareInput,
    handleKeyDown,
    row,
    col,
    clueNumber,
    dimensions,
    inputLocation,
  } = props;

  const [isCorrect, setIsCorrect] = useState(false);

  const handleChange = (event) => {
    const input = event.target.value;
    handleSquareInput(input, row, col, inputLocation);
    setIsCorrect(input.toLowerCase() === key_character.toLowerCase());
  };

  function handleDownKey(event) {
    handleKeyDown(event, row, col, inputLocation);
  }

  useEffect(() => {
    setIsCorrect(character.toLowerCase() === key_character.toLowerCase());
  }, [character, key_character]);

  const squareStyle = {
    backgroundColor: isCorrect ? "green" : "white",
    borderColor: isCorrect ? "green" : "black",
  };

  return (
    <>
      <div className={styles.div}>
        {clueNumber != 0 ? <p className={styles.number}>{clueNumber}</p> : null}
        <input
          ref={(element) =>
            (inputLocation.current[row * dimensions + col] = element)
          }
          className={styles.square}
          readOnly={key_character === "*" || key_character === "&"}
          style={{
            ...squareStyle,
            ...(key_character === "*" || key_character === "&"
              ? { backgroundColor: "black", borderColor: "black" }
              : {}),
          }}
          maxLength={1}
          type="text"
          onChange={handleChange}
          onKeyDown={handleDownKey}
          disabled={key_character === "*" || key_character === "&"}
        ></input>
      </div>
    </>
  );
}

export default Square;
