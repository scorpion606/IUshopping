<template>
  <view>
    <!-- 头部导航栏start-->
    <view class="header-index fixed-top">
      <image src="/static/img/header-bg.png" class="header-img" mode=""></image>
      <view class="header-nav">
        <!-- 搜索控件-->
        <u-search shape="round" :showAction="false" class="search" height="20"></u-search>
      </view>
    </view>
    <!-- 头部导航栏end-->
    <view class="header-banner">
      <view class="banner-bg"></view>
       <!-- 轮播图区域 --> 
      <view class="banner-item">
        <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="500" :circular="true" indicator-active-color="#FE4288">
              <!-- 循环渲染轮播图的 item 项 -->
              <swiper-item v-for="(item, i) in swiperImg" :key="i" >
                <view class="swiper-item" @click="toProductDetails(item.prodId)">
                  <!-- 动态绑定图片的 src 属性 -->
                  <image :src="item.imgUrl" style="height: 302rpx;width: 716rpx;"></image>
                </view>
              </swiper-item>
            </swiper>  
      </view>
    </view>
    <!-- 商品服务start -->
    <view class="shop-service">
    	<u-row justify="space-between" gutter="10" >
    	        <u-col span="3">
    	            <view class="demo-layout bg-first">
                    <view class="iconfont icon-sudi"></view>
                    <text class="sudi-text common-text">校内速递</text>
                  </view>
    	        </u-col>
    	        <u-col span="3">
    	            <view class="demo-layout bg-second">
                    <view class="iconfont icon-zhengpinbaozhang"></view>
                    <text class="zhengpin-text common-text">正品保障</text>
                  </view>
                  
    	        </u-col>
    	        <u-col span="3">
    	            <view class="demo-layout bg-third">
                    <view class="iconfont icon-r"></view>
                    <text class="r-text common-text">品牌直购</text>
                  </view>
    	        </u-col>
    	        <u-col span="3">
    	            <view class="demo-layout bg-fourd">
                    <view class="iconfont icon-haiwaizhiyou"></view>
                    <text class="haiwai-text common-text">畅选无忧</text>
                  </view>
    	        </u-col>
    	    </u-row>
    </view>
    <!-- 商品服务end -->
    <!-- 导航推荐start-->
    <view class="indexCategory-box row-ac-sb py-2" v-if="navigationCategory.length>0">
      <view class="category-item row-a-j-fc" v-for="item in navigationCategory" :key="item.index">
        <image class="category-img" style="background-position: 0% 0%; background-size: 100% 100%; background-repeat: no-repeat; height: 80rpx;width: 80rpx;"  :src="item.categoryPic"></image>
        <view class="category-text font-s-1 mt-1">{{item.categoryName}}</view>
      </view>
      </view>
    <!-- 导航推荐end-->
    <!-- 广告区域start-->
   <view class="my-1 ad-width" style="height: 180rpx" v-for="(img,index) in advertImg" :key="index">
     <image :src="img.url" style="height: 180rpx; width: 100%;"></image>
   </view>
     <!-- 广告区域end-->
     <!-- 商品横向列表展示start-->
     <view class="scroll-title">
      
         <image src="/static/img/title.gif" style="width: 100%; " mode="widthFix" ></image>
       
     </view>
       <u-scroll-list @right="right" @left="left">
               <view class="scroll-list" style="flex-direction: row;" >
                   <view
                           class="scroll-list__goods-item"
                           v-for="(item, index) in recommendProduct"
                           :key="index"
                           :class="[(index === 9) && 'scroll-list__goods-item--no-margin-right']"
                           @click="toProductDetails(item.productId)"
                   >
                       <image v-for="(productImg,index1) in item.productImgs" :key="productImg.id" class="scroll-list__goods-item__image" :src="productImg.url"></image>
                       <text v-for="(productSku,index2) in item.productSkus" :key="index2" class="scroll-list__goods-item__text">￥{{ productSku.sellPrice.toFixed(2) }}</text>
                   </view>
                   <view class="scroll-list__show-more">
                       <text class="scroll-list__show-more__text">查看更多</text>
                       <u-icon name="arrow-leftward" color="#f56c6c" size="12"></u-icon>
                   </view>
               </view>
           </u-scroll-list>
     <!-- 商品横向列表展示end-->
     <!-- 楼层分类start -->
     
     <!-- 楼层分类end -->
     <!-- 商品切换导航分类start-->
     <view class="w-716 row-ac py-4  navigation">
     	<view class="row-a-j-fc" style="width: 25%;height: 80rpx;" v-for="(item,index) in navigationList" :key="index"  :class="{ active: navigationIndex == index }" @tap="tapNavigation(index)">
     		<view class="w-100 row font-s-5 navigation-name">{{ item.categoryName }}</view>
     		<view class="font-s-2 text-light-grey pb-1 navigation-title">{{ item.categorySlogan }}</view>
     	</view>
     </view>
     
     <view v-if="navigationIndex == 0">
     	<list :list="yourLikelist"></list>
     </view>
     <view v-if="navigationIndex == 1">
     	<list :list="hotGoodslist"></list>
     </view>
     <view v-if="navigationIndex == 2">
     	<list :list="newGoodslist"></list>
     </view>
     <view v-if="navigationIndex == 3">
     	<list :list="recommendGoodslist"></list>
     </view>
     <!-- 商品切换导航分类end-->
  </view>
</template>

