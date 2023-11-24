<script setup>
	import { ref } from 'vue';
	import { onReady } from '@dcloudio/uni-app';
	import { request } from "../../utils/request";

	const advertiseList = ref([{
			color: 'red',
			text: 'A',
			href: "https://officialwebsitestorage.blob.core.chinacloudapi.cn/public/upload/photo_db/2023/11/22/202311221503308377/202311221503308377_640_398.jpg?202310250918348984&rand=0827"
		},
		{
			color: 'green',
			text: 'B',
			href: 'https://officialwebsitestorage.blob.core.chinacloudapi.cn/public/upload/photo_db/2023/11/14/202311141821398888/202311141821398888_640_398.jpg?&rand=0827',
		},
		{
			color: 'blue',
			text: 'C',
			href: 'https://officialwebsitestorage.blob.core.chinacloudapi.cn/public/upload/photo_db/2023/10/30/202310301939434000/202310301939434000_640_398.jpg?&rand=0827'
		},
	])
	const menuList = ref([{
			name: '汉堡',
			packageList: []
		},
		{
			name: '炸鸡',
			packageList: []
		},
		{
			name: '饮料',
			packageList: []
		},
		{
			name: '冰淇淋',
			packageList: []
		},
		{
			name: '甜品',
			packageList: []
		},
	])
	const packageList = ref([])
	const goodNavOptions = ref(
		[{
				icon: 'shop',
				info: 2,
				text: '优惠券',
				infoBackgroundColor: '#007aff',
				infoColor: "#f5f5f5",
			},
			{
				icon: 'cart',
				text: '购物车',
				info: 0,
			}
		])

	const goodNavButtonGroup = ref([{
		text: '立即购买',
		backgroundColor: 'linear-gradient(90deg, #FE6035, #EF1224)',
		color: '#fff'
	}], )

	// ======================  事件 ========================
	const onGoodButtonClick = (e) => {
		console.log(e.index)
		if (e.index === 0) {
			// todo 显示优惠券列表
			
		} else if (e.index === 1) {
			// todo 显示购物车列表
			// e.content.info++
		}


		uni.showToast({
			title: `点击${e.content.text}`,
			icon: 'none'
		})
	}

	const onGoodGroupClick = (e) => {
		if (e.index === 0) {
			// todo  下单
		}


		uni.showToast({
			title: `点击${e.content.text}`,
			icon: 'none'
		})
	}

	const onMenuTap = (menu) => {
		console.log(menu)
	}

	const onAddCart = (pkg) => {
		// todo 添加购物车
		goodNavOptions.value[1].info++
		console.log(pkg)
	}

	// ======================  钩子 ========================
	onReady(async () => {
		const result = await request.get('/api/package/menu')
		menuList.value = result.data.categoryList
		packageList.value = result.data.packageList
	})
</script>

<template>
	<view style="width: 100vw; height: 100vh;">
		<view class="advertise-list">
			<swiper circular :indicator-dots="true" :autoplay="true" :interval="2000" :duration="500">
				<swiper-item class="advertise-item" v-for="advertise in advertiseList">
					<image :src="advertise.href" mode="scaleToFill"></image>
				</swiper-item>
			</swiper>
		</view>

		<view class="main">
			<scroll-view class="menu-list" scroll-y="true">
				<button class="menu-item" v-for="menu in menuList" @tap="onMenuTap(menu)">{{menu.name}}</button>
			</scroll-view>

			<scroll-view class="package-list" scroll-y="true">
				<view class="package-item" v-for="pkg in packageList">


					<view class="package-image">
						<image mode="aspectFit"
							src="https://officialwebsitestorage.blob.core.chinacloudapi.cn/public/upload/attachment/2022/08/202208081012023493.png" />
					</view>
					<view class="package-description">
						{{pkg.name}}
						<view class="package-promotion-price">促销价: <span>￥{{18}}</span></view>
						<view class="package-price">原价: <span style="text-decoration: line-through;">￥{{22}}</span></view>
					</view>

					<view class="add-cart-btn" @tap="onAddCart(pkg)">
						添加
					</view>
				</view>
			</scroll-view>

		</view>

		<view class="goods-nav">
			<uni-goods-nav :button-group="goodNavButtonGroup" :options="goodNavOptions" @click="onGoodButtonClick"
				@buttonClick="onGoodGroupClick" />
		</view>

	</view>
</template>

<style scoped lang="less">
	.advertise-list {
		height: 300rpx;

		.advertise-item {
			height: 100%;

			image {
				width: 100%;
				height: 100%;
			}
		}

	}


	.main {
		margin-top: 60rpx;
		padding-bottom: 105rpx;

		position: sticky;
		top: 388rpx;
		// height: 1080rpx;
		height: calc(100% - 88rpx - 60rpx - 100rpx);

		display: flex;
		justify-content: space-between;

		.menu-list {
			width: 160rpx;

			.menu-item {
				border-radius: 0;

				height: 160rpx;
				background-color: red;
				margin: 1px 0;
				text-align: center;
				line-height: 160rpx;
			}
		}

		.package-list {
			width: 550rpx;

			.package-item {

				margin: 5px 0;
				height: 250rpx;
				background-color: seagreen;
				position: relative;

				display: flex;

				.package-image {
					width: 350rpx;
					height: 100%;

					image {
						width: 100%;
						height: 100%;
					}
				}

				.package-description {
					width: 200rpx;
					height: 78%;
					font-size: small;
					text-align: right;
					line-height: 1.5rem;
					padding-right: 8rpx;

					.package-promotion-price {
						color: red;
					}
				}

				.add-cart-btn {
					border-radius: 0;
					background-color: red;
					color: white;
					width: 100rpx;
					height: 50rpx;
					text-align: center;
					line-height: 50rpx;

					position: absolute;
					bottom: 0;
					right: 0;
				}
			}
		}
	}

	.goods-nav {
		height: 100rpx;
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
	}
</style>