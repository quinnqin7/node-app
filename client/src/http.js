import axios from 'axios';
import {Message, Loading} from 'element-ui';
import router from './router';

let loading;
function startLoading(){
    loading = Loading.service({
        lock:true,
        text:'拼命加載中...',
        background:'rgba(0,0,0,0,7)'
    });
}

function endLoading(){
    loading.close();
}

//请求拦截
axios.interceptors.request.use(config =>{
    //加載動畫
    startLoading();
    if(localStorage.eleToken){
        //设置统一的请求header
        config.headers.Authorization = localStorage.eleToken;
    }
    return config;
},error =>{
    return Promise.reject(error)
});

//响应拦截
axios.interceptors.response.use(response =>{
    //結束加載動畫
    endLoading();
    return response;
},error => {
    //錯誤提醒
    endLoading();
    Message.error(error.response.data);

    //获取错误状态码
    const { status } = error.response;
    if(status == 401){
        Message.error('token失效，請重新登錄!');
        //清除Tooken
        localStorage.removeItem('eleToken');
        //跳轉到登錄頁面
        router.push('/login');
    }

    return Promise.reject(error);
});


export default axios;
