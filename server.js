// server.js
require('dotenv').config();
const express = require('express');
const { sequelize } = require('./models');
const app = express();
const http = require('http');
const socketIo = require('socket.io');
const userRoutes = require('./routes/userRoutes');
const itemRoutes = require('./routes/itemRoutes');
const bidRoutes = require('./routes/bidRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const index = require('./routes/index');
const ioMiddleware = require('./middleware/ioMiddleware');

const server = http.createServer(app);
const io = socketIo(server);

// Middleware to attach io to request
app.use(ioMiddleware(io));

// Middleware
app.use(express.json());
app.use('/api', userRoutes);
app.use('/api/item', itemRoutes);
app.use('/api/bid', bidRoutes);
app.use('/api/notification', notificationRoutes);
app.use('/api/index', index);

// Database synchronization and server start
sequelize.sync().then(() => {
  server.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
  });
});

io.on('connection', (socket) => {
  console.log('New client connected');
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

module.exports = { app, io };
