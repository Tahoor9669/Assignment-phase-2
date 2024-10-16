# Chat Application - Assignment Phase 2

## Overview
This project is a chat application built using the MEAN stack (MongoDB, Express, Angular, Node.js) with real-time communication via Socket.io. The application includes features such as user authentication, group and channel management, image upload, and video chat using PeerJS.

## Features
- **User Authentication**: JWT-based login and registration.
- **Group and Channel Management**: Users can create and manage groups and channels for conversations.
- **Real-Time Chat**: Messages are sent and received in real-time using Socket.io.
- **Image Upload**: Users can upload profile pictures and images within chat.
- **Video Chat**: Peer-to-peer video chat using PeerJS.
- **MongoDB for Data Storage**: MongoDB is used to store user, group, and chat history.

## Prerequisites
- **Node.js** (LTS recommended)
- **MongoDB**: A local or remote MongoDB instance is required.
- **Angular CLI**: Install globally using:
  ```bash
  npm install -g @angular/cli
.
├── backend/                   # Backend (Node.js + Express)
│   ├── models/                # Mongoose Models
│   ├── routes/                # API Routes (Users, Groups, Chat, etc.)
│   └── server.js              # Main server file
│
├── frontend/                  # Frontend (Angular)
│   ├── src/                   # Angular source files
│   └── angular.json           # Angular configuration
│
├── README.md                  # Project documentation
├── .gitignore                 # Git ignore file
└── package.json               # Node.js dependencies and scripts


Author
Your Name : Syed Tahoor Imam
Student ID: s5256030



### Key Points Covered in This README:
1. **Installation and Setup**: Clear instructions on how to install dependencies and run both the backend and frontend servers.
2. **API Routes**: Describes all the relevant API routes (user authentication, group and channel management, chat, and image upload).
3. **Client-Server Interaction**: Explanation of how the Angular frontend communicates with the Node.js backend and how real-time messaging is implemented using Socket.io.
4. **Socket.io Implementation**: Describes how real-time chat works using Socket.io.
5. **Testing**: Includes sample unit tests for both the backend (using Mocha and Chai) and the frontend (using Jasmine and Karma).

This full README file provides all the necessary details for your Assignment Phase 2 submission. Copy this content into your `README.md` file and push it to your GitHub repository! Let me know if you need further adjustments
