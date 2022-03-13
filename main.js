import App from './App'
import uView from '@/uni_modules/uview-ui'
import axios from 'axios'
Vue.use(uView)
// #ifndef VUE3
import Vue from 'vue'
import store from "store/index.js"
Vue.config.productionTip = false
Vue.prototype.$store = store
App.mpType = 'app'
const app = new Vue({
    store,
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif
// 跨域请求适配小程序和app
axios.defaults.adapter = function(config) {

    return new Promise((resolve, reject) => {

        var settle = require('axios/lib/core/settle');

        var buildURL = require('axios/lib/helpers/buildURL');

        uni.request({

            method: config.method.toUpperCase(),

            url: config.baseURL + buildURL(config.url, config.params, config.paramsSerializer),

            header: config.headers,

            data: config.data,

            dataType: config.dataType,

            responseType: config.responseType,

            sslVerify: config.sslVerify,

            complete: function complete(response) {

                

                response = {

                    data: response.data,

                    status: response.statusCode,

                    errMsg: response.errMsg,

                    header: response.header,

                    config: config

                };

 

                settle(resolve, reject, response);

            }

        })

    })

}
// 全局封装弹窗方法
uni.$showMsg=function(title="数据请求失败",duration=1500,icon="error"){
  uni.showToast({
    title,
    duration,
    icon
  })
}