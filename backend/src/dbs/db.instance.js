const { Sequelize } = require("sequelize");
class Database {
  static getInstance = () => {
    if (!this.dbInstance) {
      this.dbInstance = new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PASSWORD,
        {
          host: process.env.DB_HOST,
          port: process.env.DB_PORT,
          dialect: "mysql",
          logging: false,
        }
      );
    }
    return this.dbInstance;
  };
}
module.exports = Database;
