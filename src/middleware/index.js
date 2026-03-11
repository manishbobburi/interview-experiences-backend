module.exports = {
    errorHandler: require("./error.middleware"),
    authMiddleware: require("./auth.middleware"),
    postMiddleware: require("./post.middlewares"),
    companyMiddleware: require("./company.middlewares"),
    authorizeMiddleware: require("./authorize.middleware"),
};