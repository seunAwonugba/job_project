const mongoose = require("mongoose");

const JobsSchema = new mongoose.Schema(
    {
        company: {
            type: String,
            required: [true, "provide company name"],
        },
        position: {
            type: String,
            required: [true, "provide job position"],
        },
        status: {
            type: String,
            required: ["interview", "declined", "pending"],
            default: "pending",
        },
        createdBy: {
            type: mongoose.Types.ObjectId,
            ref: "userModel",
            required: [true, "Jobs cannot be created without a user"],
        },
    },
    { timestamps: true }
);

const jobsModel = mongoose.model("jobsModel", JobsSchema);

module.exports = { jobsModel };
