import mongoose from "mongoose";

const letterSchema = new mongoose.Schema({
    Date: {type: String, required: true},
    RefNo: {type: String, required: true},
    Company: {type: String, required: true},
    Subject: {type: String, required: true},
    MovedTo: {type: String, required: true},
    OfficerNo: {type: String, required: true},
    Type: {type: String, required: true},
    Note: {type: String, required: false}
})

const letterModel = mongoose.models.approvals || mongoose.model("approvals", letterSchema);

export default letterModel;