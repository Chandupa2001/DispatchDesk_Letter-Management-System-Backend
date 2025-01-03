import userModel from '../models/userModel.js';  
import jwt from 'jsonwebtoken';

// Signup logic
export const signup = async (req, res) => {
    try {
      const { officerNo, officerName, email, password } = req.body;
  
      // Ensure all fields are provided
      if (!officerNo || !officerName || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
      }
  
      // Check if user already exists based on officerNo and email (unique)
      const existingUser = await userModel.findOne({
        $or: [{ officerNo }, { email }],
      });
      
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists with this officer number or email' });
      }
      
      // Create a new user
      const newUser = new userModel({
        officerNo,
        officerName,
        email,
        password,  


        
      });
  
      // Save the new user to the database
      await newUser.save();
  
      // Create a token (JWT) for the user
      const token = jwt.sign(
        { id: newUser._id },
        process.env.JWT_SECRET,  // Ensure you set your JWT secret in an environment variable
        { expiresIn: '1h' }
      );
  
      // Send response with the token
      res.status(201).json({ message: 'User created successfully', token });
    } catch (error) {
      console.error('Error during signup:', error);  // Add more specific error logging
      if (error.name === 'ValidationError') {
        return res.status(400).json({ message: 'Validation error: ' + error.message });
      }
      res.status(500).json({ message: 'Server error' });
    }
  };

// Login logic
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await userModel.findOne({ email });  // Fixed this line to use userModel
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Compare the password with the hashed password in the database
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create a token (JWT) for the user
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,  // Ensure you set your JWT secret in an environment variable
      { expiresIn: '1h' }
    );

    // Send response with the token
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
