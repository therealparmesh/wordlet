import BoardRow from './BoardRow';
import {
  getGuessCorrectness,
  isDefeat,
  isIndexActive,
  isVictory,
} from './selectors';

function Board({
  answer,
  currentGuess,
  guessed,
}: {
  answer: string;
  currentGuess: string;
  guessed: string[];
}) {
  return (
    <div class="board">
      <div class="board-grid">
        {Array.from({ length: 6 }).map((_, index) => {
          const guess = isIndexActive(index, guessed)
            ? currentGuess
            : guessed[index] ?? '';

          return (
            <BoardRow
              key={index}
              guess={guess}
              disabled={
                !isIndexActive(index, guessed) ||
                isDefeat(guessed, answer) ||
                isVictory(guessed, answer)
              }
              {...getGuessCorrectness(guess, answer)}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Board;
