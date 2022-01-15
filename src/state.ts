import { useReducer } from 'preact/hooks';
import { getNewAnswer, isGuessValid } from './selectors';

type State = {
  answer: string;
  currentGuess: string;
  guessed: string[];
};

type Action =
  | {
      type: 'SEND_UPDATE';
      payload: string;
    }
  | {
      type: 'SEND_DELETE';
    }
  | {
      type: 'SEND_ENTER';
    };

const initialState = {
  answer: import.meta.env.VITE_TEST_ANSWER ?? getNewAnswer(),
  currentGuess: '',
  guessed: [],
};

function reducer(state: State, action: Action) {
  switch (action.type) {
    case 'SEND_UPDATE': {
      return {
        ...state,
        currentGuess: `${state.currentGuess}${action.payload}`,
      };
    }
    case 'SEND_DELETE': {
      return {
        ...state,
        currentGuess: state.currentGuess.slice(0, -1),
      };
    }
    case 'SEND_ENTER': {
      return {
        ...state,
        currentGuess: '',
        guessed: [...state.guessed, state.currentGuess],
      };
    }
    default:
      return state;
  }
}

export function useGameState() {
  const [state, dispatch] = useReducer<State, Action>(reducer, initialState);

  function sendUpdate(letter: string) {
    if (state.currentGuess.length < 5) {
      dispatch({
        type: 'SEND_UPDATE',
        payload: letter,
      });
    }
  }

  function sendDelete() {
    if (state.currentGuess.length > 0) {
      dispatch({
        type: 'SEND_DELETE',
      });
    }
  }

  function sendEnter() {
    if (isGuessValid(state.currentGuess)) {
      dispatch({
        type: 'SEND_ENTER',
      });
    }
  }

  return {
    ...state,
    sendUpdate,
    sendDelete,
    sendEnter,
  };
}
