import {request} from "./request.js"

// 获取搜索商品信息
// url:/product/searchResult, method:"GET", params:"keyWord"
export const reqGetSearchResult=(keyWord)=>request({
  url:"/product/searchResult",
  method:"GET",
  params:{
    keyWord:keyWord
  }
})