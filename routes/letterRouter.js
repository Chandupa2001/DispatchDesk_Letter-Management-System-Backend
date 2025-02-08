import express from 'express'
import { addLetter, approveLetter, fectchLetters, fectchUsers, searchLetters } from '../controllers/letterController.js';

const letterRouter = express.Router();

letterRouter.post("/add", addLetter);
letterRouter.post("/approve", approveLetter);
letterRouter.get("/get", fectchLetters);
letterRouter.post("/search", searchLetters);
letterRouter.get("/getUsers", fectchUsers);

export default letterRouter;