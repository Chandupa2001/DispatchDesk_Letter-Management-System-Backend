import express from 'express'
import { fectchRecords, fectchRegRecords, getActionTakenRecords, recordActionTaken } from '../controllers/recordRoomController.js';

const recordRoomRouter = express.Router();

recordRoomRouter.get("/getRegistered", fectchRegRecords);
recordRoomRouter.get("/getNormal", fectchRecords);
recordRoomRouter.post("/actionTaken", recordActionTaken);
recordRoomRouter.get("/getActionRecord", getActionTakenRecords);

export default recordRoomRouter;