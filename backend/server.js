const express = require("express");
require("dotenv").config();
const cors = require("cors");
const connectWithRetry = require("./src/dbs/db.connect");
const PORT = Number(process.env.NODE_DOCKER_PORT) || 8080;

const router = require("./src/routers/main.router");

const app = express();
app.use(cors({ origin: process.env.CLIENT_ORIGIN }));
app.use(express.json());
app.use(router);

(async () => {
  const db = await connectWithRetry();
  await db.sync({ alter: true });

  app.listen(PORT, () => {
    console.log(`Server listening on :${PORT}`);
  });
})();
