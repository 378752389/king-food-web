<template>
	<view class="advertise-list">
		<swiper circular :indicator-dots="true" :autoplay="true" :interval="2000" :duration="500">
			<swiper-item class="advertise-item" v-for="advertise in advertiseList">
				<image :src="advertise.href" mode="scaleToFill"></image>
			</swiper-item>
		</swiper>
	</view>
	<view class="options">
		<view class="location"></view>
		<view class="booking"></view>
	</view>

	<view class="main">
		<scroll-view class="menu-list" scroll-y="true">
			<view @click="onMenuClick(index)" class="menu-item" v-for="(menu, index) in menuList"><text>{{menu.name}}</text>
			</view>

			<view class="padding"></view>
		</scroll-view>

		<view class="package-list">
			<view class="package-group" v-for="cat in categoryList">
				<view>{{cat.name}}</view>
				<view class="package-item" v-for="pkg in cat.packageList">
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


			</view>

			<view class="padding"></view>
		</view>
		
		<view class="goods-nav">
			<uni-goods-nav :button-group="goodNavButtonGroup" :options="goodNavOptions" @click="onGoodButtonClick"
				@buttonClick="onGoodGroupClick" />
		</view>
	</view>

</template>

<script setup>
	import { onReady } from '@dcloudio/uni-app';
	import { request } from "../../utils/request";
	import { onMounted, ref, nextTick } from 'vue';

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
	const menuList = ref([])
	const categoryList = ref([])
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
	const scrollTopArr = ref([])

	const packageListScrollTop = ref(0)

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
		// let itemLength = menu.packageList.length

		// todo
		// packageListScrollTop.value += 20
		const id = menu.id
		const query = uni.createSelectorQuery()
		query.selectAll('.package-menu-group').boundingClientRect(data => {
			// console.log(data)
			// for(let i=0; i< data.length; i++) {
			// 	if(id == data[i].dataset['id']) {
			// 		console.log("asd", data[i])
			// 		packageListScrollTop.value = data[i].top
			// 	}
			// }
			packageListScrollTop.value = 0

		}).exec();
		// uni.pageScrollTo({
		// 	selector: '.package-menu-group'
		// })
	}

	const onAddCart = (pkg) => {
		// todo 添加购物车
		goodNavOptions.value[1].info++
		console.log(pkg)
	}

	// ======================  钩子 ========================
	onReady(async () => {
		const result = await request.get('/package/menu')
		menuList.value = result.data
		categoryList.value = result.data
		console.log(result)
		
		nextTick(() => {
			const query = uni.createSelectorQuery().in(this)
			query.selectAll('.package-group').boundingClientRect(data => {
				let arr = [];
				for (let i = 0; i < data.length; i++) {
					arr.push(data[i].top - 80);
				}
				scrollTopArr.value = arr
				console.log(scrollTopArr.value)
			}).exec()
		})
		
	})

	const onMenuClick = (index) => {
		console.log(index, scrollTopArr.value)
		uni.pageScrollTo({
			scrollTop: scrollTopArr.value[index]
		})
	}
</script>


<style scoped lang="scss">
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

	.options {
		position: sticky;
		top: 88rpx;
		height: 160rpx;
		background-color: bisque;
		z-index: 1;
	}

	.main {
		display: flex;
		justify-content: space-between;

		.menu-list {
			position: sticky;
			top: calc(88rpx + 160rpx);
			background-color: aqua;
			bottom: 100rpx;
			width: 200rpx;
			height: calc(100vh - 100rpx - 88rpx - 160rpx);

			.menu-item {
				height: 200rpx;
				background-color: red;
				display: flex;
				justify-content: center;
				margin-bottom: 5rpx;

				text {
					align-self: center;
					font-size: 1rem;
					line-height: 1rem;
					text-align: center;
				}
			}

		}

		.package-list {
			.package-group {
				.package-item {
				
					margin: 10rpx 0;
					height: 250rpx;
					width: 500rpx;
					background-color: seagreen;
					position: relative;
				
					display: flex;
					
					&:first {
						margin-top: 0;
					}
				
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
	}

	.padding {
		width: 1rpx;
		height: 500rpx;
	}
	
	.goods-nav {
		height: 100rpx;
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
	}
</style>