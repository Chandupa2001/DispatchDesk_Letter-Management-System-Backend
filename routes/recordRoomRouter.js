import express from 'express'
import { fectchRecords, fectchRegRecords } from '../controllers/recordRoomController.js';

const recordRoomRouter = express.Router();

recordRoomRouter.get("/getRegistered", fectchRegRecords);
recordRoomRouter.get("/getNormal", fectchRecords);

export default recordRoomRouter;