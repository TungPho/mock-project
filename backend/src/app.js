require("dotenv").config();
const express = require("express");
const router = require("./routers/main.router");
const cors = require("cors");

const app = express();
app.use(cors({ origin: process.env.CLIENT_ORIGIN }));
app.use(express.json());
app.use(router);

module.exports = app;
