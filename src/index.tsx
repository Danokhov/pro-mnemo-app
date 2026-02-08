import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

function showFatalError(title: string, message: string, detail?: string) {
  const el = document.getElementById('root') || document.body;
  el.innerHTML = [
    '<div style="padding:24px;font-family:sans-serif;max-width:520px;margin:40px auto;background:#fef2f2;border:1px solid #fecaca;border-radius:8px">',
    '<h2 style="color:#b91c1c;margin-top:0">' + title + '</h2>',
    '<p style="color:#991b1b">' + message.replace(/</g, '&lt;') + '</p>',
    detail ? '<pre style="font-size:12px;overflow:auto;white-space:pre-wrap">' + detail.replace(/</g, '&lt;') + '</pre>' : '',
    '</div>'
  ].join('');
}

window.onerror = function (msg, url, line, col, err) {
  console.error('Uncaught error:', msg, url, line, col, err);
  showFatalError('Ошибка загрузки', String(msg), err?.stack);
  return false;
};
window.onunhandledrejection = function (e) {
  console.error('Unhandled rejection:', e.reason);
  const msg = e.reason?.message || e.reason?.toString?.() || String(e.reason);
  showFatalError('Ошибка (unhandled)', msg, e.reason?.stack);
};

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  state = { hasError: false, error: null as Error | null };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('App error:', error, info.componentStack);
  }

  render() {
    if (this.state.hasError && this.state.error) {
      return (
        <div style={{
          padding: 24,
          fontFamily: 'sans-serif',
          maxWidth: 480,
          margin: '40px auto',
          background: '#fef2f2',
          border: '1px solid #fecaca',
          borderRadius: 8,
        }}>
          <h2 style={{ color: '#b91c1c', marginTop: 0 }}>Ошибка загрузки</h2>
          <p style={{ color: '#991b1b' }}>{this.state.error.message}</p>
          <pre style={{ fontSize: 12, overflow: 'auto' }}>{this.state.error.stack}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  document.body.innerHTML = '<div style="padding:24px;font-family:sans-serif">Не найден элемент #root</div>';
  throw new Error("Could not find root element to mount to");
}

try {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </React.StrictMode>
  );
} catch (e) {
  const err = e instanceof Error ? e : new Error(String(e));
  showFatalError('Ошибка инициализации', err.message, err.stack);
  throw e;
}
