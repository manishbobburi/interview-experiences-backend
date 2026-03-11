const { StatusCodes } = require("http-status-codes");
const { AppError } = require("../utils/error");

function authorizeRoles(...allowedRoles) {
    return (req, res, next)  => {
        try {
            const user = req.user;

            if(!user) {
                throw new AppError(
                    "User not authenticated",
                    StatusCodes.UNAUTHORIZED,
                    "USER_NOT_AUTHENTICATED"
                );
            }

            if(!allowedRoles.includes(user.roleId)) {
                throw new AppError(
                    "You are not authorized to access this resource",
                    StatusCodes.FORBIDDEN,
                    "FORBIDDEN"
                )
            }

            next();
        } catch (err) {
            next(err);
        }
    }
}

module.exports = {
    authorizeRoles,
}