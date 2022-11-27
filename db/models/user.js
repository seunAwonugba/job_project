const mongoose = require("mongoose");
const validator = require("validator");

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
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        validate: [
            validator.default.isStrongPassword,
            "Minimum length is 8, must contain 1 lowercase,  must contain 1 uppercase, must contain 1 number, and must contain 1 symbol ",
        ],
    },
});

const userModel = mongoose.model("userModel", UserSchema);

module.exports = { userModel };
