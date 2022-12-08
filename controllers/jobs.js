const { StatusCodes } = require("http-status-codes");
const {} = require("../db/models/user");

const createJob = async (req, res) => {
    res.status(StatusCodes.CREATED).json({
        success: true,
        data: "job successfully created",
    });
};

const getJobs = async (req, res) => {
    //access req.user form authmiddleware
    res.status(StatusCodes.OK).json({
        success: true,
        data: req.user,
    });
};

const getJob = async (req, res) => {
    res.status(StatusCodes.OK).json({
        success: true,
        data: "job fetched successfully",
    });
};

const updateJob = async (req, res) => {
    res.status(StatusCodes.CREATED).json({
        success: true,
        data: "job updated successfully",
    });
};

const deleteJob = async (req, res) => {
    res.status(StatusCodes.OK).json({
        success: true,
        data: "job successfully deleted",
    });
};

module.exports = { createJob, getJobs, getJob, updateJob, deleteJob };
