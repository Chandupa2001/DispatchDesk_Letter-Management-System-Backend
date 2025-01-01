import letterModel from "../models/letterModel.js";

const addLetter = async (req,res) => {
    const {Date, RefNo, Company, Subject, MovedTo, OfficerNo, Type} = req.body;
    try {
        // Checking is letter already exists
        const exists = await letterModel.findOne({RefNo})
        if (exists) {
            return res.json({success: false, message: "Letter already exists"})
        }
        const newLetter = new letterModel({
            Date: Date,
            RefNo: RefNo,
            Company: Company,
            Subject: Subject,
            MovedTo: MovedTo,
            OfficerNo: OfficerNo,
            Type: Type,
        })

        await newLetter.save();
        res.json({success: true, message: "Letter added successfully"})
    } catch (error) {
        console.error(error)
        res.json({success: false, message: "Error"})
    }
}

export { addLetter }