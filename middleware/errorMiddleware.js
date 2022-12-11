const { CustomErrorHandler } = require("../errors/index");
const { StatusCodes } = require("http-status-codes");

const errorMiddleware = (err, req, res, next) => {
    if (err instanceof CustomErrorHandler) {
        console.log(`custom error middleware -> ${err}`);

        //controller error goes here, err.message is different in the 2 instance
        return res.status(err.statusCode).json({
            success: false,
            data: err.message,
        });
    }
    console.log(`server error middleware -> ${err}`);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        //db error goes here
        success: false,
        data: err.message.split(":")[2] || "Unknown error occurred",
    });
};

module.exports = { errorMiddleware };
