// 搜索模块
import {reqGetSearchResult} from "../../config/search.js"
const state={
  // 存储商品信息
  searchResult:[]
}
  
const mutations={
  // 将获取到的商品信息赋值给state.searchResult
  GETSEARCHRESULTS(state,searchResult){
    state.searchResult=searchResult
  }
}
const actions={
  // 根据关键词获取商品信息
  async getSearchResult({commit},keyWord){
      
    if(keyWord==""){
      commit("GETSEARCHRESULTS","");
    }
    else{
    let res=await reqGetSearchResult(keyWord)
    if(res.code==10000){
      commit("GETSEARCHRESULTS",res.data)
    }
  }
  }
}
const getters={
 
}
export default {
  state,
  mutations,
  actions,
  getters
}