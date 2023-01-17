const express = require("express");
const app = express();
require("express-async-errors");
const port = 8080;
const host = "localhost";
const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const { authRouter } = require("./router/auth");
const { jobsRouter } = require("./router/jobs");
require("dotenv").config();
const { connectDataBase } = require("./db/connect");
const { errorMiddleware } = require("./middleware/errorMiddleware");
const { authMiddleware } = require("./middleware/authMiddleware");
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");

const swaggerDocument = YAML.load("./swagger.yaml");

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
app.set("trust proxy", 1);
app.use(limiter);
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());

app.use("/api/v1/jobs/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api/v1/jobs/auth/", authRouter);
app.use("/api/v1/jobs/", authMiddleware, jobsRouter);

app.all("*", async (req, res) => {
    res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        data: ReasonPhrases.NOT_FOUND,
    });
});

app.use(errorMiddleware);

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
