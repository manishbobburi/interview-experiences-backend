const router = require("express").Router();
const { authController } = require("../../controllers");
const { rateLimitMiddleware } = require("../../middleware");

router.get("/verify-email", 
    authController.verifyEmail
);

router.post("/resend-verification", 
    rateLimitMiddleware.resendVerificationLimiter, 
    authController.resendVerification
);

module.exports = router;