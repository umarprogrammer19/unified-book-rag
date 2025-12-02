import express from 'express';
import 'dotenv/config';
import { betterAuth } from './auth.js';
import { signUpEmail, signInEmail } from 'better-auth/api';
import { toNodeHandler } from 'better-auth/node';

const app = express();
app.use(express.json());

// Integrate betterAuth middleware 
app.all('/api/auth/*splat', toNodeHandler(betterAuth.handler));

// Define API routes
app.post('/auth/register', toNodeHandler(signUpEmail));
app.post('/auth/login', toNodeHandler(signInEmail));

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
