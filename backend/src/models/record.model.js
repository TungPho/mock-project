const { DataTypes } = require("sequelize");
const Database = require("../dbs/db.instance");

const sequelize = Database.getInstance();

const Record = sequelize.define(
  "Record",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    temperature: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    contact_with_covid: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Record;
