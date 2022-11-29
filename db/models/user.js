const mongoose = require("mongoose");
const validator = require("validator");
const uniqueValidator = require("mongoose-unique-validator");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
    },
    email: {
        type: String,
        required: [true, "Email address is required"],
        validate: [validator.default.isEmail, "Invalid email address"],
        unique: true,
        uniqueCaseInsensitive: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        validate: [
            validator.default.isStrongPassword,
            "Password minimum length must be 8, must contain 1 lowercase,  must contain 1 uppercase, must contain 1 number, and must contain 1 symbol ",
        ],
    },
});

UserSchema.plugin(uniqueValidator, {
    message: "'{VALUE}', already exist",
});

const userModel = mongoose.model("userModel", UserSchema);

module.exports = { userModel };
