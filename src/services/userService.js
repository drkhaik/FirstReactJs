import axios from "../axios";

const handleLoginAPI = (userEmail, userPassword) => {
    return axios.post('/api/login', { email: userEmail, password: userPassword });
}

const getAllUsers = (inputId) => {
    // template string
    return axios.get(`/api/getUsers?id=${inputId}`);
}

const createNewUserService = (data) => {
    console.log('check data from service', data);
    return axios.post(`/api/createUser`, data)

}
const editUserService = (data) => {
    // console.log('check data from service', data);
    return axios.put(`/api/editUser`, data)
}

const deleteUserService = (userId) => {
    return axios.delete(`/api/deleteUser`, { data: { id: userId } })
}

const getAllCodeService = (inputType) => {
    return axios.get(`/api/allcode?type=${inputType}`);
}

const getOutstandingDoctorService = (limit) => {
    return axios.get(`/api/getOutstandingDoctor?limit=${limit}`);
}

const getAllDoctorService = () => {
    return axios.get(`/api/getAllDoctor`);
}

const saveInfoDoctorService = (data) => {
    return axios.post(`/api/saveInfoDoctor`, data)
}

const getDetailInfoDoctorService = (id) => {
    return axios.get(`/api/get-detail-doctor-by-id?id=${id}`);
}

const getDetailSectionDoctorService = (id) => {
    return axios.get(`/api/get-detail-section-doctor?id=${id}`);
}

const saveScheduleInfoService = (data) => {
    return axios.post(`/api/save-schedule-info`, data);
}

// export khac nodejs
export {
    handleLoginAPI,
    getAllUsers,
    createNewUserService,
    deleteUserService,
    editUserService,
    getAllCodeService,
    getOutstandingDoctorService,
    getAllDoctorService,
    saveInfoDoctorService,
    getDetailInfoDoctorService,
    getDetailSectionDoctorService,
    saveScheduleInfoService,
}