const express = require("express");
const jobsRouter = express.Router();
const {
    createJob,
    getJobs,
    getJob,
    updateJob,
    deleteJob,
} = require("../controllers/jobs");

jobsRouter.post("/", createJob);
jobsRouter.get("/", getJobs);
jobsRouter.get("/:id", getJob);
jobsRouter.patch("/:id", updateJob);
jobsRouter.delete("/:id", deleteJob);

module.exports = { jobsRouter };
