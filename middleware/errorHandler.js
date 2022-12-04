const { CustomErrorHandler } = require("../errors/index");
const { StatusCodes } = require("http-status-codes");

const errorHandler = (err, req, res, next) => {
    console.log(err);
    if (err instanceof CustomErrorHandler) {
        //controller error goes here, err.message is different in the 2 instance
        return res.status(err.statusCode).json({
            success: false,
            data: err.message,
        });
    }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        //db error goes here
        success: false,
        data: err.message.split(":")[2] || "Unknown error occurred",
    });
};

module.exports = { errorHandler };
