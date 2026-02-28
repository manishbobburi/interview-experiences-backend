const { StatusCodes } = require("http-status-codes");
const { AppError } = require("../utils/error");

function validateCreatePost(req, res, next) {
    const userId = req.userId;

    if(!userId) {
        throw new AppError(
            'Unauthorized', 
            StatusCodes.UNAUTHORIZED, 
            'USERID_REQUIRED'
        );
    }

    const difficultyMap = {
        'Easy': 1,
        'Easy-Medium': 2,
        'Medium': 3,
        'Medium-Hard': 4,
        'Hard': 5,
    };

    const validators = {
        company: v => 
            typeof v === 'string' && v.trim().length >= 2,

        role: v => 
            typeof v === 'string' && v.trim().length >= 2,

        difficulty: v => 
            ['Easy', 'Easy-Medium', 'Medium', 'Medium-Hard', 'Hard'].includes(v),

        summary: v => 
            typeof v === 'string' && v.trim().length >= 10,
    };

    const invalidFields = Object.entries(validators)
        .filter(([field, validate]) => !validate(req.body[field]))
        .map(([field]) => field);

    if (invalidFields.length) {
        return next(
            new AppError(
                { message: 'Validation failed', invalidFields },
                StatusCodes.BAD_REQUEST
            )
        );
    }

    req.validatedBody = {
        userId,
        company: req.body.company.trim(),
        role: req.body.role.trim(),
        body: req.body.summary.trim(),
        overallDifficulty:difficultyMap[req.body.difficulty],
        isAnonymous: Boolean(req.body.isAnonymous),
    };

    next();
}

module.exports = {
    validateCreatePost,
}