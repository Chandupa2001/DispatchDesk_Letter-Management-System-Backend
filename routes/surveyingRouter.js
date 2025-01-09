import express from 'express'
import { fectchRecords, fectchRegRecords, getActionTakenRecords, recordActionTaken } from '../controllers/surveyingController.js';

const surveyingRouter = express.Router();

surveyingRouter.get("/getRegistered", fectchRegRecords);
surveyingRouter.get("/getNormal", fectchRecords);
surveyingRouter.post("/actionTaken", recordActionTaken);
surveyingRouter.get("/getActionRecord", getActionTakenRecords);

export default surveyingRouter;