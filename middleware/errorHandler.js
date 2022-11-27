const { CustomErrorHandler } = require("../errors/CustomErrorHandler");
const { StatusCodes, ReasonPhrases } = require("http-status-codes");

const errorHandler = (err, req, res, next) => {
    if (err instanceof CustomErrorHandler) {
        return res.status(err.statusCode).json({
            success: false,
            data: err.message,
        });
    }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        data: ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
};

module.exports = { errorHandler };