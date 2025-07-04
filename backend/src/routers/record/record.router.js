const express = require("express");
const recordController = require("../../controllers/record.controller");
const recordRouter = express.Router();
recordRouter.get("/records", recordController.getAllRecords);
recordRouter.post("/records", recordController.createNewRecord);
module.exports = recordRouter;
