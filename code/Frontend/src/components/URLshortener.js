import React, { useState } from 'react';

function URLShortener() {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [customCode, setCustomCode] = useState('');
  const [expiryMinutes, setExpiryMinutes] = useState('');
  const [message, setMessage] = useState('');

  const getLinkAndRedirect = async (e, shortUrl) => {
    e.preventDefault();
    const shortCode = shortUrl.split('/').pop().trim();
    try {
      const response = await fetch(`http://localhost:5000/api/urls/${shortCode}`);
      const data = await response.json();
      if (response.ok) {
        window.location.href = data.originalUrl;
      } else {
        setMessage('Short URL not found or expired.');
      }
    } catch (error) {
      setMessage('Failed to fetch short URL data.');
    }
  };

  const handleShorten = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/urls/shorten', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          originalUrl: originalUrl.trim(),
          customCode: customCode.trim() || undefined,
          expiryMinutes: expiryMinutes ? parseInt(expiryMinutes) : undefined,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setShortUrl(data.shortUrl);
        setMessage('URL shortened successfully!');
      } else {
        setMessage(data.message || 'Error shortening URL.');
      }
    } catch {
      setMessage('Failed to shorten URL.');
    }
  };

  return (
    <div
      style={{
        maxWidth: '600px',
        margin: '40px auto',
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
        border: '1px solid #ddd',
        borderRadius: '8px',
        backgroundColor: '#f9f9f9',
      }}
    >
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>URL Shortener</h1>
      <form
        id="urlForm"
        onSubmit={(e) => {
          e.preventDefault();
          handleShorten();
        }}
        style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}
      >
        <label htmlFor="originalUrl" style={{ fontWeight: 'bold' }}>
          Original URL
        </label>
        <input
          type="text"
          id="originalUrl"
          name="originalUrl"
          required
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
          style={{
            padding: '10px',
            fontSize: '16px',
            borderRadius: '4px',
            border: '1px solid #ccc',
          }}
        />

        <label htmlFor="customCode" style={{ fontWeight: 'bold' }}>
          Custom Code (optional)
        </label>
        <input
          type="text"
          id="customCode"
          name="customCode"
          value={customCode}
          onChange={(e) => setCustomCode(e.target.value)}
          style={{
            padding: '10px',
            fontSize: '16px',
            borderRadius: '4px',
            border: '1px solid #ccc',
          }}
        />

        <label htmlFor="expiryMinutes" style={{ fontWeight: 'bold' }}>
          Expiry Time (in minutes, optional)
        </label>
        <input
          type="number"
          id="expiryMinutes"
          name="expiryMinutes"
          min="1"
          value={expiryMinutes}
          onChange={(e) => setExpiryMinutes(e.target.value)}
          style={{
            padding: '10px',
            fontSize: '16px',
            borderRadius: '4px',
            border: '1px solid #ccc',
          }}
        />

        <button
          type="submit"
          style={{
            padding: '12px',
            fontSize: '16px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Shorten
        </button>
      </form>

      {message && (
        <p style={{ marginTop: '20px', color: message.includes('successfully') ? 'green' : 'red' }}>
          {message}
        </p>
      )}

      {shortUrl && (
        <div
          className="result"
          id="shortenedResult"
          style={{
            marginTop: '25px',
            padding: '15px',
            backgroundColor: '#e6ffe6',
            borderRadius: '5px',
            wordBreak: 'break-all',
          }}
        >
          <strong>Short URL:</strong>{' '}
          <a href={shortUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#007bff' }}>
            {shortUrl}
          </a>
        </div>
      )}

      <div
        className="analytics"
        id="analyticsSection"
        style={{ marginTop: '30px', display: 'none' }}
      >
        <h3>Analytics</h3>
        <p>
          Total Clicks: <span id="totalClicks"></span>
        </p>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#007bff', color: '#fff' }}>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>Timestamp</th>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>User Agent</th>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>Location</th>
            </tr>
          </thead>
          <tbody id="clickDetails"></tbody>
        </table>
      </div>
    </div>
  );
}

export default URLShortener;
