const { StatusCodes } = require("http-status-codes");
const { userModel } = require("../db/models/user");
const { BadRequest, Unauthenticated } = require("../errors/index");

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

    //create token the moment u create user
    const token = createUser.createJWT();
    res.status(StatusCodes.CREATED).json({
        success: true,
        data: {
            id: createUser.id,
            name: createUser.name,
            email: createUser.email,
        },
        token,
    });
};

const login = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email) {
        return next(new BadRequest("Email address is required"));
    }

    if (!password) {
        return next(new BadRequest("Password is required"));
    }

    //if both input fields are not empty query db
    const findUser = await userModel.findOne({ email });

    if (!findUser) {
        return next(
            new Unauthenticated("Sorry we could not find this credential")
        );
    }

    const token = findUser.createJWT();

    res.status(StatusCodes.OK).json({
        success: true,
        data: {
            id: findUser.id,
            name: findUser.name,
            email: findUser.email,
        },
        token,
    });
};

module.exports = { login, register };
