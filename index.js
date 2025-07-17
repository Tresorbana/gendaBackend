import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import rideRequestRoutes from './routes/rideRequests.js';
import tripRoutes from './routes/trips.js';
import paymentMethodRoutes from './routes/paymentMethods.js';
import settingsRoutes from './routes/settings.js';
import session from 'express-session';
import passport from 'passport';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET || 'uber_secret',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }, // set to true if using HTTPS
}));
app.use(passport.initialize());
app.use(passport.session());

const MONGO_URI = 'mongodb+srv://tresorbana77:BDeckOQ1TNXbbrSf@cluster0.ryvssej.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(MONGO_URI, { dbName: 'uber' })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use('/api/auth', authRoutes);
app.use('/api/ride-requests', rideRequestRoutes);
app.use('/api/trips', tripRoutes);
app.use('/api/payment-methods', paymentMethodRoutes);
app.use('/api/settings', settingsRoutes);

app.get('/', (req, res) => {
  res.send('Uber backend API is running');
});

// TODO: Add user, trip, ride request routes here

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 