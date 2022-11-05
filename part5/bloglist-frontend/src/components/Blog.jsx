import React from "react";

const Blog = ({ blog }) => {
    return (
        <div>
            <h2>Title: {blog.title}</h2>
            <p>Author: {blog.author}</p>
            <p>URL: {blog.url}</p>
            <p>Likes: {blog.likes}</p>
        </div>
    );
};

export default Blog;
