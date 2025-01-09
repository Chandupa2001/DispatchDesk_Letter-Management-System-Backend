import express from 'express'
import { fectchRecords, fectchRegRecords, getActionTakenRecords, recordActionTaken } from '../controllers/accountsController.js';

const accountRouter = express.Router();

accountRouter.get("/getRegistered", fectchRegRecords);
accountRouter.get("/getNormal", fectchRecords);
accountRouter.post("/actionTaken", recordActionTaken);
accountRouter.get("/getActionRecord", getActionTakenRecords);

export default accountRouter;