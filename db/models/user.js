const mongoose = require("mongoose");
const validator = require("validator");
const uniqueValidator = require("mongoose-unique-validator");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

console.log(process.env.JWT_LIFETIME);

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

UserSchema.pre("save", async function () {
    //before saving this document, hash and salt password
    this.password = await bcryptjs.hash(this.password, 12);
});

UserSchema.methods.createJWT = function () {
    return jwt.sign(
        {
            id: this.id,
            name: this.name,
            email: this.email,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_LIFETIME,
        }
    );
};

const userModel = mongoose.model("userModel", UserSchema);

module.exports = { userModel };
