import Header from './Header';
import Board from './Board';
import Keyboard from './Keyboard';
import { useKeyboardEvents } from './events';
import { getGuessedCorrectness, isDefeat, isVictory } from './selectors';
import { useGameState } from './state';

function App() {
  const {
    answer,
    currentGuess,
    guessed,
    sendUpdate: onUpdate,
    sendDelete: onDelete,
    sendEnter: onEnter,
  } = useGameState();

  useKeyboardEvents({
    disabled: isDefeat(guessed, answer) || isVictory(guessed, answer),
    onUpdate,
    onDelete,
    onEnter,
  });

  return (
    <div id="app">
      <Header />
      <Board answer={answer} currentGuess={currentGuess} guessed={guessed} />
      <Keyboard
        disabled={isDefeat(guessed, answer) || isVictory(guessed, answer)}
        onUpdate={onUpdate}
        onDelete={onDelete}
        onEnter={onEnter}
        {...getGuessedCorrectness(guessed, answer)}
      />
    </div>
  );
}

export default App;
