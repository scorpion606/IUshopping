// category模快仓库
import {reqGetCategoryInfo} from "../../config/category.js"
const state={
  // 商品分类信息
  categoryInfo:[],
}
const mutations={
  // 请求得到的分类信息赋值给state.categoryInfo
  GETCATEGORYINFO(state,payload){
    state.categoryInfo=payload;
  }
}
const actions={
  // 获取一级、二级、三级分类信息
  async getCategoryInfo({commit},active){
    let res=await reqGetCategoryInfo();
    if(res.code==10000){
      commit("GETCATEGORYINFO",res.data);
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