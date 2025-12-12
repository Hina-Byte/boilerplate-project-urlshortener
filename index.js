require('dotenv').config();
const express = require('express');
const cors = require('cors');
const dns = require('dns');
const bodyParser = require('body-parser');

const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/public', express.static(`${process.cwd()}/public`));

// HTML homepage
app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Test endpoint
app.get('/api/hello', (req, res) => {
  res.json({ greeting: 'hello API' });
});

// In-memory "database"
let urlDatabase = [];
let id = 1;

// POST endpoint to create short URL
app.post('/api/shorturl', (req, res) => {
  let originalUrl = req.body.url;

  // Try to parse URL
  let urlObject;
  try {
    urlObject = new URL(originalUrl);
  } catch (err) {
    return res.json({ error: 'invalid URL' });
  }

  // Check if hostname is valid
  dns.lookup(urlObject.hostname, (err) => {
    if (err) return res.json({ error: 'invalid URL' });

    // Save in database
    const shortUrl = id++;
    urlDatabase.push({ original_url: originalUrl, short_url: shortUrl });

    res.json({ original_url: originalUrl, short_url: shortUrl });
  });
});

// GET endpoint to redirect to original URL
app.get('/api/shorturl/:short_url', (req, res) => {
  const shortUrl = Number(req.params.short_url);
  const entry = urlDatabase.find(u => u.short_url === shortUrl);

  if (!entry) return res.json({ error: 'No short URL found' });

  res.redirect(entry.original_url);
});

// Start server
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
