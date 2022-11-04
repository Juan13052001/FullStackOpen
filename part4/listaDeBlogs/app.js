const config = require("./utils/config");
const express = require("express");
require("express-async-errors");
const app = express();
const blogsRouter = require("./controllers/blog");
const userRouter = require("./controllers/user");
const middleware = require("./utils/middleware");
const mongoose = require("mongoose");
const logger = require("./utils/logger");
const cors = require("cors");
logger.info("Connecting to ", config.MONGODB_URI);

mongoose
    .connect(config.MONGODB_URI)
    .then(() => {
        logger.info("Conectado a MongoDB");
    })
    .catch((err) => logger.error(err.message));

app.use(cors());
app.use(express.static("build"));
app.use(express.json());
app.use(middleware.requestLogger);
app.use("/api/blogs", blogsRouter);
app.use("/api/users", userRouter);
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
