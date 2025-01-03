import express from 'express'
import { addLetter, approveLetter, fectchLetters } from '../controllers/letterController.js';

const letterRouter = express.Router();

letterRouter.post("/add", addLetter);
letterRouter.post("/approve", approveLetter);
letterRouter.get("/get", fectchLetters);

export default letterRouter;