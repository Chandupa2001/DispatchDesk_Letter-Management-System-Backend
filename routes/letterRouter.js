import express from 'express'
import { addLetter, approveLetter } from '../controllers/letterController.js';

const letterRouter = express.Router();

letterRouter.post("/add", addLetter);
letterRouter.post("/approve", approveLetter);

export default letterRouter;