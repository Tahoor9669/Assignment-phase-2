const express = require('express');
const Chat = require('../models/chat.model');  // Import the chat model
const { verifyToken } = require('../middleware/auth.middleware');  // Use token verification if needed
const router = express.Router();

// POST /chat/send - Endpoint to send a new chat message
router.post('/send', verifyToken, async (req, res) => {
  try {
    const { username, text } = req.body;

    const newMessage = new Chat({ username, text });
    await newMessage.save();  // Save the message to MongoDB

    console.log('Message saved to DB:', newMessage);  // Add log here

    res.status(201).json({ message: 'Message sent successfully', data: newMessage });
  } catch (error) {
    console.error('Error saving message:', error);  // Log any error
    res.status(500).json({ message: 'Failed to send message', error });
  }
});

// GET /chat/messages - Endpoint to retrieve all chat messages
router.get('/messages', verifyToken, async (req, res) => {
  try {
    const messages = await Chat.find().sort({ timestamp: 1 });  // Retrieve all messages
    console.log('Retrieved messages:', messages);  // Add logging here
    res.status(200).json(messages);
  } catch (error) {
    console.error('Error retrieving messages:', error);  // Log any error
    res.status(500).json({ message: 'Failed to retrieve messages', error });
  }
});

module.exports = router;
