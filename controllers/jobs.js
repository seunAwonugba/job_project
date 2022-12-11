const { StatusCodes } = require("http-status-codes");
const { jobsModel } = require("../db/models/jobs");
const { BadRequest } = require("../errors");

const createJob = async (req, res) => {
    //by default,if u dont pass created by value in your payload, this will get it for u, from the req.user in auth middleware
    req.body.createdBy = req.user.id;
    const createJob = await jobsModel.create(req.body);
    res.status(StatusCodes.CREATED).json({
        success: true,
        data: createJob,
    });
};

const getJobs = async (req, res) => {
    //access req.user form auth middleware
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
