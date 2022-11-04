const express = require("express");
const config = require("./utils/config");
const app = express();
const cors = require("cors");
const blogsRouter = require("./controllers/blog");
const middleware = require("./utils/middleware");
const logger = require("./utils/logger");
const mongoose = require("mongoose");

logger.info("Connecting to ", config.MONGODBURI);

mongoose
    .connect(config.MONGODBURI)
    .then(() => {
        logger.info("Conectado a MongoDB");
    })
    .catch((err) => logger.error(err.message));

app.use("/api/blogs", blogsRouter);
app.use(cors());
// app.use(express.static("build"));
app.use(express.json());
app.use(middleware.requestLogger);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
