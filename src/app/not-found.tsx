import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="status-page">
      <h1>404</h1>

      <p>
        The page you are looking for
        does not exist.
      </p>

      <Link
        href="/"
        className="back-button"
      >
        ← Back to countries
      </Link>
    </main>
  );
}