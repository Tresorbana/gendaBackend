import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import session from 'express-session';
import passport from 'passport';
import { createServer } from 'http';
import { Server } from 'socket.io';

// Import modular routes
import authRoutes from './routes/auth.routes.js';
import tripRoutes from './routes/trips.routes.js';
import rideRequestRoutes from './routes/rideRequests.routes.js';
import paymentRoutes from './routes/payment.routes.js';
import settingsRoutes from './routes/settings.routes.js';

// Import middleware and lib as needed
// import { someMiddleware } from './middleware/some.middleware.js';
// import { connectDB } from './lib/db.js';

const app = express();
const httpServer = createServer(app);

// Socket.IO setup
const io = new Server(httpServer, {
  cors: {
    origin: ["http://localhost:5173", "https://yourfrontend.com"],
    credentials: true,
    methods: ["GET", "POST"],
  },
});
app.set("io", io);

app.use(cors());
app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET || 'uber_secret',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false },
}));
app.use(passport.initialize());
app.use(passport.session());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { dbName: 'uber' })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Use modular routes
app.use('/api/auth', authRoutes);
app.use('/api/trips', tripRoutes);
app.use('/api/ride-requests', rideRequestRoutes);
app.use('/api/payment-methods', paymentRoutes);
app.use('/api/settings', settingsRoutes);

app.get('/', (req, res) => {
  res.send('Uber backend API is running');
});

// Socket.IO events (example)
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);
  // Add your real-time event handlers here
});

const PORT = process.env.PORT || 4000;
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});