import express from "express";
import "dotenv/config";
import authRoutes from "./routes/auth.js";

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json()); 

// Routes
app.use('/api/auth', authRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
