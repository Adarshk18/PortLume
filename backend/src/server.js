require('dotenv').config();
const http = require('http');
const app = require('./app');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');

// Create HTTP server from Express app
const server = http.createServer(app);

// Initialize Socket.IO on the same server
const io = require('socket.io')(server, {
  cors: {
    origin: process.env.FRONTEND_URL || '*', // safer CORS
    methods: ['GET', 'POST'],
    credentials: true
  }
});

// Expose `io` globally for use in routes/controllers
app.set('io', io);

// Socket.IO event handlers
io.on('connection', (socket) => {
  console.log('🟢 Socket connected:', socket.id);

  // Join a portfolio room
  socket.on('joinPortfolio', (portfolioId) => {
    socket.join(`portfolio_${portfolioId}`);
    console.log(`Socket ${socket.id} joined portfolio_${portfolioId}`);
  });

  // Leave a portfolio room
  socket.on('leavePortfolio', (portfolioId) => {
    socket.leave(`portfolio_${portfolioId}`);
    console.log(`Socket ${socket.id} left portfolio_${portfolioId}`);
  });

  socket.on('disconnect', () => {
    console.log('🔴 Socket disconnected:', socket.id);
  });
});

app.use('/api/user', userRoutes);

// Port setup
const PORT = process.env.PORT || 5000;

// Connect DB and start server
(async () => {
  try {
    await connectDB();

    server.listen(PORT, () => {
      console.log(`🚀 Server running at ${process.env.BACKEND_URL || 'http://localhost:' + PORT}`);
    });
  } catch (err) {
    console.error('❌ Failed to start server:', err);
    process.exit(1);
  }
})();
