const blogsRouter = require("express").Router();

const Blog = require("../models/blogs");

const logger = require("../utils/logger");

blogsRouter.get("/", (req, res) => {
    Blog.find({}).then((blogs) => res.json(blogs));
});

blogsRouter.post("/", (req, res) => {
    const blog = new Blog(req.body);

    blog.save().then((result) => res.status(201).json(result));
});

blogsRouter.get("/:id", (req, res) => {
    const id = req.params.id;

    Blog.findById(id)
        .then((blog) => res.json(blog))
        .catch((err) => logger.error(err));
});

module.exports = blogsRouter;
