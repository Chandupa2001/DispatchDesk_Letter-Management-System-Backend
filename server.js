import express from 'express'
import cors from 'cors'
import { connectDB } from './config/db.js';
import letterRouter from './routes/letterRouter.js';
import accountRouter from './routes/accountsRouter.js';
import establishmentRouter from './routes/establishmentRouter.js';
import surveyingRouter from './routes/surveyingRouter.js';
import recordRoomRouter from './routes/recordRoomRouter.js';
import authRoutes from './routes/authRoutes.js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();
// app config
const app = express();
const port = 4000

// middleware
app.use(express.json())
app.use(cors({ origin: "http://localhost:3000" }));


// db connection
connectDB();

// api endpoints

app.use("/api/letter", letterRouter)
app.use("/api/accounts", accountRouter)
app.use("/api/establishment", establishmentRouter)
app.use("/api/surveying", surveyingRouter)
app.use("/api/recordRoom", recordRoomRouter)
app.use("/api/letter", letterRouter);
app.use('/api/auth', authRoutes);

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong, please try again later.' });
  });
  
  // Start the server
  app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
  });