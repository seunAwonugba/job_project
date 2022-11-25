const { StatusCodes } = require("http-status-codes");

const register = async (req, res) => {
    res.status(StatusCodes.OK).json({
        success: true,
        data: "Registration successful",
    });
};

const login = async (req, res) => {
    res.status(StatusCodes.OK).json({
        success: true,
        data: "Login successful",
    });
};

module.exports = { login, register };
