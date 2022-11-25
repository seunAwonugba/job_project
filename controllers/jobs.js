const { StatusCodes } = require("http-status-codes");

const createJob = async (req, res) => {
    res.status(StatusCodes.OK).json({
        success: true,
        data: "job successfully created",
    });
};

const getJobs = async (req, res) => {
    res.status(StatusCodes.OK).json({
        success: true,
        data: "jobs fetched successfully",
    });
};

const getJob = async (req, res) => {
    res.status(StatusCodes.OK).json({
        success: true,
        data: "job fetched successfully",
    });
};

const updateJob = async (req, res) => {
    res.status(StatusCodes.OK).json({
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
