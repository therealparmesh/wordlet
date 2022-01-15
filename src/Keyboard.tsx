import clsx from 'clsx';

const letters = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  ['z', 'x', 'c', 'v', 'b', 'n', 'm'],
];

function Keyboard({
  disabled,
  correctLetters,
  partiallyCorrectLetters,
  usedLetters,
  onUpdate,
  onDelete,
  onEnter,
}: {
  disabled: boolean;
  correctLetters: { [key: string]: boolean };
  partiallyCorrectLetters: { [key: string]: boolean };
  usedLetters: { [key: string]: boolean };
  onUpdate: (letter: string) => void;
  onDelete: () => void;
  onEnter: () => void;
}) {
  return (
    <div class="keyboard">
      {letters.map((row, index) => (
        <div key={index} class="keyboard-row">
          {index === 1 && <div class="keyboard-spacer" />}
          {index === 2 && (
            <button
              class="keyboard-key keyboard-key-action"
              disabled={disabled}
              onClick={onEnter}
            >
              Enter
            </button>
          )}
          {row.map((letter) => (
            <button
              key={letter}
              class={clsx('keyboard-key', {
                'keyboard-key-correct': correctLetters[letter],
                'keyboard-key-partially-correct':
                  partiallyCorrectLetters[letter] && !correctLetters[letter],
                'keyboard-key-used':
                  usedLetters[letter] &&
                  !(correctLetters[letter] || partiallyCorrectLetters[letter]),
              })}
              disabled={disabled}
              onClick={() => onUpdate(letter)}
            >
              {letter}
            </button>
          ))}
          {index === 1 && <div class="keyboard-spacer" />}
          {index === 2 && (
            <button
              class="keyboard-key keyboard-key-action"
              disabled={disabled}
              onClick={onDelete}
            >
              Delete
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

export default Keyboard;
