import accountsModel from "../models/AccountsModel.js";
import letterModel from "../models/letterModel.js";

const modelMap = {
    accounts: accountsModel,
};

const addLetter = async (req,res) => {
    const {date, refNo, company, subject, section, officerNo, postType} = req.body;
    try {
        // Checking is letter already exists
        const exists = await letterModel.findOne({refNo})
        if (exists) {
            return res.json({success: false, message: "Letter already exists"})
        }
        const newLetter = new letterModel({
            date: date,
            refNo: refNo,
            company: company,
            subject: subject,
            section: section,
            officerNo: officerNo,
            postType: postType,
        })

        await newLetter.save();
        res.json({success: true, message: "Letter added successfully"})
    } catch (error) {
        console.error(error)
        res.json({success: false, message: "Error"})
    }
}

const approveLetter = async (req,res) => {
    const { refNo, note } = req.body;
    try {
        const record = await letterModel.findOneAndUpdate({refNo}, {note})

        const targetTable = record.section.toLowerCase();

        const targetModel = modelMap[targetTable];
        
        const newRecord = new targetModel(record.toObject());
        await newRecord.save();

        await letterModel.deleteOne({ refNo });

        res.json({ success: true, message: "Letter approved and moved successfully" });
    } catch (error) {
        console.error(error);
        res.json({success: false, message: "Error"});
    }
}

export { addLetter, approveLetter }