// home模块的小仓库
import {reqGetSwiperImg,reqGetNavigationCategory,reqGetAdvert,reqGetRecommendProduct,reqGetSwitchProduct,reqGetFloorCategory} from "../../config/home.js"
// state:仓库存储数据的地方
const state={
  // 轮播图图片数据存储
  swiperImg:[],
  // 首页分类导航数据
  navigationCategory:[],
  // 广告图片
  advertImg:[],
  // 推荐商品数据
  recommendProduct:[],
  // 切换分类推荐
  navigationList:[],
  // 猜你喜欢数据
  yourLikelist:[],
  // 精致生活数据
  hotGoodslist:[],
  //每日上新数据
  newGoodslist:[],
  // 低价实惠数据
  recommendGoodslist:[],
  // 楼层分类信息
  floor:[]
};
// mutations:修改state的唯一手段
const mutations={
//将请求到的轮播图数据赋值给state.swiperImg
  GETSWIPERIMG(state,swiperImg){
    
      state.swiperImg=swiperImg;
  },
// 请求得到的首页分类导航数据赋值给state.navigationCategory
GETNAVIGATIONCATEGORY(state,navigationCategory){
  state.navigationCategory=navigationCategory;
},
// 请求得到的首页广告图片赋值给state.advertImg
GETADVERT(state,advertImg){
  state.advertImg=advertImg;
},
// 请求得到的首页每日推荐商品信息赋值给state.recommendProduct
GETRECOMMENDPRODUCT(state,recommendProduct){
  state.recommendProduct=recommendProduct;
},
// 请求得到的首页切换分类商品信息赋值给state.navigationList
GETSWITCHPRODUCT(state,navigationList){
  state.navigationList=navigationList;
  state.yourLikelist=navigationList[0].products;
  state.hotGoodslist=navigationList[1].products;
  state.newGoodslist=navigationList[2].products;
  state.recommendGoodslist=navigationList[3].products;
},
// 请求得到的首页楼层分类信息赋值给state.floor
GETFLOORCATEGORY(state,floor){
  state.floor=floor;
}

};
// actions:处理action，可以书写自己的业务逻辑，也可以异步处理
const actions={
  // 获取轮播图图片数据
  async getSwiperImg({commit}){
    let res=await reqGetSwiperImg();
    if(res.code==10000){
      commit("GETSWIPERIMG",res.data);
    }
  },
  
  // 获取首页分类导航信息
  async getNavigationCategory({commit}){
    let res=await reqGetNavigationCategory();
    if(res.code==10000){
      commit("GETNAVIGATIONCATEGORY",res.data);
    }
  },
  // 获取首页广告图片
  async getAdvert({commit}){
    let res=await reqGetAdvert();
    if(res.code==10000){
      commit("GETADVERT",res.data);
    }
  },
  // 获取每日推荐商品信息
  async getRecommendProduct({commit}){
    let res=await reqGetRecommendProduct();
    if(res.code==10000){
      commit("GETRECOMMENDPRODUCT",res.data);
    }
  },
  // 获取切换分类商品信息
  async getSwitchProduct({commit}){
    let res=await reqGetSwitchProduct();
    if(res.code==10000){
      commit("GETSWITCHPRODUCT",res.data);
    }
  },
  // 获取楼层分类信息
  async getFloorCategory({commit}){
    let res=await reqGetFloorCategory();
    if(res.code==10000){
      commit("GETFLOORCATEGORY",res.data);
    }
  }
};
// getters:理解为计算属性，用于简化数据仓库，让组件获取仓库的数据更加方便
const gettes={};
export default {
  state,
  mutations,
  actions,
  gettes
}