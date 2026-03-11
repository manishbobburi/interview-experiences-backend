const express = require("express");
const router = express.Router();

const { companyController } = require("../../controllers");
const { companyMiddleware } = require("../../middleware");
const { authMiddleware, authorizeMiddleware } = require("../../middleware");
const ROLES = require("../../utils/constants/roles");

router.get("/",
    authMiddleware.checkAuth,
    authorizeMiddleware.authorizeRoles(ROLES.USER, ROLES.ADMIN),
    companyController.getCompanies
)

router.post("/",
    authMiddleware.checkAuth,
    authorizeMiddleware.authorizeRoles(ROLES.ADMIN),
    companyMiddleware.validateAddCompanies,
    companyController.addCompanies
)

module.exports = router;