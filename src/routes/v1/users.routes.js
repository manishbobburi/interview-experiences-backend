const express = require("express");
const router = express.Router();

const { userController } = require("../../controllers");
const { authMiddleware } = require("../../middleware")

router.post("/signup", 
    userController.signUp
);

router.post("/signin",
    userController.signIn
);

router.get("/me",
    authMiddleware.checkAuth,
    userController.getMe
)

router.patch("/",
    authMiddleware.checkAuth,
    userController.updateUserDetails
)

router.post("/change-password",
    authMiddleware.checkAuth,
    userController.changePassword
)

module.exports = router;