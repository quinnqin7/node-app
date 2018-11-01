import request from '@/utils/request'

export function getEnterprises(doctorToken) {
    return request({
        url: '/api/doctor/getEnterprises',
        method: 'post',
        data:{
            token:doctorToken
        }
    })
}

export function doctorToGetPatients(enterpriseId) {
    return request({
        url: '/api/doctor/doctorToGetPatients',
        method: 'post',
        data:{
            enterpriseId:enterpriseId
        }
    })
}


export function getEnterprise(enterpriseId) {
    return request({
        url: '/api/doctor/getEnterprise',
        method: 'post',
        data:{
            enterpriseId:enterpriseId
        }
    })
}

//getDoctorInfo
export function getDoctorInfo(doctorId) {
    return request({
        url: '/api/doctor/getDoctorInfo',
        method: 'post',
        data:{
            doctorId:doctorId
        }
    })
}

export function modifyDoctorInfo(doctorData){
    return request({
        url: '/api/doctor/modifyDoctorInfo',
        method: 'post',
        data:{
            doctorData:doctorData
        }
    })

}



//getDoctorMessage

export function getDoctorMessage(doctorId){
    return request({
        url: '/api/doctor/getDoctorMessage',
        method: 'post',
        data:{
            doctorId:doctorId
        }
    })
}

//getAgree
export function getAgree(doctorServiceTimeId, messageId,enterpriseId){
    return request({
        url: '/api/doctor/getAgree',
        method: 'post',
        data:{
            doctorServiceTimeId:doctorServiceTimeId,
            messageId:messageId,
            enterpriseId:enterpriseId
        }
    })
}

//setRefuse
export function setRefuse(messageId){
    return request({
        url: '/api/doctor/setRefuse',
        method: 'post',
        data:{
            messageId:messageId,
        }
    })
}


export function DoctorTogetDoctorAndServiceTime(doctorId){
    return request({
        url: '/api/doctor/DoctorTogetDoctorAndServiceTime',
        method: 'post',
        data:{
            doctorId:doctorId
        }
    })
}

//DoctorToGetEnterprise

export function DoctorToGetEnterprise(enterpiseArray){
    return request({
        url: '/api/doctor/DoctorToGetEnterprise',
        method: 'post',
        data:{
            enterpiseArray:enterpiseArray
        }
    })
}
