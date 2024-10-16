const express = require('express');
const mongoose = require('mongoose');  // Ensure mongoose is imported
const Channel = require('../models/channel.model');
const { verifyToken } = require('../middleware/auth.middleware');
const router = express.Router();

// POST /groups/:groupId/channels - Create a channel within a group
router.post('/:groupId/channels', verifyToken, async (req, res) => {
  try {
    const { name } = req.body;
    const { groupId } = req.params;

    if (!name) {
      return res.status(400).json({ message: 'Channel name is required.' });
    }

    // Properly convert groupId to ObjectId using "new"
    const validGroupId = new mongoose.Types.ObjectId(groupId);

    const newChannel = new Channel({
      name,
      group: validGroupId,
    });

    await newChannel.save();
    res.status(201).json({ message: 'Channel created successfully', channel: newChannel });
  } catch (error) {
    console.error('Error creating channel:', error);  // Log the error for debugging
    res.status(500).json({ message: 'Failed to create channel', error: error.message || error });
  }
});

// GET /groups/:groupId/channels - Get all channels within a group
router.get('/:groupId/channels', verifyToken, async (req, res) => {
  try {
    const { groupId } = req.params;

    // Properly convert groupId to ObjectId using "new"
    const validGroupId = new mongoose.Types.ObjectId(groupId);

    const channels = await Channel.find({ group: validGroupId });
    
    if (!channels || channels.length === 0) {
      return res.status(404).json({ message: 'No channels found for this group.' });
    }

    res.status(200).json(channels);
  } catch (error) {
    console.error('Error retrieving channels:', error);
    res.status(500).json({ message: 'Failed to retrieve channels', error: error.message || error });
  }
});

// POST /groups/:groupId/channels/:channelId/messages - Send a message to a specific channel
router.post('/:groupId/channels/:channelId/messages', verifyToken, async (req, res) => {
  try {
    const { username, text } = req.body;
    const { channelId } = req.params;

    if (!username || !text) {
      return res.status(400).json({ message: 'Username and message text are required.' });
    }

    const channel = await Channel.findById(channelId);
    if (!channel) {
      return res.status(404).json({ message: 'Channel not found' });
    }

    const message = { username, text, timestamp: new Date() };
    channel.messages.push(message);
    await channel.save();

    res.status(201).json({ message: 'Message sent successfully', data: message });
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ message: 'Failed to send message', error: error.message || error });
  }
});

// GET /groups/:groupId/channels/:channelId/messages - Retrieve all messages for a specific channel
router.get('/:groupId/channels/:channelId/messages', verifyToken, async (req, res) => {
  try {
    const { channelId } = req.params;

    const channel = await Channel.findById(channelId).populate('messages');
    if (!channel) {
      return res.status(404).json({ message: 'Channel not found' });
    }

    res.status(200).json(channel.messages);
  } catch (error) {
    console.error('Error retrieving messages:', error);
    res.status(500).json({ message: 'Failed to retrieve messages', error: error.message || error });
  }
});

module.exports = router;

