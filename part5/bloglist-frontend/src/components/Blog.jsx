import React, { useState } from "react";

const Blog = ({ blog, updateBlog, deleteBlog, userId }) => {
    const [visible, setVisible] = useState(false);

    console.log(blog.likes);

    const hiddenVisible = { display: visible ? "none" : "" };

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: "solid",
        borderWidth: 2,
        marginBottom: 5,
        borderRadius: 10,
        padding: 15,
    };

    const updateLinks = () => {
        const updatedBlog = {
            ...blog,
            likes: blog.likes + 1,
        };
        updateBlog(updatedBlog);
    };

    return (
        <div style={blogStyle} className="blog">
            <div>
                <h2>Title: {blog.title}</h2>
                <p>Author: {blog.author}</p>
                <button type="button" onClick={(e) => setVisible(!visible)}>
                    {!visible ? "View" : "Hidden"}
                </button>
            </div>
            {visible && (
                <div>
                    <p>URL: {blog.url}</p>
                    <p>Likes: {blog.likes}</p>
                    <button id="likes-btn" type="button" onClick={updateLinks}>
                        Likes
                    </button>
                    <br />

                    <button id="delete" onClick={() => deleteBlog(blog)}>
                        delete
                    </button>
                </div>
            )}
        </div>
    );
};

export default Blog;
