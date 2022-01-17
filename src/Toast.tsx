function Toast({ message }: { message: string }) {
  return (
    <div class="toast">
      <div class="toast-message">{message}</div>
    </div>
  );
}

export default Toast;
