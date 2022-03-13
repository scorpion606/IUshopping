<template>
	<view class="w-716 row-ac-sb flex-wrap ">
		<view class="rounded bg-white mb-2 goods-item-index" v-for="(item,index) in list" :key="index" @click="toProduct(item.productId)">
			<image  :src="item.productImgs[0].url" class="rounded goods-item-img" style="" mode="" />
			<view class="mx-2 font-s-3 in2line goods-item-title">{{ item.productContent }}</view>
			<view class="mail-index mt-1 ml-2 row font-s-1">校园直邮</view>
			<view class="ml-2 font-s-5 mt-1 font-w"><text class="font-s-1">￥</text>{{ item.price }}</view>
			<view class="row-ac">
				<view class="ml-2 font-s-6 font-w text-main-color"><text class="font-s-1">￥</text>{{ item.price }}</view>
				<view class="membership-price row font-s-1 text-white ml-1">会员价</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		name: 'list',
		data(){
			return{

			}
		},
		props:{
			list: {
				item:Object,
				type: Array,
				default() {
					return [];
				}
			}
		},
		methods:{
			toProduct(productId){
				uni.navigateTo({
					url: '/pages/product/product?productId='+productId,
				});
			}
		}
	}
</script>

<style lang="scss">
	.goods-item-index{
		width: 348rpx;
		height:550rpx;
		.goods-item-img{
			width: 318rpx;
			height: 318rpx;
			margin-left: 15rpx;
			margin-right: 15rpx;
		}
		.goods-item-title{
			font-weight: 700;
		}
		.mail-index{
			width: 100rpx;
			height: 30rpx;
			border-radius: 15rpx;
			border: 1rpx solid #0D8EFE;
			color: #0D8EFE;
		}
		.membership-price{
			width: 78rpx;
			height: 28rpx;
			border-radius: 0 14rpx 0 0;
			background: linear-gradient(to right, #FB1B70 , #F78D6F);
		}
	}
</style>
