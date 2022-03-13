import axios from "axios";
export function request(config) {

    //第二种方式

    const instance = axios.create({
        baseURL: "http://localhost",
        timeout: 5000
    })

    //axios拦截器
    //请求拦截
    instance.interceptors.request.use(config => {

            //1,比如config中的一些信息不符合服务器的要求
            //2，比如发送网络请求，希望在页面显示一个请求的图标
            //3，某些请求（比如登录 token），必须携带某些信息
            //放行
            return config;
        }, err => {

        })
        //响应拦截
    instance.interceptors.response.use(res => {

            return res.data
        }, err => {
          return Promise.reject(new Error("fail"));
        })
        //发送真正的网络请求*/
    return instance(config)
}