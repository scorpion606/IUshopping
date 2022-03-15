<template>
  <view>
    <view class="scroll-list-container">
      <!-- 左侧区域start-->
      <scroll-view class="left-scroll-view" scroll-y   :style="{height:wh+'px'}">
        <block v-for="(item,index) in categoryInfo" :key="index">
        <view :class="['left-scroll-view-item',index===active?'active':'' ]" @click="changeActive(index)">{{item.categorySlogan}}</view>
        </block>
        
      </scroll-view>
      <!-- 左侧区域end-->
      <!-- 右侧区域start-->
      <scroll-view class="right-scroll-view" scroll-y :scroll-top="scrollTop" :style="{height:wh+'px'}">
         <view class="cate-lv2" v-for="(item2, i2) in secondCategory" :key="i2">
           <!-- 二级分类标题 -->
            <view class="cate-lv2-title">/ {{item2.categoryName}} /</view>
             <!-- 动态渲染三级分类的列表数据 -->
                <view class="cate-lv3-list">
                  <!-- 三级分类 Item 项 -->
                  <view class="cate-lv3-item" v-for="(item3, i3) in item2.categories" :key="i3" @click="gotoProductList(item3.categoryId)">
                    <!-- 图片 -->
                    <image :src="item3.categoryIcon"></image>
                    <!-- 文本 -->
                    <text>{{item3.categoryName}}</text>
                  </view>
                </view>
          </view>
      </scroll-view>
      <!-- 右侧区域end-->
    </view>
  </view>
</template>

<script>
  import {mapState} from "vuex"
  export default {
    data() {
      return {
        // 设备可用高度
        wh:0,
        // 通过索引动态控制active样式
        active:0,
        // 二级分类列表信息
        secondCategory:[],
        // 滚动条距离顶部的距离
        scrollTop: 0,
        
      }
    },
    methods: {
      // 动态渲染左侧进度
      changeActive(index){
        this.active=index
        this.secondCategory=this.categoryInfo[this.active].categories
        // 让 scrollTop 的值在 0 与 1 之间切换
         this.scrollTop = this.scrollTop === 0 ? 1 : 0
      },
      // 跳转到商品列表页
      gotoProductList(cId){
        uni.navigateTo({
          url:"../../subpkg/product_list/product_list?cId="+cId
        })
      }
    
    },
    onLoad() {
      // 获取设备屏幕可用高度，并赋值给wh
      const sysInfo=uni.getSystemInfoSync()
      this.wh=sysInfo.windowHeight
     
      
      // 分发请求获取一级、二级、三级分类信息
       
     this.$store.dispatch("getCategoryInfo").then(()=>{
       this.secondCategory=this.categoryInfo[0].categories
     })
    
    },
    computed:{
      // 获取一级、二级、三级分类信息
     ...mapState({
       categoryInfo:state=>state.category.categoryInfo
     }),
       
     
    }
  }
</script>

<style lang="scss">
.scroll-list-container {
  display: flex;
  .left-scroll-view{
    width: 120px;
    .left-scroll-view-item {
      background-color: #F7F7F7;
      line-height: 60px;
      text-align: center;
      font-size: 10px;
      // 激活样式
      &.active {
        position: relative;
        background-color: #FFFFFF;
        font-size: 12px;
        color: $main-color;
        &::before {
          content: ' ';
          display: block;
          width: 3px;
          height: 30px;
          background-color: $main-color;
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
        }
      }
    }
  }
} 





.right-scroll-view {
    .cate-lv2-title {
      font-size: 12px;
      font-weight: bold;
      text-align: center;
      padding: 15px 0;
    }
    .cate-lv3-list {
      display: flex;
      flex-wrap: wrap;
    
      .cate-lv3-item {
        width: 33.33%;
        margin-bottom: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
    
        image {
          width: 63px;
          height: 63px;
        }
    
        text {
          font-size: 12px;
        }
      }
    }
  }
</style>
