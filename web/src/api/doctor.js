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
