const express = require("express");
const app = express();
require("express-async-errors");
const port = 3000;
const host = "localhost";
const { StatusCodes, ReasonPhrases } = require("http-status-codes");

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        data: "Home screen",
    });
});

app.all("*", (req, res) => {
    res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        data: ReasonPhrases.NOT_FOUND,
    });
});

app.listen(port, host, () => {
    console.log(`Server is listening on http://${host}:${port}`);
});
