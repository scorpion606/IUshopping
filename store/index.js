import Vue from "vue"
import Vuex from "vuex"
import home from "./home/home.js"
import search from "./search/search.js"
import category from "./category/category.js"
import productlist from "./productlist/productlist.js"
//对vue插件机制
Vue.use(Vuex);

const store=new Vuex.Store({
    
  modules:{
    home,
    category,
    search,
    productlist
  }
})
export default store