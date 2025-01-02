import mongoose from "mongoose";

const establishmentSchema = new mongoose.Schema({
    date: {type: String, required: true},
    refNo: {type: String, required: true},
    company: {type: String, required: true},
    subject: {type: String, required: true},
    section: {type: String, required: true},
    officerNo: {type: String, required: true},
    postType: {type: String, required: true},
    note: {type: String, required: false},
    action: {type: String, required: false}
})

const establishmentModel = mongoose.models.establishment || mongoose.model("establishment", establishmentSchema);

export default establishmentModel;