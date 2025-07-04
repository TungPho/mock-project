const express = require("express");
const recordRouter = require("./record/record.router");

const router = express.Router();
router.use("/api/v1", recordRouter);
module.exports = router;
