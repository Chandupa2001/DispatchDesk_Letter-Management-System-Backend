import mongoose from "mongoose";

const actionTakenSchema = new mongoose.Schema({
  refNo: { type: String, required: true, unique: true }, // Unique Ref No
  date: { type: String, required: true }, // Date of the record
  company: { type: String, required: true }, // Company name
  subject: { type: String, required: true }, // Subject/Title
  officerNo: { type: String, required: true }, // Officer in charge// Description of the action taken
  section: { type: String, required: true }, // Section handling the record
  postType: { type: String, required: true },
  actionTaken: { type: String, required: true },  // Type of the post
});

const actionTakenModel = mongoose.models.actionTaken || mongoose.model("actionTaken", actionTakenSchema);

export default actionTakenModel;
