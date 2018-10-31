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

//getDoctorAndServiceTime
