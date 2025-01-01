import express from 'express'
import { addLetter } from '../controllers/letterController.js';

const letterRouter = express.Router();

letterRouter.post("/add", addLetter);

export default letterRouter;