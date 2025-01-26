import express from 'express'
import { addLetter, approveLetter, fectchLetters, searchLetters } from '../controllers/letterController.js';

const letterRouter = express.Router();

letterRouter.post("/add", addLetter);
letterRouter.post("/approve", approveLetter);
letterRouter.get("/get", fectchLetters);
letterRouter.post("/search", searchLetters);

export default letterRouter;