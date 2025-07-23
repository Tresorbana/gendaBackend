import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import nodemailer from 'nodemailer';
import crypto from 'crypto';
import transporter from '../lib/nodemailer.js'; // If you have a centralized transporter

// Register a new user
export const register = async (req, res) => {
  try {
    const { name, email, phone, password, role } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const user = new User({ name, email, phone, password: hashedPassword, role, otp });
    await user.save();

    let emailSent = false;
    let emailError = null;
    try {
      await transporter.sendMail({
        to: user.email,
        from: process.env.EMAIL_USER,
        subject: 'Verify your account',
        text: `Your verification OTP is: ${otp}`,
      });
      emailSent = true;
    } catch (emailErr) {
      emailError = emailErr.message || emailErr;
      console.error('Verification email failed:', emailError);
    }

    res.status(201).json({
      message: 'User registered successfully.',
      verificationEmailSent: emailSent,
      emailError: emailSent ? null : emailError
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message || 'Server error', error: err });
  }
};

// Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET || 'uber_jwt_secret', { expiresIn: '1d' });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ message: err.message || 'Server error', error: err });
  }
};

// Forgot password
export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'User not found' });
    const token = crypto.randomBytes(32).toString('hex');
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();
    // Send email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    const mailOptions = {
      to: user.email,
      from: process.env.EMAIL_USER,
      subject: 'Password Reset',
      text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n` +
        `Please use the following token to reset your password:\n\n${token}\n\n` +
        `If you did not request this, please ignore this email.`,
    };
    await transporter.sendMail(mailOptions);
    res.json({ message: 'Password reset email sent' });
  } catch (err) {
    res.status(500).json({ message: err.message || 'Server error', error: err });
  }
};

// Reset password
export const resetPassword = async (req, res) => {
  const { token, password } = req.body;
  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });
    if (!user) return res.status(400).json({ message: 'Invalid or expired token' });
    user.password = await bcrypt.hash(password, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();
    res.json({ message: 'Password has been reset' });
  } catch (err) {
    res.status(500).json({ message: err.message || 'Server error', error: err });
  }
};

// Verify OTP and login
export const verifyOtp = async (req, res) => {
  try {
    const { email, phone, code } = req.body;
    // Find user by email or phone and not yet verified
    const user = await User.findOne({
      $or: [
        { email },
        { phone }
      ],
      verified: false
    });
    if (!user) return res.status(400).json({ success: false, error: 'User not found or already verified' });
    if (user.otp !== code) return res.status(400).json({ success: false, error: 'Invalid OTP code' });
    user.verified = true;
    user.otp = undefined;
    await user.save();
    // Issue JWT
    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET || 'uber_jwt_secret', { expiresIn: '1d' });
    res.json({ success: true, token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message || 'Server error' });
  }
}; 