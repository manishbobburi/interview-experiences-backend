const { StatusCodes } = require("http-status-codes");
const { AppError } = require("../utils/error");

function validateCreatePost(req, res, next) {
    // const validators = {
    //     userId: v => typeof v === 'string' || 'number' && v.trim() !== '',
    //     company: v => typeof v === 'string' && v.trim().length >= 2,
    //     role: v => typeof v === 'string' && v.trim() !== '',
    //     difficulty: v => ['Easy', 'Medium', 'Hard'].includes(v),
    //     summary: v => typeof v === 'string' && v.trim().length >= 10,
    // };

    // const invalidFields = Object.entries(validators)
    //     .filter(([field, validate]) => !validate(req.body[field]))
    //     .map(([field]) => field);

    // if (invalidFields.length) {
    //     return next(
    //         new AppError(
    //             { message: 'Validation failed', invalidFields },
    //             StatusCodes.BAD_REQUEST
    //         )
    //     );
    // }


    req.validatedBody = {
        ...req.body,
        body: req.body.summary,
        overallDifficulty: req.body.difficulty === "Medium" ? 2 : 1,
    };

    next();
}

module.exports = {
    validateCreatePost,
}