const express = require('express');
const cors = require('cors');
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Enable CORS (to allow your Angular app to access the server)
app.use(cors());

// Store messages in memory (for simplicity, you can replace this with a database)
let messages = [];

// Endpoint to send a message (POST /send)
app.post('/send', (req, res) => {
  const message = req.body;
  if (message && message.username && message.text) {
    messages.push(message);
    res.status(200).json({ message: 'Message sent successfully' });
  } else {
    res.status(400).json({ error: 'Invalid message' });
  }
});

// Endpoint to get all messages (GET /messages)
app.get('/messages', (req, res) => {
  res.json(messages);
});

// Start the server on port 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${5000}`);
});