<script>
  import {mapState} from "vuex"
  export default {
    data() {
      return {
        navigationIndex:0,
      }
    },
    methods: {
      // 点击轮播图跳转到详情页
      toProductDetails(prodId){
        uni.navigateTo({
          url:"../../subpkg/product_details/product_details?pId="+prodId,
        })
      },
      //每日推荐滑动左右触动的方法
      right(){
        console.log("right")
      },
      left(){
        console.log("left")
      },
      // 切换导航标题
      tapNavigation(index){
        this.navigationIndex=index
      }
    },
    computed:{
      //获取轮播图数据
      ...mapState({
        swiperImg:state=>state.home.swiperImg,
      }),
      // 获取首页分类导航数据
      ...mapState({
        navigationCategory:state=>state.home.navigationCategory
      }),
      // 获取首页广告图片
      ...mapState({
        advertImg:state=>state.home.advertImg
      }),
      // 获取每日推荐商品信息
      ...mapState({
        recommendProduct:state=>state.home.recommendProduct
      }),
      // 获取切换分类商品信息
      ...mapState({
        navigationList:state=>state.home.navigationList,
        yourLikelist:state=>state.home.yourLikelist,
        hotGoodslist:state=>state.home.hotGoodslist,
        newGoodslist:state=>state.home.newGoodslist,
        recommendGoodslist:state=>state.home.recommendGoodslist,
      }),
      // 获取楼层分类信息
      ...mapState({
        floor:state=>state.home.floor
      })
    },
    onLoad() {
      //分发获取轮播图图片请求
      this.$store.dispatch("getSwiperImg");
      //分发获取首页导航分类信息请求
      this.$store.dispatch("getNavigationCategory");
      // 分发获取首页广告图片信息请求
      this.$store.dispatch("getAdvert");
      // 分发请求获取首页每日推荐商品信息请求
      this.$store.dispatch("getRecommendProduct");
      //分发请求获取首页切换分类商品信息
      this.$store.dispatch("getSwitchProduct");
      // 分发请求获取首页楼层分类信息
      this.$store.dispatch("getFloorCategory");
    }
  }
</script>

<style lang="scss">

.header-index {
	width: 750rpx;
	height: 228rpx;
	.header-img {
		width: 750rpx;
		height: 228rpx;
		position: absolute;
	}
  .header-nav {
    position: relative;
    padding-top: 158rpx;
    margin-left: 30rpx;
    width: 600rpx;
    z-index: 1;
  }
}
.header-banner {
  .banner-bg {
    width: 750rpx;
    height: 84rpx;
    background-color: $uni-color-itempink;
    border-radius: 0px 0px 15px 15px;
  }
  .banner-item {
    height: 302rpx;
    width: 716rpx;
    margin: 0 auto;
    margin-top: -84rpx;
    swiper {
    height: 302rpx;
    width: 716rpx;
     .swiper-item,
     image{
       width: 100%;
       height: 100%;
       border-radius: 15rpx;
     }
    }
  }
}
.shop-service{
  width: 716rpx;
  margin: 12rpx auto 0;
	.iconfont{
    margin-right: 8rpx;
		font-size: 44rpx;
    line-height: 50rpx;
    margin-left: 12rpx;
    color: $uni-color-itempink;
    display: inline-block;
	}
  .demo-layout {
          height: 50rpx;
          border-radius: 8rpx;
      }
      .common-text {
        font-size: 24rpx;
        display: inline-block;
        height: 50rpx;
        float: right;
        margin-right: 5rpx;
        line-height: 50rpx;
        color: #00a1d6;
      }  
      .bg-first {
        .icon-sudi {
         font-size: 35rpx;
        }
        
      }
     
  
}
.indexCategory-box
.category-item
.category-img {
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
}
.indexCategory-box {
  width: 650rpx;
  margin-left: 50rpx;
  margin-right: 50rpx;
  .row-a-j-fc {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    .category-img {
      display: inline-block;
      overflow: hidden;
      position: relative;
    }
    .font-s-1 {
      font-size: 22rpx;
      color: $uni-text-color;
      
    }
    .mt-1 {
      margin-top: 10rpx;
    }
  }
}
.py-2 {
  padding-top: 20rpx;
  padding-bottom: 20rpx;
}
.row-ac-sb {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.ad-width {
  width: 750rpx;
}
.my-1 {
  margin-top: 10rpx;
  margin-bottom: 10rpx;
}
.scroll-title {
  text-align: center;
  color: #3C9CFF;
}
.scroll-list {
	@include flex(column);
  margin-top: 20rpx;
  padding-left: 8rpx;
	&__goods-item {
		margin-right: 20px;

		&__image {
			width: 60px;
			height: 60px;
			border-radius: 4px;
		}

		&__text {
			color: #f56c6c;
			text-align: center;
			font-size: 12px;
			margin-top: 5px;
		}
	}

	&__show-more {
		background-color: #fff0f0;
		border-radius: 3px;
		padding: 3px 6px;
		@include flex(column);
		align-items: center;

		&__text {
			font-size: 12px;
			width: 12px;
			color: #f56c6c;
			line-height: 16px;
		}
	}
}
.navigation{
	.navigation-title{
		border-bottom: 5rpx solid $uni-bg-color-grey;
	}
  .active .navigation-name{
  		height: 40rpx;
  		font-size: 32rpx;
  		font-weight: 900;
  	}
  	.active .navigation-title{
  		color: $main-color;
  		border-bottom: 5rpx solid $main-color;
  		 transition: all 1.5s;
  	}
  }
  
.floor-list {
  .floor-item {
   color: #00C6FF;
   margin-left: 12rpx;
    .floor-title {
      margin-bottom: 10rpx;
        font-size: 14px;
        font-style: oblique;
        
    }
    .right-img-box {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
    }
    
    .floor-img-box {
      display: flex;
      padding-left: 10rpx;
    }
  }
}
</style>
