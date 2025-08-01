import React, { useState } from 'react';

function URLAnalytics() {
  const [shortCode, setShortCode] = useState('');
  const [analytics, setAnalytics] = useState(null);
  const [error, setError] = useState('');

  const fetchAnalytics = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/urls/${shortCode}/analytics`);
      const data = await response.json();
      if (response.ok) {
        setAnalytics(data);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Failed to fetch analytics.');
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter Short Code"
        value={shortCode}
        onChange={(e) => setShortCode(e.target.value)}
      />
      <button onClick={fetchAnalytics}>Get Analytics</button>
      {analytics && (
        <div>
          <p>Total Clicks: {analytics.clicks}</p>
          <h3>Click Details:</h3>
          <ul>
            {analytics.clickDetails.map((detail, index) => (
              <li key={index}>
                {detail.timestamp} - {detail.source} - {detail.location}
              </li>
            ))}
          </ul>
        </div>
      )}
      {error && <p>Error: {error}</p>}
    </div>
  );
}

export default URLAnalytics;