<template>
  <view>
    <!-- 商品筛选区域start -->
   <view class="pro-filter ">
     <view class="pro-filter-items d-f">
       <view class="flex-1 filter-1">
         <text class="filter-1-title">综合</text>
         <view class="filter-1-icon"></view>
         </view>
       <view class="flex-1  filter-2">
         <text class="filter-2-title">销量</text>
       </view>
       <view class="flex-1 filter-3">
         <text class="filter-3-title">有货优先</text>
         <view class="filter-1-icon"></view>
       </view>
       <view class="filter-4" style="width: 156rpx;">
         <text class="filter-4-title">筛选</text>
       </view>
     </view>
   </view>
    <!-- 商品筛选区域end -->
    <view class="goods-list">
    <block v-for="(item, i) in productList" :key="i">
        <view class="goods-item" @click="gotoDetails(item.productId)">
            <!-- 商品左侧图片区域 -->
            <view class="goods-item-left">
              <image :src="item.productImgs[0].url" class="goods-pic"></image>
            </view>
            <!-- 商品右侧信息区域 -->
            <view class="goods-item-right">
              <!-- 商品标题 -->
              <view class="goods-name in2line">{{item.productContent}}</view>
              <view class="goods-info-box">
                <!-- 商品价格 -->
              <view class="goods-price text-main-color" v-if="item.productSkus.length>0">
                <text class="font-s-2">￥</text>{{item.productSkus[0].sellPrice | tofixed}}
                </view>
              </view>
            </view>
          </view>
      </block>
    </view>
  </view>
</template>

<script>
  import {mapState} from "vuex"
  import {request} from "../../config/request.js"
  export default {
    data() {
      return {
        // 请求参数对象
        queryObj:{
          // 关键词
          keyWord:'',
          // 分类ID
          cId:0,
          // 分页索引
          pageNum:1,
          // 每页显示数量
          limit:4
        },
        // 商品列表信息
        productList:[],
        // 商品总数
        total:0,
        // 节流阀
        loading:false
      }
    },
    filters:{
      tofixed(num){
        return Number(num).toFixed(2)
      }
    },
    onReachBottom() {
      // 判断数据是否加载完毕
      if(this.queryObj.pageNum*this.queryObj.limit>=this.total)
      return uni.$showMsg("数据加载完毕!")
      
      // 如果正在请求其他数据，退出请求
      if(this.loading) return
      
      // 页码自增1
      this.queryObj.pageNum++
      // 重新发送请求获取数据
      this.getProductList()
    },
    onPullDownRefresh() {
      // 重置关键数据
      this.queryObj.pageNum=1
      this.total=0
      this.loading=false
      this.productList=[]
      
      // 重新发起请求
      this.getProductList(()=>uni.stopPullDownRefresh())
    },
    onLoad(options) {
      this.queryObj.keyWord=options.kw||''
      this.queryObj.cId=options.cId||0
      
      this.getProductList()
    },
    methods: {
      // 分发获取商品列表信息
     async getProductList(sp){
        // 开启节流阀
        this.loading=true
      const res= await request({
          url:"/product/productList",
          method:"GET",
          params:this.queryObj
        })
        // 关闭节流阀
        this.loading=false
        // 请求完数据后下拉刷新关闭
        sp && sp()
        if(res.code=10000){
          this.productList=[...this.productList,...res.data.list]
          this.total=res.data.count
        }
      },
      // 跳转到商品详情页
      gotoDetails(pId){
        uni.navigateTo({
          url:"/subpkg/product_details/product_details?pId="+pId
        })
      }
    },
    computed:{
      // 获取商品列表信息
      
    },
    
  }
</script>

<style lang="scss">
.pro-filter {
  width: 750rpx;
  height: 90rpx;
  .pro-filter-items {
   justify-content: space-around;
   font-size: 14px;
   position: relative;
   padding: 10px 0;
   height: 50rpx;
   width: 100%;
   line-height: 48rpx;
   text-align: center;
   background-color: #fff;
   z-index: 99;
     .filter-1-icon {
       height: 10rpx;
       width: 16rpx;
       display: inline-block;
       margin-left: 14rpx;
       background: url(../../static/img/down.png) no-repeat;
       background-size: 16rpx auto;
       vertical-align: middle;
   }
  }
}
.goods-item {
    display: flex;
    padding: 10px 5px;
    border-bottom: 1px solid #f0f0f0;

    .goods-item-left {
      margin-right: 5px;

      .goods-pic {
        width: 100px;
        height: 100px;
        display: block;
      }
    }

    .goods-item-right {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 0 10px;

      .goods-name {
        margin-top: 16rpx;
        font-size: 13px;
      }

      .goods-price {
        font-size: 16px;
      }
    }
  }
</style>
