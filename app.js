const express = require("express");
const app = express();
require("express-async-errors");
const port = 3000;
const host = "localhost";
const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const { router } = require("./router/router");

app.use(express.json());
app.use("/api/v1/", router);

app.all("*", (req, res) => {
    res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        data: ReasonPhrases.NOT_FOUND,
    });
});

const startServer = async () => {
    try {
        app.listen(port, host, () => {
            console.log(`Server is listening on http://${host}:${port}`);
        });
    } catch (error) {
        console.log(`An error occurred while trying to start server: ${error}`);
    }
};

startServer();
