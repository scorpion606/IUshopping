<template>
  <view>
    <view class="common-search w-100 mt-1 row-ac">
      <view class=" bg-white row-ac  flex-1"
            :class="focusstate ? 'search-input-box justify-center' : 'search-input-box-two'">
        <u-icon style="" name="search" class="ml-2" :size="25"></u-icon>
        <input type="text" value="" class="search-input p-0 border-radius" v-model="searchInfo" placeholder="请输入搜索商品"
               @click="inputClick" @blur="inputBlur" @input="input"/>
      </view>
      <view class="search-text row bg-color" v-if="!focusstate" @click="tosearch">搜索</view>
    </view>
    
    <!-- 搜索建议列表 -->
    <view class="sugg-list" v-if="searchResult.length!==0">
      <view class="sugg-item" v-for="(item, i) in searchResult" :key="i" @click="gotoDetail(item.productId)">
        <view class="goods-name">{{item.productContent}}</view>
        <u-icon name="arrow-right" :size="15"></u-icon>
      </view>
    </view>
    
	<!-- <view class="ml-4 py-3 text-light-muted" v-if="!isShow||searchResult.length==0">--暂无搜索结果--</view> -->
    <view class="search-history bg-white rounded" v-if="isShow">
      <view class="history-list p-2 " v-if="searchHistoryLists.length > 0">
        <view class="font-w" >搜索历史</view>
        <view class="row-ac-fw mt-2">
          <view class="history-item  bg-light mr-3 mb-2 rounded font-s-3"
					v-for="(item,index) in searchHistoryLists" :key="index" @click="searchHistoryClick(item)">
            {{item}}
          </view>
        </view>
        <view class="clear-history" @click="oldDelete">
         <u-icon name="trash" ></u-icon>
         <text class="clear-title  text-light-black">清空历史记录</text>
         </view>
         
      </view>
    </view>
    <template v-if="searchlist.length > 0&&isShow">
		<view class="mt-9 mx-4 row py-3">
			<view class="border-bottom flex-1"></view>
			<view class="px-3">热门推荐</view>
			<view class="border-bottom flex-1"></view>
		</view>
      <list :list="searchlist"></list>
    </template>

  </view>
