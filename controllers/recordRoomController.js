import recordRoomModel from "../models/recordRoomModel.js";

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

export { fectchRegRecords, fectchRecords }