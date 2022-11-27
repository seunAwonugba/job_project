const { StatusCodes } = require("http-status-codes");
const { userModel } = require("../db/models/user");

const register = async (req, res) => {
    res.status(StatusCodes.CREATED).json({
        success: true,
        data: req.body,
    });
};

const login = async (req, res) => {
    res.status(StatusCodes.CREATED).json({
        success: true,
        data: "Login successful",
    });
};

module.exports = { login, register };
