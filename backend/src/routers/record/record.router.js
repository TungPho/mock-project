const express = require("express");
const recordController = require("../../controllers/record.controller");
const validateRecord = require("../../middlewares/validate.record");
const recordRouter = express.Router();
recordRouter.get("/records", recordController.getAllRecords);
recordRouter.post("/records", validateRecord, recordController.createNewRecord);
module.exports = recordRouter;
