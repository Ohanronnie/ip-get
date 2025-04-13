const express = require('express');
const path = require('path');
const app = express();

const ipList = [];
const geoLocations = [];

app.use(express.static('public'));
app.use(express.json()); // for JSON POST data

// IP API
app.get('/api/ips', (req, res) => {
  const userIP = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  if (!ipList.includes(userIP)) ipList.push(userIP);
  res.json({ allIPs: ipList });
});

// Location API
app.post('/api/location', (req, res) => {
  const { latitude, longitude } = req.body;
  if (typeof latitude === 'number' && typeof longitude === 'number') {
    geoLocations.push({ latitude, longitude });
    res.status(200).json({ success: true });
  } else {
    res.status(400).json({ error: 'Invalid coordinates' });
  }
});
app.get('/admin', (req, res) => {
    const html = `
      <html>
        <head>
          <title>Admin Panel</title>
          <style>
            body {
              font-family: monospace;
              background: #0f0f0f;
              color: #f4f4f4;
              padding: 2rem;
            }
            h1 { margin-bottom: 1rem; }
            pre {
              background: #222;
              padding: 1rem;
              border-radius: 8px;
              overflow-x: auto;
              max-height: 60vh;
            }
          </style>
        </head>
        <body>
          <h1>Admin Panel</h1>
          <h2>All Tracked IPs</h2>
          <pre>${JSON.stringify(ipList, null, 2)}</pre>
  
          <h2>Geolocation Coordinates</h2>
          <pre>${JSON.stringify(geoLocations, null, 2)}</pre>
        </body>
      </html>
    `;
    res.send(html);
  });
  

module.exports = app;
