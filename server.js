import express from 'express'
import cors from 'cors'
import { connectDB } from './config/db.js';
import letterRouter from './routes/letterRouter.js';
import accountRouter from './routes/accountsRouter.js';
import establishmentRouter from './routes/establishmentRouter.js';
import surveyingRouter from './routes/surveyingRouter.js';
import recordRoomRouter from './routes/recordRoomRouter.js';

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
app.use("/api/accounts", accountRouter)
app.use("/api/establishment", establishmentRouter)
app.use("/api/surveying", surveyingRouter)
app.use("/api/recordRoom", recordRoomRouter)

app.listen(port, ()=>{
    console.log(`Server Started on http://localhost:${port}`)
})