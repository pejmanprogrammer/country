interface LoadingProps {
  message?: string;
}

export default function Loading({
  message = 'Loading...',
}: LoadingProps) {
  return (
    <div className="loading">
      {message}
    </div>
  );
}