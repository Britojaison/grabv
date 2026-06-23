window.addEventListener('error', function(event) {
  fetch('http://localhost:3000/api/log', { method: 'POST', body: JSON.stringify({ message: event.message, filename: event.filename, lineno: event.lineno }) });
});
window.addEventListener('unhandledrejection', function(event) {
  fetch('http://localhost:3000/api/log', { method: 'POST', body: JSON.stringify({ message: event.reason }) });
});
