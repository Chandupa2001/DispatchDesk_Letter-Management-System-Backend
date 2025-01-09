import recordRoomModel from "../models/recordRoomModel.js";
import actionTakenModel from "../models/actionTakenModel.js";

const fectchRegRecords = async (req,res) => {
    try {
        const type = "Registered Post";
        const records = await recordRoomModel.find({ postType: type });
        res.json({success: true, data: records})
    } catch (error) {
        console.error(error);
        res.json({success: false, message: error})
    }
}

const fectchRecords = async (req,res) => {
    try {
        const type = "Normal Post";
        const records = await recordRoomModel.find({ postType: type });
        res.json({success: true, data: records})
    } catch (error) {
        console.error(error);
        res.json({success: false, message: error})
    }
}

const recordActionTaken = async (req, res) => {
    const { refNo, actionTaken } = req.body;
  
    // Validate input
    if (!refNo || !actionTaken) {
      return res.status(400).json({ success: false, message: "Ref No. and Action Taken are required" });
    }
  
    try {
      console.log("Incoming Ref No:", refNo);
  
      // Find the record by Ref No in the letterModel
      const record = await recordRoomModel.findOne({ refNo });
  
      if (!record) {
        return res.status(404).json({ success: false, message: "Record not found" });
      }
  
      // Save the record along with the actionTaken in the actionTakenModel
      const actionTakenRecord = new actionTakenModel({
        date: record.date,
        refNo: record.refNo,
        company: record.company,
        subject: record.subject,
        section: record.section,
        officerNo: record.officerNo,
        postType: record.postType,
        actionTaken, // Save the actionTaken text
      });
  
      await actionTakenRecord.save();
  
      // Delete the record from the letterModel
      await recordRoomModel.deleteOne({ refNo });
  
      res.status(200).json({ success: true, message: "Action recorded and record moved successfully" });
    } catch (error) {
      console.error("Error processing action:", error);
      res.status(500).json({ success: false, message: "Error processing action" });
    }
  };

  const getActionTakenRecords = async (req, res) => {
    try {
      // Fetch all records from actionTakenModel
      const records = await actionTakenModel.find();
  
      if (!records || records.length === 0) {
        return res.status(404).json({ success: false, message: "No records found" });
      }
  
      res.status(200).json({ success: true, data: records });
    } catch (error) {
      console.error("Error fetching action taken records:", error);
      res.status(500).json({ success: false, message: "Error fetching records" });
    }
  };

export { fectchRegRecords, fectchRecords, getActionTakenRecords, recordActionTaken }