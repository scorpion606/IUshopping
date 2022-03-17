<template>
  <view class="my-search-container" :style="{'background-color':bgcolor}">
    <!-- 使用 view 组件模拟 input 输入框的样式 -->
       <view class="my-search-box" :style="{'border-radius':radius+'px'}" @click="searchBoxHandler">
        <u-icon name="search" size="22"></u-icon>
         <text class="placeholder">搜索</text>
       </view>
  </view>
</template>

<script>
  export default {
    props: {
      // 背景颜色
      bgcolor: {
        type: String,
        default: '#FE4288'
      },
      // 圆角尺寸
      radius: {
        type: Number,
        // 单位是 px
        default: 15
      }
    },
    data() {
      return {
        
      };
    },
    methods:{
      searchBoxHandler(){
        this.$emit('click')
      }
    }
  }
</script>

<style lang="scss">
.my-search-container {
  
  height: 50px;
  // #ifdef MP-WEIXIN
  height: 42px;
  // #endif
  padding: 0 10px;
  display: flex;
  // #ifdef H5
  align-items: center;
  // #endif
}

.my-search-box {
  height: 30px;
  background-color: #ffffff;
  border-radius: 15px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  .placeholder {
    font-size: 15px;
    margin-left: 5px;
  }
}
</style>
