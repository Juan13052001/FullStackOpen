import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import Togglable from "./components/Togglable";
import blogService from "./services/blogs";
import loginService from "./services/login";
const App = () => {
    const [blogs, setBlogs] = useState([]);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState(null);
    const [error, setError] = useState(false);
    const [message, setMessage] = useState("");
    const [loginVisible, setLoginVisible] = useState(false);
    const toggableBlogFormRef = useRef();

    useEffect(() => {
        blogService.getAll().then((blogs) => setBlogs(blogs));
    }, [blogs]);

    useEffect(() => {
        const loggedUserJSON = localStorage.getItem("loggedBlogAppUser");

        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON);
            setUser(user);
            blogService.setToken(user.token);
        }
    }, []);

    const handleUsernameChange = ({ target }) => setUsername(target.value);

    const handlePasswordChange = ({ target }) => setPassword(target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const user = await loginService.login({ username, password });
            blogService.setToken(user.token);
            localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));

            setUser(user);
            setUsername("");
            setPassword("");
        } catch (error) {
            setError(true);
            setMessage(`${error.message}`);
        }
    };

    const addBlog = async (blog) => {
        try {
            const newBlog = await blogService.create(blog);
            setBlogs(blogs.concat(newBlog));
            toggableBlogFormRef.current.toggleVisibility();
            return true;
        } catch (error) {
            setError(true);
            setMessage(`${error.message}`);
        }
    };

    const cerrarSesion = () => {
        localStorage.removeItem("loggedBlogAppUser");
        setUser(null);
    };
    return (
        <div>
            <h1>Blogs</h1>

            {user === null ? (
                <Togglable buttonLabel="login">
                    <LoginForm
                        username={username}
                        password={password}
                        handlePasswordChange={handlePasswordChange}
                        handleUsernameChange={handleUsernameChange}
                        handleSubmit={handleSubmit}
                    />
                </Togglable>
            ) : (
                <div>
                    <p>{user.name} logged</p>
                    <button type="button" onClick={cerrarSesion}>
                        Salir
                    </button>
                    <Togglable buttonLabel="Create a new note" ref={toggableBlogFormRef}>
                        <BlogForm addBlog={addBlog} />
                    </Togglable>
                    <div>
                        <h1>Lista de Blogs</h1>
                        {blogs.map((blog) => (
                            <Blog key={blog.id} blog={blog} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default App;
