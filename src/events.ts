import { useEffect } from 'preact/hooks';

export function useKeyboardEvents({
  disabled,
  onUpdate,
  onDelete,
  onEnter,
}: {
  disabled: boolean;
  onUpdate: (letter: string) => void;
  onDelete: () => void;
  onEnter: () => void;
}) {
  useEffect(() => {
    if (!disabled) {
      function onKeyDown(e: KeyboardEvent) {
        if (
          e.key.length === 1 &&
          e.key.toLowerCase() >= 'a' &&
          e.key.toLowerCase() <= 'z'
        ) {
          onUpdate(e.key.toLowerCase());
        }

        if (e.key === 'Backspace' || e.key === 'Delete') {
          onDelete();
          e.preventDefault();
        }

        if (e.key === 'Enter') {
          onEnter();
          e.preventDefault();
        }
      }

      window.addEventListener('keydown', onKeyDown);

      return () => {
        window.removeEventListener('keydown', onKeyDown);
      };
    }
  }, [disabled, onUpdate, onDelete, onEnter]);
}