</template>
<script>
import {mapState} from "vuex"
import {request} from "../../config/request.js"
export default {
  data () {
    return {
      // 延时器timer
      timer:null,
      
      focusstate: true,
      // 输入关键词搜索页面的内容是否显示
      isShow:true,
      // 搜索关键信息
      searchInfo: '',
			justSearch:'',
      searchQueryInfo: {
        limit: 10,
        pageNum: 1,
        keyWord: ''
      },
      // 搜索历史信息
      searchHistoryLists: [],
    }
  },
  onLoad () {
    this.initData()
    // 初始化搜索建议信息
    this.$store.state.search.searchResult=[]
  },
	/* onReachBottom(){
  	this.reachBottomSearch()
	}, */
  methods: {
    getSearch(){
      // 分发获取热门推荐信息请求
      this.$store.dispatch("getSwitchProduct")
    },
    initData () {
      this.getSearch()
       this.getHistoryList()
    },
    // 跳转到商品详情页
    gotoDetail(pId){
      uni.navigateTo({
        url:"../product_details/product_details?pId="+pId
      })
    },
    // 点击搜索按钮
    tosearch(){
      // 向搜索历史第一条插入数据
      if(this.searchInfo.toString()!=""){
       
       this.searchHistoryLists.unshift(this.searchInfo)
      }
      if(this.searchHistoryLists.length>11){
      	// 只保存10个
      	this.searchHistoryLists.splice(11,1)
      }
      // 去重
      this.searchHistoryLists = [...new Set(this.searchHistoryLists)]
      // 持久化存储到本地
      uni.setStorageSync('searchHistoryLists', this.searchHistoryLists);
      // 跳转到商品列表页面
      uni.navigateTo({
        url:"../product_list/product_list?kw="+this.searchInfo
      })
    },
    
    
		// 获取历史搜索记录
    getHistoryList () {
      this.searchHistoryLists = uni.getStorageSync('searchHistoryLists')
    },
    // 清除历史搜索
    oldDelete () {
      uni.showModal({
        content: '确定清除全部历史记录吗？',
        confirmColor:"#FE4288",
        cancelColor:"#FE4288",
        success: res => {
          if (res) {
            if(res.confirm){
              // 清除本地数据
              this.searchHistoryLists=[]
              // 清除缓存数据
              uni.setStorageSync("searchHistoryLists",[])
            }else if(res.cancel){
              return
            }
          }
        }
      })
    },
  
		// 搜索历史点击事件
		searchHistoryClick(item){
			this.searchInfo = item
			uni.navigateTo({
			  url:"../product_list/product_list?kw="+item
			})
		},
    /*
    // 查询按钮点击事件
    tosearch (type) {
			this.focusstate = true
      this.searchQueryInfo.keyword = this.searchInfo
			if(type !== 'bottom'){
				this.searchQueryInfo.page = 1
			}
			if(this.searchQueryInfo.page === 1){
				this.searchlist = []
			}
			this.justSearch = this.searchInfo
			console.log(this.searchHistoryList)
			if(this.searchHistoryList == ''){
				this.searchHistoryList = []
			}
			// 向搜索历史第一条插入数据
			if(this.searchInfo.toString() != ''){
				this.searchHistoryList.unshift(this.searchInfo)
			}
			if(this.searchHistoryList.length>11){
				// 只保存10个
				this.searchHistoryList.splice(11,1)
			}
			// 去重
			this.searchHistoryList = [...new Set(this.searchHistoryList)]
			uni.setStorageSync('searchHistoryList', this.searchHistoryList);
      this.$R.get(productSearchUrl, this.searchQueryInfo)
        .then((res) => {
          console.log(res)
          this.searchlist = [...this.searchlist,...res.data.list]
        })
      this.searchInfo = ''
    },
		// 触底事件
		reachBottomSearch(){
			++this.searchQueryInfo.page
			this.searchInfo = this.justSearch
			this.tosearch('bottom')
		},*/
    //点击搜索显示搜索按纽
		inputClick () {
      this.focusstate = false
    },
    // 输入框失去焦点隐藏按钮
    inputBlur(){
      this.focusstate=true
     
    },
    // 输入关键词
      
    input(e){
      // 清除延时器
      clearTimeout(this.timer)
      // 开启定时器
      if(this.searchInfo!=""){
        this.isShow=false
        
      }else{
        this.isShow=true
      }
        
      this.timer=setTimeout(()=>{
        // 发送搜索建议请求
        this.$store.dispatch("getSearchResult",this.searchInfo)
        
      },500)
    }
  },
  computed:{
    // 获取热门推荐信息
    ...mapState({
      searchlist:state=>state.home.hotGoodslist,
    }),
    // 获取输入关键词得到商品信息建议
    ...mapState({
      searchResult:state=>state.search.searchResult
    })
    
  }
}
</script>
<style lang="scss">
  page {
    background-color: $uni-bg-color-grey;
  }

  .common-search {
    width: 710rpx;
    height: 70rpx;
    margin: 15rpx 20rpx;
    border-radius: 35rpx;
    position: sticky;
    top: 0;
    z-index: 999;
      
    .uicon-search {
      margin-right: 25rpx;
      margin-top: 4rpx;
      
    }
    .search-input-box {
      width: 100%;
      height: 70rpx;
      border-radius: 35rpx;
      .iconfont {
        font-size: 38rpx;
        color: #909090;
      }

      .search-input {
        height: 70rpx;
      }
    }

    .search-input-box-two {
      width: 590rpx;
      height: 70rpx;
      border-radius: 35rpx 0 0 35rpx;

      .iconfont {
        font-size: 38rpx;
        color: #909090;
      }

      .search-input {
        height: 70rpx;

      }
    }

    .search-text {
      width: 120rpx;
      height: 70rpx;
      border-radius: 0 35rpx 35rpx 0;
      float: right;
      right: 0;
    }
  }

  .search-history {
    width: 722rpx;
    margin: 0 14rpx 20rpx;
    .history-item{
       background-color: rgba(0, 0, 0, 0.1);
       padding-top: 4px;
       padding-bottom: 4px;
       padding-left: 12px;
       padding-right: 12px;
       color: dark;
    }
   
  }
  .clear-history {
    display: flex;
    width: 722rpx;
    justify-content: center;
    .clear-title {
      font-size: 12px;
      margin-left: 6rpx;
    }
  }
  .sugg-list {
    padding: 0 5px;
  
    .sugg-item {
      font-size: 12px;
      padding: 13px 0;
      border-bottom: 1px solid #efefef;
      display: flex;
      align-items: center;
      justify-content: space-between;
  
      .goods-name {
        // 文字不允许换行（单行文本）
        white-space: nowrap;
        // 溢出部分隐藏
        overflow: hidden;
        // 文本溢出后，使用 ... 代替
        text-overflow: ellipsis;
        margin-right: 3px;
      }
    }
  }

</style>
