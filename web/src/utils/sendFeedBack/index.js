import {sendfeedback} from "../../api/comm";

export function sendFeedBack(content){
    sendfeedback(content).then(()=>{
        this.$notify({
            title: '发送',
            message: '发送成功',
            type: 'success',
            duration: 2000
        })
    }).catch(()=>{
        this.$notify({
            title: '发送',
            message: '发送失败',
            type: 'error',
            duration: 2000
        })
    })
}
