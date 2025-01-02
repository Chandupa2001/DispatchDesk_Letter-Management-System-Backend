import mongoose from "mongoose";

const letterSchema = new mongoose.Schema({
    date: {type: String, required: true},
    refNo: {type: String, required: true},
    company: {type: String, required: true},
    subject: {type: String, required: true},
    section: {type: String, required: true},
    officerNo: {type: String, required: true},
    postType: {type: String, required: true},
    note: {type: String, required: false}
})

const letterModel = mongoose.models.approvals || mongoose.model("approvals", letterSchema);

export default letterModel;