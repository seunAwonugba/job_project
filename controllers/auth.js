const { StatusCodes } = require("http-status-codes");
const { userModel } = require("../db/models/user");
const { BadRequest } = require("../errors/index");

const register = async (req, res, next) => {
    const { name, email, password } = req.body;
    if (!name) {
        return next(new BadRequest("Name is required"));
    }
    if (!email) {
        return next(new BadRequest("Email address is required"));
    }
    if (!password) {
        return next(new BadRequest("Password is required"));
    }
    const createUser = await userModel.create({ ...req.body });
    res.status(StatusCodes.CREATED).json({
        success: true,
        data: createUser,
    });
};

const login = async (req, res) => {
    res.status(StatusCodes.CREATED).json({
        success: true,
        data: "Login successful",
    });
};

module.exports = { login, register };
