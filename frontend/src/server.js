const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3221;

// Correctly serve static files from the frontend directory
app.use(express.static(path.join(__dirname, '..')));

// Any API routes would go here (e.g., app.get('/api/notes', ...))

// Fallback to index.html for any unmatched routes.
// This must be placed after the express.static() middleware
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Frontend server running at http://0.0.0.0:${PORT}`);
});