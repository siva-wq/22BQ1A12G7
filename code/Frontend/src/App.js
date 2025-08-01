import React from 'react';
import URLShortener from './components/URLshortener';
import URLAnalytics from './components/URLanalytics';

function App() {
  return (
    <div>
      <h1>URL Shortener</h1>
      <URLShortener />
      <URLAnalytics />
    </div>
  );
}

export default App;