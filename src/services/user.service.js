const { StatusCodes } = require("http-status-codes");
const bcrypt = require("bcrypt");

const { AppError } = require("../utils/error");
const { UserRepository } = require("../repositories");
const { Auth } = require("../utils/common");
const { ServerConfig } = require("../config");

const userRepository = new UserRepository();

async function signUp(data) {
    try {
        const user = await userRepository.create(data);
        
        const { passwordHash: _, createdAt, updatedAt, ...safeUser } = user.dataValues;

        return {...safeUser};
    } catch (err) {
        if (err.name === "SequelizeValidationError") {
            throw new AppError(
                err.errors.map(e => e.message),
                StatusCodes.BAD_REQUEST,
                "VALIDATION_ERROR"
            );
        }

        if (err.name === "SequelizeUniqueConstraintError") {
            const messages = err.errors.map(e => {
                if (e.path === "email") return "Email already exists";
                return e.message;
            });

            throw new AppError(
                messages,
                StatusCodes.CONFLICT,
                "UNIQUE_CONSTRAINT"
            );
        }

        throw new AppError(
            "Failed to create user",
            StatusCodes.INTERNAL_SERVER_ERROR
        );
    }
}


async function signIn({ email, passwordHash }) {
    const user = await userRepository.getUserByEmail(email);

    if (!user) {
        throw new AppError(
            "User not found",
            StatusCodes.NOT_FOUND,
            "USER_NOT_FOUND"
        );
    }

    const isValid = Auth.checkPassword(passwordHash, user.passwordHash);
    if (!isValid) {
        throw new AppError(
            "Invalid password",
            StatusCodes.UNAUTHORIZED,
            "INVALID_CREDENTIALS"
        );
    }

    const token = Auth.createToken({
        id: user.id, 
        email: user.email,
        roleId: user.roleId,
    });

    const safeUser = {
        id: user.id,
        name: user.name,
        email: user.email,
        roleId: user.roleId,
        verified: user.verified,
        role: user.role,
    };

    return {
        user: safeUser,
        token: token,
    };
}


async function isAuthenticated(token) {
    if (!token) {
        throw new AppError(
            "JWT token missing",
            StatusCodes.BAD_REQUEST,
            "TOKEN_MISSING"
        );
    }

    let payload;
    try {
        payload = Auth.verifyToken(token);
    } catch (err) {
        if (err.name === "TokenExpiredError") {
            throw new AppError(
                "JWT token expired",
                StatusCodes.UNAUTHORIZED,
                "TOKEN_EXPIRED"
            );
        }

        throw new AppError(
            "Invalid JWT token",
            StatusCodes.UNAUTHORIZED,
            "INVALID_TOKEN"
        );
    }

    const user = await userRepository.get(payload.id);
    if (!user) {
        throw new AppError(
            "User not found",
            StatusCodes.NOT_FOUND,
            "USER_NOT_FOUND"
        );
    }

    const safeUser = {
        id: user.id,
        email: user.email,
        roleId: user.roleId,
    };

    return safeUser;
}

async function getMe(email) {
    const user = await userRepository.getUserByEmail(email);
    if (!user) {
        throw new AppError(
            "User not found",
            StatusCodes.NOT_FOUND,
            "USER_NOT_FOUND"
        );
    }

    const { passwordHash: _, createdAt, updatedAt, ...safeUser } =
        user.dataValues;

    return { user: {...safeUser} };
}

async function updateUserDetails(id, data) {
    try {
        const response = await userRepository.update(id, data);

        const { passwordHash: _, createdAt, updatedAt, ...safeUser } =
        response.dataValues;

        return { user: {...safeUser} };
    } catch (err) {
        throw err;
    }
}

async function changePassword(userId, passwords) {
    const user = await userRepository.get(userId);

    if (!user) {
        throw new AppError(
            "User not found",
            StatusCodes.NOT_FOUND,
            "USER_NOT_FOUND"
        );
    }

    const isMatch = await bcrypt.compare(
        passwords.oldPassword, 
        user.passwordHash
    );

    if(!isMatch) throw new AppError(
        "Incorrect old password", 
        StatusCodes.UNAUTHORIZED, 
        "INVALID_OLD_PASSWORD"
    );

    const samePassword = await bcrypt.compare(
        passwords.newPassword,
        user.passwordHash
    );

    if (samePassword) {
        throw new AppError(
            "New password cannot be same as old",
            StatusCodes.BAD_REQUEST,
            "PASSWORD_SAME"
        );
    }

    const newHash = await bcrypt.hash(
        passwords.newPassword, 
        Number(ServerConfig.SALT_ROUNDS)
    );

    return await userRepository.update(userId, { passwordHash: newHash });
}


module.exports = {
    signUp,
    signIn,
    isAuthenticated,
    getMe,
    updateUserDetails,
    changePassword,
}