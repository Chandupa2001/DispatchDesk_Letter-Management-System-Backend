import express from 'express'
import { fectchRecords, fectchRegRecords } from '../controllers/accountsController.js';

const accountRouter = express.Router();

accountRouter.get("/getRegistered", fectchRegRecords);
accountRouter.get("/getNormal", fectchRecords);

export default accountRouter;