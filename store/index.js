import Vue from "vue"
import Vuex from "vuex"
import home from "./home/home.js"
import category from "./category/category.js"
//对vue插件机制
Vue.use(Vuex);

const store=new Vuex.Store({
    
  modules:{
    home,
    category
  }
})
export default store