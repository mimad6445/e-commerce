const AppError = require("../utils/AppError");
const httpStatusText = require("../utils/httpStatusText");

module.exports = (...roles) => {
    return (req, res, next) => {
        console.log("roles ", roles);
        console.log(req.currentuser)
        if (!req.currentuser || !roles.includes(req.currentuser.role)) {
            const error = AppError.create("Not Authorized", 401, httpStatusText.UNAUTHORIZED);
            return next(error);
        } else {
            next();
        }
    };
};
