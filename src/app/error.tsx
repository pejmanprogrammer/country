'use client';

interface ErrorPageProps {
  error: Error & {
    digest?: string;
  };
  reset: () => void;
}

export default function ErrorPage({
  error,
  reset,
}: ErrorPageProps) {
  return (
    <main className="status-page">
      <h1>Something went wrong</h1>

      <p>
        {error.message ||
          'An unexpected error occurred.'}
      </p>

      <button
        type="button"
        className="back-button"
        onClick={reset}
      >
        Try again
      </button>
    </main>
  );
}