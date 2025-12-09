import express from "express";
import "dotenv/config";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import translationRoutes from "./routes/translation.js";

const app = express();
const port = process.env.PORT;

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json()); 

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/translate', translationRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
