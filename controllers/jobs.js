const { StatusCodes } = require("http-status-codes");
const { jobsModel } = require("../db/models/jobs");
// const { userModel } = require("../db/models/user");
const { BadRequest, NotFound } = require("../errors");

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
    const getJobsByUser = await jobsModel
        .find({
            createdBy: req.user.id,
        })
        .sort("createdAt");
    res.status(StatusCodes.OK).json({
        success: true,
        data: getJobsByUser,
        count: getJobsByUser.length,
    });
};

const getJob = async (req, res, next) => {
    const { id } = req.params;

    const getJob = await jobsModel.findById(id);

    if (getJob) {
        res.status(StatusCodes.OK).json({
            success: true,
            data: getJob,
        });
    } else {
        return next(new NotFound("Job not found"));
    }
};

const updateJob = async (req, res, next) => {
    // const { id } = req.params;

    const {
        user: { id: userId },
        params: { id: pathId },
    } = req;

    req.body.createdBy = userId;

    const body = req.body;

    const options = {
        new: true,
        runValidators: true,
        overwrite: true,
        context: "query",
    };

    const updateJob = await jobsModel.findByIdAndUpdate(pathId, body, options);

    if (updateJob) {
        res.status(StatusCodes.CREATED).json({
            success: true,
            data: updateJob,
        });
    } else {
        return next(new NotFound("Job not found, and cannot be updated"));
    }
};

const deleteJob = async (req, res) => {
    res.status(StatusCodes.OK).json({
        success: true,
        data: "job successfully deleted",
    });
};

// const getUserJobs = async (req, res) => {
//     const getUserJobs = await jobsModel
//         .find({
//             createdBy: req.user.id,
//         })
//         .sort("createdAt");
//     res.status(StatusCodes.OK).json({
//         success: true,
//         data: getUserJobs,
//         count: getUserJobs.length,
//     });
// };

module.exports = {
    createJob,
    getJobs,
    getJob,
    updateJob,
    deleteJob,
    // getUserJobs,
};
