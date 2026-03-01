const express = require("express");
const router = express.Router();

const { companyController } = require("../../controllers");

router.get("/", 
    companyController.getCompanies
)

module.exports = router;