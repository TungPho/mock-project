const app = require("./src/app");
const connectWithRetry = require("./src/dbs/db.connect");

const PORT = Number(process.env.NODE_DOCKER_PORT) || 8080;

(async () => {
  const db = await connectWithRetry();
  await db.sync({ alter: true });

  const server = app.listen(PORT, () => {
    console.log(`Server listening on :${PORT}`);
  });
})();
