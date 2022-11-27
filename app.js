const express = require("express");
const app = express();
require("express-async-errors");
const port = 3000;
const host = "localhost";
const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const { authRouter } = require("./router/auth");
const { jobsRouter } = require("./router/jobs");
require("dotenv").config();
const { connectDataBase } = require("./db/connect");
const { errorHandler } = require("./middleware/errorHandler");

app.use(express.json());

app.use("/api/v1/jobs/auth/", authRouter);
app.use("/api/v1/jobs/", jobsRouter);

app.all("*", async (req, res) => {
    res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        data: ReasonPhrases.NOT_FOUND,
    });
});

app.use(errorHandler);

const startServer = async (connectionString) => {
    try {
        await connectDataBase(connectionString);
        app.listen(port, host, () => {
            console.log(`Server is listening on http://${host}:${port}`);
        });
    } catch (error) {
        console.log(`An error occurred while trying to start server: ${error}`);
    }
};

startServer(process.env.MONGO_DB_CONNECTION_STRING);
