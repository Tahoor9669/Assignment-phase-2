const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const http = require('http'); // Import http to create server
const { Server } = require('socket.io'); // Import Socket.io
require('dotenv').config(); // Load environment variables

// Create an Express app
const app = express();
const PORT = 5000;

// Middleware setup
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/chat-app', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Import user routes
const userRoutes = require('./routes/user.routes');

// Use user routes
app.use('/api/users', userRoutes);

// Import chat routes
const chatRoutes = require('./routes/chat.routes');

// Use chat routes
app.use('/api/chat', chatRoutes);

// Import group and channel routes
const groupRoutes = require('./routes/group.routes');
const channelRoutes = require('./routes/channel.routes');

// Use group and channel routes
app.use('/api/groups', groupRoutes);
app.use('/api/channels', channelRoutes);  // Channels are nested within groups

// Define a simple route for testing
app.get('/', (req, res) => {
  res.send('Hello from the server!');
});

// Create HTTP server
const server = http.createServer(app);

// Set up Socket.io
const io = new Server(server);

// Handle socket connection
io.on('connection', (socket) => {
  console.log('A user connected'); // Log when a user connects

  // Listen for incoming messages
  socket.on('message', (message) => {
    io.emit('message', message); // Broadcast the message to all connected clients
  });

  // Log when a user disconnects
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
