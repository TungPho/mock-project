const Record = require("./record.model");
const Symptom = require("./symtom.model");

// 1 Record có nhiều Symptom
Record.hasMany(Symptom, {
  foreignKey: "record_id",
  as: "Symptoms",
  onDelete: "CASCADE",
});

// 1 Symptom thuộc về 1 Record
Symptom.belongsTo(Record, {
  foreignKey: "record_id",
  as: "Record",
});

module.exports = {
  Record,
  Symptom,
};
