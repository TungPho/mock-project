const RecordService = require("../services/record.service");
class RecordController {
  getAllRecords = async (req, res) => {
    try {
      const records = await RecordService.getAllRecords();
      return res.status(200).json({
        message: "Get all records success",
        records,
      });
    } catch (error) {
      res.json(error);
    }
  };
  createNewRecord = async (req, res) => {
    const { name, temperature, contact_with_covid, symptoms } = req.body;

    if (!name || !temperature || typeof contact_with_covid === "undefined") {
      return res.status(400).json({ error: "Lack of information" });
    }
    try {
      const newRecord = await RecordService.createRecord(
        name,
        temperature,
        contact_with_covid,
        symptoms
      );
      return res.status(201).json({
        message: "Created new record success",
        record: newRecord,
      });
    } catch (error) {
      res.json(error);
    }
  };
}
module.exports = new RecordController();
