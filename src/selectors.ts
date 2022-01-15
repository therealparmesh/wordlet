import words from './words';

export function getGuessCorrectness(guess: string, answer: string) {
  const { correctIndices, remainingLetters } = guess.split('').reduce(
    (previous, current, index) => {
      if (previous.remainingLetters[index] === current) {
        previous.correctIndices[index] = true;
        previous.remainingLetters.splice(index, 1, ' ');
      }

      return previous;
    },
    {
      correctIndices: {} as { [key: number]: boolean },
      remainingLetters: answer.split(''),
    },
  );

  const { partiallyCorrectIndices } = guess.split('').reduce(
    (previous, current, index) => {
      if (
        !correctIndices[index] &&
        previous.remainingLetters.includes(current)
      ) {
        previous.partiallyCorrectIndices[index] = true;
        previous.remainingLetters.splice(
          previous.remainingLetters.indexOf(current),
          1,
          ' ',
        );
      }

      return previous;
    },
    {
      partiallyCorrectIndices: {} as { [key: number]: boolean },
      remainingLetters,
    },
  );

  return { correctIndices, partiallyCorrectIndices };
}

export function getGuessedCorrectness(guessed: string[], answer: string) {
  const correctLetters = guessed.reduce((previous, current) => {
    current
      .split('')
      .filter((letter, index) => answer.charAt(index) === letter)
      .forEach((letter) => {
        previous[letter] = true;
      });

    return previous;
  }, {} as { [key: string]: boolean });

  const partiallyCorrectLetters = guessed.reduce((previous, current) => {
    current
      .split('')
      .filter((letter) => !correctLetters[letter] && answer.includes(letter))
      .forEach((letter) => {
        previous[letter] = true;
      });

    return previous;
  }, {} as { [key: string]: boolean });

  const usedLetters = guessed.reduce((previous, current) => {
    current
      .split('')
      .filter(
        (letter) =>
          !(correctLetters[letter] || partiallyCorrectLetters[letter]),
      )
      .forEach((letter) => {
        previous[letter] = true;
      });

    return previous;
  }, {} as { [key: string]: boolean });

  return {
    correctLetters,
    partiallyCorrectLetters,
    usedLetters,
  };
}

export function getNewAnswer() {
  const randomIndex = Math.floor(Math.random() * words.length);

  return words[randomIndex];
}

export function isDefeat(guessed: string[], answer: string) {
  const guessMatch = guessed.find((guess) => guess === answer);

  return guessed.length === 6 && !Boolean(guessMatch);
}

export function isGuessValid(currentGuess: string) {
  const wordMatch = words.find((word) => word === currentGuess);

  return Boolean(wordMatch);
}

export function isIndexActive(index: number, guessed: string[]) {
  const activeIndex = guessed.length === 6 ? -1 : guessed.length;

  return index === activeIndex;
}

export function isVictory(guessed: string[], answer: string) {
  const guessMatch = guessed.find((guess) => guess === answer);

  return guessed.length <= 6 && Boolean(guessMatch);
}
