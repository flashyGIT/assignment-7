export default function LoadingSpinner() {
  return (
    <div role="status" aria-live="polite">
      Loading movies...
    </div>
  );
}
src/components/ErrorMessage.jsx

jsx

export default function ErrorMessage({ message }) {
  return (
    <div role="alert" className="error-message">
      {message || "Something went wrong. Please try again."}
    </div>
  );
}
