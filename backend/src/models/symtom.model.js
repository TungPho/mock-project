const { DataTypes } = require("sequelize");
const Database = require("../dbs/db.instance");

const sequelize = Database.getInstance();

const Symptom = sequelize.define(
  "Symptom",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    symptom_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    record_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Records",
        key: "id",
      },
      onDelete: "CASCADE",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Symptom;
