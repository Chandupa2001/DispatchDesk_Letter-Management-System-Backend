import express from 'express'
import { fectchRecords, fectchRegRecords } from '../controllers/surveyingController.js';

const surveyingRouter = express.Router();

surveyingRouter.get("/getRegistered", fectchRegRecords);
surveyingRouter.get("/getNormal", fectchRecords);

export default surveyingRouter;