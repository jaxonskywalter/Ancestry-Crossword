import Clue from "./clue";
import { useEffect, useState } from "react";
import styles from "@/styles/crossword.module.css";

function ClueList(props) {
  let { verticalClues, horizontalClues, result } = props;
  const [clueList, setClueList] = useState({VERTICAL: verticalClues, HORIZONTAL:horizontalClues});
  useEffect(() => {
    setClueList(makeClueList());
  }, []);
  function makeClueList() {
    for (let i = 0; i < verticalClues.length; i++) {
      verticalClues[i].CLUE = verticalClues[i].WORD;
    }
    for (let i = 0; i < horizontalClues.length; i++) {
      horizontalClues[i].CLUE = horizontalClues[i].WORD;
    }
    let clues = {VERTICAL: verticalClues, HORIZONTAL: horizontalClues}
    return clues;
  }
  clueList.VERTICAL.sort((a, b) => a.CLUE_NUMBER - b.CLUE_NUMBER);
  clueList.HORIZONTAL.sort((a, b) => a.CLUE_NUMBER - b.CLUE_NUMBER); 

  for (let i = 0; i < clueList.VERTICAL.length; i++) {
    let hint = result.find(item => item.answer === clueList.VERTICAL[i].WORD);
    if (hint != null) {
      clueList.VERTICAL[i].CLUE = hint.clue
    }
  }

  for (let i = 0; i < clueList.HORIZONTAL.length; i++) {
    let hint = result.find(item => item.answer === clueList.HORIZONTAL[i].WORD);
    if (hint != null) {
      clueList.HORIZONTAL[i].CLUE = hint.clue
    }
  }

  return (
    <>
      <div>
        <h1 className={styles.h1} >Clues
        </h1>
        <div className={styles.helptip}>
    <p>Answers can be seen by right-clicking the clue. Right-click again to return to the question. If the entered word is correct in the column or row, it will highlight green. For more instructions, select "How To Play", located in the dropdown menu on the right hand side of the web browser. </p>
</div>
        <div className={styles.cluesection}>
        <h2>Down <span>&#8595;</span></h2> 
        {clueList.VERTICAL.map((clues) => {
          return (
            <div key={clues.CLUE_NUMBER}>
              <Clue number={clues.CLUE_NUMBER} word={clues.WORD} clue={clues.CLUE} />
            </div>
          );
        })}
              </div>
              <div className={styles.cluesection}>
        <h2>Across <span>&#8594;</span></h2>
        {clueList.HORIZONTAL.map((clues) => {
          return (
            <div key={clues.CLUE_NUMBER}>
              <Clue number={clues.CLUE_NUMBER} word={clues.WORD} clue={clues.CLUE} />
            </div>
          );
        })}
        </div>

      </div>
    </>
  );
}
export default ClueList;