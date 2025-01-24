import accountsModel from "../models/AccountsModel.js";
import actionTakenModel from "../models/actionTakenModel.js";
import establishmentModel from "../models/establishmentModel.js";
import letterModel from "../models/letterModel.js";
import recordRoomModel from "../models/recordRoomModel.js";
import surveyingModel from "../models/surveyingModel.js";

const modelMap = {
    establishment: establishmentModel,
    surveying: surveyingModel,
    accounts: accountsModel,
    recordRoom: recordRoomModel
};

const addLetter = async (req,res) => {
    const {date, refNo, company, subject, section, officerNo, postType} = req.body;
    try {
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

const approveLetter = async (req, res) => {
    const { refNo, note } = req.body;
    try {
        const record = await letterModel.findOneAndUpdate(
            { refNo },
            { note },
            { new: true }
        );

        if (!record) {
            return res.json({ success: false, message: "Letter not found" });
        }

        // Map section value to a model key
        const sectionToModelMap = {
            'Record Room': 'recordRoom',
            'Surveying': 'surveying',
            'Accounts': 'accounts',
            'Establishment': 'establishment',
        };

        const targetTableKey = sectionToModelMap[record.section];
        const targetModel = modelMap[targetTableKey];

        const newRecord = new targetModel({ ...record.toObject(), note });
        await newRecord.save();

        await letterModel.deleteOne({ refNo });

        res.json({ success: true, message: "Letter approved and moved successfully" });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Error" });
    }
};

const fectchLetters = async (req,res) => {
    try {
        const letters = await letterModel.find({});
        res.json({success: true, data: letters})
    } catch (error) {
        console.error(error);
        res.json({success: false, message: error})
    }
}

const searchLetters = async (req, res) => {
    const { query } = req.body; 

    try {
        // Check if query is a valid string
        if (!query || typeof query !== 'string') {
            return res.status(400).json({ success: false, message: "Invalid search query" });
            console.log("Invalid search query")
        }

        console.log(query);

        // Define a filter criteria using the search query
        const filterCriteria = {
            $or: [
                { refNo: { $regex: query, $options: 'i' } },
                { company: { $regex: query, $options: 'i' } },
                { subject: { $regex: query, $options: 'i' } }
            ]
        };

        // Fetch data from all the models using the defined criteria
        const accountsData = await accountsModel.find(filterCriteria).lean();
        const actionsTakenData = await actionTakenModel.find(filterCriteria).lean();
        const establishmentsData = await establishmentModel.find(filterCriteria).lean();
        const lettersData = await letterModel.find(filterCriteria).lean();
        const recordRoomData = await recordRoomModel.find(filterCriteria).lean();
        const surveyingData = await surveyingModel.find(filterCriteria).lean();

        // Combine results from all models
        const combinedResults = [
            ...accountsData.map(doc => ({ ...doc, source: 'Accounts' })),
            ...actionsTakenData.map(doc => ({ ...doc, source: 'ActionsTaken' })),
            ...establishmentsData.map(doc => ({ ...doc, source: 'Establishments' })),
            ...lettersData.map(doc => ({ ...doc, source: 'Letters' })),
            ...recordRoomData.map(doc => ({ ...doc, source: 'RecordRoom' })),
            ...surveyingData.map(doc => ({ ...doc, source: 'Surveying' }))
        ];

        res.json({ success: true, data: combinedResults });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to fetch data.' });
    }
};



export { addLetter, approveLetter, fectchLetters, searchLetters }