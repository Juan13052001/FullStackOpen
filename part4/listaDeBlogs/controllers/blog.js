const blogsRouter = require("express").Router();

const Blog = require("../models/blogs");
const User = require("../models/user");

blogsRouter.get("/", async (req, res) => {
    const blogs = await Blog.find({});

    res.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
    const body = request.body;

    const user = await User.findById(body.userId);

    const blog = new Blog({
        title: body.title,
        author: body.author,
        likes: body.likes,
        url: body.url,
        user: user._id,
    });

    const savedBlog = await blog.save();

    user.blogs = user.blogs.concat(savedBlog._id);

    await user.save()

    response.status(201).json(savedBlog);
});

blogsRouter.get("/:id", async (req, res) => {
    const id = req.params.id;
    const respuesta = await Blog.findById(id);
    if (respuesta) {
        res.json(respuesta);
    } else {
        res.status(404).end();
    }
});

blogsRouter.put("/:id", async (req, res) => {
    const updateBlog = await Blog.findById(req.params.id, req.body, {
        new: true,
    });
    res.json(updateBlog);
});

blogsRouter.delete("/:id", async (req, res) => {
    const id = req.params.id;
    await Blog.findByIdAndRemove(id);
    res.status(204).end();
});

module.exports = blogsRouter;
