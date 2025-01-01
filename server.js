import express from 'express'
import cors from 'cors'
import { connectDB } from './config/db.js';
import letterRouter from './routes/letterRouter.js';

// app config
const app = express();
const port = 4000

// middleware
app.use(express.json())
app.use(cors())


// db connection
connectDB();

// api endpoints
app.use("/api/letter", letterRouter)


app.listen(port, ()=>{
    console.log(`Server Started on http://localhost:${port}`)
})