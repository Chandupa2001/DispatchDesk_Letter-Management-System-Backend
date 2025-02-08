import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

// Signup logic
export const signup = async (req, res) => {
  try {
    const { officerNo, officerName, email, password } = req.body;

    // Ensure all fields are provided
    if (!officerNo || !officerName || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ officerNo }, { email }],
    });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this officer number or email' });
    }

    // Create a new user
    const newUser = new User({
      officerNo,
      officerName,
      email,
      password,
    });

    // Save the new user to the database
    await newUser.save();

    // Ensure JWT_SECRET is defined
    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ message: 'JWT_SECRET is missing' });
    }

    // Create a token (JWT) for the user
    const token = jwt.sign(
      { id: newUser._id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Send response with the token
    res.status(201).json({ message: 'User created successfully', token });
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Login logic
export const login = async (req, res) => {
  try {
    const { officerNo, password } = req.body;

    // Find the user by officerNo
    const user = await User.findOne({ officerNo });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Compare the password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Ensure JWT_SECRET is defined
    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ message: 'JWT_SECRET is missing' });
    }

    // Create a token (JWT) for the user
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Send response with the token
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
