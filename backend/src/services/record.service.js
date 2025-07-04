const { Record, Symptom } = require("../models");

class RecordService {
  static getAllRecords = async () => {
    const records = await Record.findAll({
      include: [{ model: Symptom, as: "Symptoms" }],
      order: [["createdAt", "DESC"]],
    });
    return records;
  };
  static createRecord = async (
    name,
    temperature,
    contact_with_covid,
    symptoms
  ) => {
    const newRecord = await Record.create(
      {
        name,
        temperature,
        contact_with_covid,
        Symptoms: symptoms,
      },
      {
        include: [{ model: Symptom, as: "Symptoms" }],
      }
    );
    return newRecord;
  };
}
module.exports = RecordService;
