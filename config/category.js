import {request} from "./request.js"

// 获取分类信息
//url: /index/category, method:"GET", params:null
export const reqGetCategoryInfo=()=>request({
  url:"/index/category",
  method:"GET",
})