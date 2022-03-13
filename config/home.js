import {request} from "./request.js"
//获取轮播图接口
//url: /index/indexImg, method:GET, params:null
export const reqGetSwiperImg=()=>request({
  url:"/index/indexImg",
  method:"GET"
})
// 获取首页分类导航信息
// url: /index/navigation, method:GET, params:null
export const reqGetNavigationCategory=()=>request({
  url:"/index/navigation",
  method:"GET"
})
// 获取首页广告图片
// url: /index/getAdvert, method:GET, params:null
export const reqGetAdvert=()=>request({
  url:"/index/getAdvert",
  method:"GET"
})

// 获取首页每日推荐的商品
// url: /index/recommend-list, method:GET, params:null
export const reqGetRecommendProduct=()=>request({
  url:"/index/recommend-list",
  method:"GET"
})

// 获取切换导航商品信息
// url: /index/getSwitchProduct, method:GET, params:null
export const reqGetSwitchProduct=()=>request({
  url:"/index/getSwitchProduct",
  method:"GET",
  }
)

// 获取楼层分类信息
//url: /index/getFloorCategory, method:GET, params:null
export const reqGetFloorCategory=()=>request({
  url:"/index/getFloorCategory",
  method:"GET",
})