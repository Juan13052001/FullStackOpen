import { useState } from "react";

const BlogForm = ({ addBlog }) => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [url, setUrl] = useState("");
    const [likes, setLikes] = useState("");

    const onSubmit = (e) => {
        e.preventDefault();
        const success = addBlog({ title, author, url, likes });
        if (success) {
            setTitle("");
            setAuthor("");
            setUrl("");
            setLikes("");
        }
    };

    return (
        <div>
            <h2>Create new Blog</h2>
            <form onSubmit={onSubmit}>
                <div>
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        value={title}
                        onChange={({ target }) => setTitle(target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="author">Author</label>
                    <input
                        type="text"
                        name="author"
                        id="author"
                        value={author}
                        onChange={({ target }) => setAuthor(target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="url">Url</label>
                    <input
                        type="text"
                        name="url"
                        id="url"
                        value={url}
                        onChange={({ target }) => setUrl(target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="likes">Likes</label>
                    <input
                        type="number"
                        name="likes"
                        id="likes"
                        value={likes}
                        onChange={({ target }) => setLikes(target.value)}
                    />
                </div>
                <button type="submit">Create</button>
            </form>
        </div>
    );
};
export default BlogForm;
