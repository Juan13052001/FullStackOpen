import axios from "axios";
const baseUrl = "/api/persons";

const getAll = async () => {
    const request = axios.get(baseUrl);
    const resp = await request;
    return resp.data;
};

const create = async (newContact) => {
    const request = axios.post(baseUrl, newContact);
    const response = await request;
    return response.data;
};

const deleteContact = async (id) => {
    const request = axios.delete(`${baseUrl}/${id}`);
    const resp = await request;
    return resp.data;
};

const update = async (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject);
    const response = await request;
    return response.data;
};

export default {
    getAll,
    create,
    deleteContact,
    update,
};
