import { ErrorBoundaryProps } from 'react-error-boundary';

export function ErrorFallback({ error, resetErrorBoundary }): React.ReactElement {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}
