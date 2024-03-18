import axios from "./axios";

export const fetchAllUser = (page) => {
    return axios.get(`/api/users?page=${page}`);
}

export const postCreateUser = (name, job) => {
    return axios.post("/api/users", { name, job });
}

export const putUpdateUser = (name, job) => {
    return axios.put("/api/users/2", { name, job });
}

export const deleteUser = (id) => {
    return axios.delete(`/api/users/${id}`);
}

export const loginApi = (email, password) => {
    return axios.post("/api/login", { email, password });
}
