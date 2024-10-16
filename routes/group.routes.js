const express = require('express');
const Group = require('../models/group.model');
const { verifyToken, hasRole } = require('../middleware/auth.middleware'); // Middleware for auth

const router = express.Router();

// POST /groups - Create a new group (Admin or SuperAdmin only)
router.post('/', verifyToken, hasRole('GroupAdmin'), async (req, res) => {
  try {
    const { name, description } = req.body;
    const newGroup = new Group({
      name,
      description,
      createdBy: req.user.userId,  // Created by the logged-in user
      members: [req.user.userId]   // Add the creator as a member
    });
    await newGroup.save();
    res.status(201).json({ message: 'Group created successfully', group: newGroup });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create group', error });
  }
});

// GET /groups/:groupId/channels - Retrieve all channels for a specific group
router.get('/:groupId/channels', verifyToken, async (req, res) => {
  try {
    const group = await Group.findById(req.params.groupId).populate('channels');
    if (!group) {
      return res.status(404).json({ message: 'Group not found' });
    }
    res.status(200).json(group.channels);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve channels', error });
  }
});

module.exports = router;
