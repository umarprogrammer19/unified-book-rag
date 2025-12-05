import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config"
import { pool } from "../db.js";


const router = express.Router();

// Signup Route
router.post('/signup', async (req, res) => {
  const { email, password, softwareBackground, hardwareBackground } = req.body;

  if (!email || !password || !softwareBackground || !hardwareBackground) {
    return res.status(400).json({ message: 'Please fill in all fields' });
  }

  try {
    // Check if the user already exists
    const userQuery = 'SELECT * FROM users WHERE email = $1';
    const userResult = await pool.query(userQuery, [email]);

    if (userResult.rows.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Store the new user in the database
    const insertQuery = `
      INSERT INTO users (email, password, software_background, hardware_background)
      VALUES ($1, $2, $3, $4)
      RETURNING *`;

    const result = await pool.query(insertQuery, [email, hashedPassword, softwareBackground, hardwareBackground]);

    const newUser = result.rows[0];

    // Create JWT
    const token = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ token, user: newUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Signin Route
router.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Please fill in all fields' });
  }

  try {
    // Check if the user exists
    const userQuery = 'SELECT * FROM users WHERE email = $1';
    const userResult = await pool.query(userQuery, [email]);

    if (userResult.rows.length === 0) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const user = userResult.rows[0];

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create JWT
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
