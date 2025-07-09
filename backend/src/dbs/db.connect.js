const Database = require("./db.instance");

async function connectWithRetry(retries = 10, delay = 2000) {
  const db = Database.getInstance();

  for (let i = 0; i < retries; i++) {
    try {
      await db.authenticate();
      console.log("Sequelize connected");
      return db;
    } catch (err) {
      console.error(
        `DB connect failed (attempt ${i + 1}/${retries}):`,
        err.message
      );
      if (i === retries - 1) {
        process.exit(1);
      }
      await new Promise((res) => setTimeout(res, delay));
    }
  }
}

module.exports = connectWithRetry;
