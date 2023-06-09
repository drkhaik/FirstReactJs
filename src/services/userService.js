import axios from "../axios";
// import { useSelector } from 'react-redux';


const handleLoginAPI = (userEmail, userPassword) => {
    return axios.post('/api/login', { email: userEmail, password: userPassword });
}

const getAllUsers = (inputId) => {
    return axios.get(`/api/getUsers?id=${inputId}`);
    // axios.get(webApiUrl, { headers: {"Authorization" : `Bearer ${tokenStr}`} } );
}

const createNewUserService = (data) => {
    // console.log('check data from service', data);
    // console.log('check data from service', data.token);
    // return axios.post(`/api/createUser`, data, { headers: { 'Content-Type': 'application/json', "Authorization": `Bearer ${data.token}` } })
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

const getScheduleInfoByDateService = (doctorId, date) => {
    return axios.get(`/api/get-schedule-info-by-date?doctorId=${doctorId}&date=${date}`)
}

const getExtraInfoDoctorByIdService = (doctorId) => {
    return axios.get(`/api/get-extra-info-doctor-by-id?doctorId=${doctorId}`)
}

const getProfileDoctorByIdService = (doctorId) => {
    return axios.get(`/api/get-profile-doctor-by-id?doctorId=${doctorId}`)
}
const bookAnAppointmentService = (data) => {
    return axios.post(`/api/patient-book-an-appointment`, data);
}

const verifyAnAppointmentService = (data) => {
    return axios.post(`/api/verify-an-appointment`, data);
}

const createNewSpecialtyService = (data) => {
    return axios.post(`/api/create-new-specialty`, data);
}

const getAllSpecialtyService = () => {
    return axios.get(`/api/get-all-specialty`);
}

const getAllSpecialtyNameService = () => {
    return axios.get(`/api/get-all-specialty-name`);
}

const getDetailSpecialtyByIdService = (data) => {
    return axios.get(`/api/get-detail-specialty-by-id?id=${data.id}&location=${data.location}`);
}

const deleteSpecialtyByIdService = (id) => {
    return axios.get(`/api/delete-specialty-by-id?id=${id}`);
}


const createNewClinicService = (data) => {
    return axios.post(`/api/create-new-clinic`, data);
}

const getAllClinicService = () => {
    return axios.get(`/api/get-all-clinic`);
}

const getAllClinicNameService = () => {
    return axios.get(`/api/get-all-clinic-name`);
}

const getDetailClinicByIdService = (data) => {
    return axios.get(`/api/get-detail-clinic-by-id?id=${data.id}`);
}

const deleteClinicByIdService = (id) => {
    return axios.get(`/api/delete-clinic-by-id?id=${id}`);
}

const getAddressClinicByDoctorIdService = (doctorId) => {
    return axios.get(`/api/get-address-clinic-by-doctorId?doctorId=${doctorId}`)
}

const getListPatientForDoctor = (data) => {
    return axios.get(`/api/get-list-patient-for-doctor?doctorId=${data.doctorId}&date=${data.date}`)
}

const saveCompletedStatusService = (data) => {
    return axios.put(`/api/save-completed-status`, data)
}

const createNewHandbookService = (data) => {
    return axios.post(`/api/create-new-handbook`, data);
}

const getAllHandbookService = () => {
    return axios.get(`/api/get-all-handbook`);
}

const getDetailHandbookByIdService = (data) => {
    return axios.get(`/api/get-detail-handbook-by-id?id=${data.id}`);
}

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
    getScheduleInfoByDateService,
    getExtraInfoDoctorByIdService,
    getProfileDoctorByIdService,
    bookAnAppointmentService,
    verifyAnAppointmentService,
    createNewSpecialtyService,
    getAllSpecialtyService,
    getAllSpecialtyNameService,
    getDetailSpecialtyByIdService,
    deleteSpecialtyByIdService,

    createNewClinicService,
    getAllClinicService,
    getAllClinicNameService,
    getDetailClinicByIdService,
    deleteClinicByIdService,
    getAddressClinicByDoctorIdService,

    getListPatientForDoctor,
    saveCompletedStatusService,

    createNewHandbookService,
    getAllHandbookService,
    getDetailHandbookByIdService,
}