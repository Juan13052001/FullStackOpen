import axios from "axios";
const baseUrl = "http://localhost:3003/api/blogs";

let token = null;

const setToken = (newToken) => {
    token = `bearer ${newToken}`;
};

const getAll = () => {
    const request = axios.get(baseUrl);
    return request.then((response) => response.data);
};

const create = async (newBlog) => {
    const config = {
        headers: { Authorization: token },
    };

    const response = await axios.post(baseUrl, newBlog, config);

    return response.data;
};

const update = async (id, newBlog) => {
    const resp = await axios.put(`${baseUrl}/${id}`, newBlog);
    return resp.data;
};

const remove = async (blog) => {
    const config = {
        headers: { Authorization: token },
    };

    const response = await axios.delete(`${baseUrl}/${blog.id}`, config);
    return response.data;
};
export default { getAll, create, update, setToken, remove };
