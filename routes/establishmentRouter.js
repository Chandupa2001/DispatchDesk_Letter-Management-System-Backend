import express from 'express'
import { fectchRecords, fectchRegRecords } from '../controllers/establishmentController.js';

const establishmentRouter = express.Router();

establishmentRouter.get("/getRegistered", fectchRegRecords);
establishmentRouter.get("/getNormal", fectchRecords);

export default establishmentRouter;