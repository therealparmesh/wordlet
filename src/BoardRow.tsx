import clsx from 'clsx';

function BoardRow({
  guess,
  disabled,
  correctIndices,
  partiallyCorrectIndices,
}: {
  guess: string;
  disabled: boolean;
  correctIndices: { [key: number]: boolean };
  partiallyCorrectIndices: { [key: number]: boolean };
}) {
  return (
    <div class="board-row">
      {Array.from({ length: 5 }).map((_, index) => {
        const letter = guess.charAt(index);

        return (
          <div
            key={index}
            class={clsx('board-tile', {
              'board-tile-highlighted': index <= guess.length - 1 && !disabled,
              'board-tile-empty': !(disabled
                ? Boolean(letter)
                : index <= guess.length - 1),
              'board-tile-correct': correctIndices[index] && disabled,
              'board-tile-partially-correct':
                partiallyCorrectIndices[index] && disabled,
              'board-tile-used':
                !(correctIndices[index] || partiallyCorrectIndices[index]) &&
                Boolean(letter) &&
                disabled,
            })}
          >
            {letter}
          </div>
        );
      })}
    </div>
  );
}

export default BoardRow;
