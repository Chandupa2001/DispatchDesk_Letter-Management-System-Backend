import express from 'express';
import { fectchRecords, fectchRegRecords, getActionTakenRecords, recordActionTaken } from '../controllers/establishmentController.js';

const establishmentRouter = express.Router();

establishmentRouter.get("/getRegistered", fectchRegRecords);
establishmentRouter.get("/getNormal", fectchRecords);
establishmentRouter.post("/actionTaken", recordActionTaken);
establishmentRouter.get("/getActionRecord", getActionTakenRecords);


export default establishmentRouter;