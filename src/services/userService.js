import axios from "../axios";

const handleLoginAPI = (userEmail, userPassword) => {
    return axios.post('/api/login', { email: userEmail, password: userPassword });
}

const getAllUsers = (inputId) => {
    // template string
    return axios.get(`/api/getUsers?id=${inputId}`);
}

const createNewUserSevices = (data) => {
    console.log('check data from service', data);
    return axios.post(`/api/createUser`, data)

}
const editUserSevices = (data) => {
    // console.log('check data from service', data);
    return axios.put(`/api/editUser`, data)
}

const deleteUserSevices = (userId) => {
    return axios.delete(`/api/deleteUser`, { data: { id: userId } })
}

// export khac nodejs
export { handleLoginAPI, getAllUsers, createNewUserSevices, deleteUserSevices, editUserSevices }