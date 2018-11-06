import request from '@/utils/request'
import {getToken} from '@/utils/auth'
export function getPatients() {
  return request({
    url: '/api/enterprise/patients',
    method: 'post',
    data:{
        token:getToken()
    }
  })
}

export function getPatient(patientId) {
    return request({
        url: '/api/enterprise/patient',
        method: 'post',
        data:{
            id:patientId
        }
    })
}

export function createPatient(patientData,enterpriseId) {
    return request({
        url: '/api/enterprise/createPatient',
        method: 'post',
        data:{
            patientData:patientData,
            enterpriseId:enterpriseId
        }
    })
}

export function updatePatient(patientData, enterpriseId, doctorId) {
    return request({
        url: '/api/enterprise/updatePatient',
        method: 'post',
        data:{
            patientData:patientData,
            enterpriseId:enterpriseId,
            doctorId:doctorId,
        }
    })
}


//getEnterpriseInfo

export function getEnterpriseInfo(enterpriseId) {
    return request({
        url: '/api/enterprise/getEnterpriseInfo',
        method: 'post',
        data:{
            enterpriseId:enterpriseId,
        }
    })
}

//modifyEnterpriseInfo
export function modifyEnterpriseInfo(enterpriseData){
    return request({
        url: '/api/enterprise/modifyEnterpriseInfo',
        method: 'post',
        data:{
            enterpriseData:enterpriseData
        }
    })

}

export function getDoctorAndServiceTime(doctorId){
    return request({
        url: '/api/enterprise/getDoctorAndServiceTime',
        method: 'post',
        data:{
            doctorId:doctorId
        }
    })
}

export function getDoctors(){
    return request({
        url: '/api/enterprise/getDoctors',
        method: 'post',
        data:{

        }
    })
}

//enterpriseAppointmentDoctor

export function enterpriseAppointmentDoctor(doctorServiceTimeIdArray,enterpriseId){
    return request({
        url: '/api/enterprise/enterpriseAppointmentDoctor',
        method: 'post',
        data:{
            doctorServiceTimeIdArray:doctorServiceTimeIdArray,
            enterpriseId:enterpriseId
        }
    })
}



//sendMessageToDoctor

export function sendMessageToDoctor(doctorId,doctorServiceTimeIdArray,enterpriseId,mainContent){
    return request({
        url: '/api/enterprise/sendMessageToDoctor',
        method: 'post',
        data:{
            doctorId:doctorId,
            doctorServiceTimeIdArray:doctorServiceTimeIdArray,
            enterpriseId:enterpriseId,
            mainContent:mainContent
        }
    })
}

//getRefuseData

export function getRefuseData(enterpriseId){
    return request({
        url: '/api/enterprise/getRefuseData',
        method: 'post',
        data:{
            enterpriseId:enterpriseId,
        }
    })
}


//getSignData

export function getSignData(enterpriseId){
    return request({
        url: '/api/enterprise/getSignData',
        method: 'post',
        data:{
            enterpriseId:enterpriseId,
        }
    })
}

//sign

export function Sign(sign,doctorServiceTimeId){
    return request({
        url: '/api/enterprise/sign',
        method: 'post',
        data:{
            doctorServiceTimeId:doctorServiceTimeId,
            sign:sign
        }
    })
}

//enterprisesToGetDoctor
export function enterprisesToGetDoctor(enterpriseId){
    return request({
        url: '/api/enterprise/enterprisesToGetDoctor',
        method: 'post',
        data:{
            enterpriseId:enterpriseId,
        }
    })
}


//fetchNoHandleAppointmentData

export function fetchNoHandleAppointmentData(enterpriseId){
    return request({
        url: '/api/enterprise/fetchNoHandleAppointmentData',
        method: 'post',
        data:{
            enterpriseId:enterpriseId,
        }
    })
}


//Search
export function Search(searchSelect,searchInput,token){
    return request({
        url: '/api/enterprise/Search',
        method: 'post',
        data:{
            searchSelect:searchSelect,
            searchInput:searchInput,
            token:token,
        }
    })
}
