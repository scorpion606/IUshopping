import Vue from "vue"
import Vuex from "vuex"
import home from "./home/home.js"
//对vue插件机制
Vue.use(Vuex);

const store=new Vuex.Store({
    
  modules:{
    home
  }
})
export default store