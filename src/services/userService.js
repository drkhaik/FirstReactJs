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
    getScheduleInfoByDateService,
    getExtraInfoDoctorByIdService,
    getProfileDoctorByIdService,
    bookAnAppointmentService,
    verifyAnAppointmentService,
    createNewSpecialtyService,
    getAllSpecialtyService,
    getDetailSpecialtyByIdService,
    deleteSpecialtyByIdService,

    createNewClinicService,
    getAllClinicService,
    getDetailClinicByIdService,
    deleteClinicByIdService,
    getAddressClinicByDoctorIdService,
    getListPatientForDoctor,
    saveCompletedStatusService,
}