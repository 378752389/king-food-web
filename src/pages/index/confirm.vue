<template>
	<view>
		<uni-card>
			<uni-section type="line" title="店铺信息" padding>
				<view>
					<view class="shop-info">
						<view class="name">和平百港城店</view>
						<view>1.1km<uni-icons type="location-filled" /></view>
					</view>
					<view class="meal-way">
						<view @tap="onTapMeal(1)" :class="['meal-way-item', {active: mealWay === 1}]">
							<image class="meal-way-pic" src="/static/logo.png"></image>
							<view>
								<view>堂食</view>
								<view class="subtitle">店内就餐</view>
							</view>
						</view>
				
						<view @tap="onTapMeal(2)" :class="['meal-way-item', {active: mealWay === 2}]">
							<image class="meal-way-pic" src="/static/logo.png"></image>
							<view>
								<view>外卖</view>
								<view class="subtitle">打包带走</view>
							</view>
						</view>
					</view>
				</view>
				
			</uni-section>
		</uni-card>

		<uni-card>
			<uni-section type="line" title="餐品详情">
				<uni-list>
					<uni-list-item class="package-item" v-for="(item, index) in 5">
						<template #header>
							<image class="package-pic" src="/static/logo.png"></image>
						</template>
						<template #body>
							<view class="package-detail">
								<view class="title">{{"吃过瘾炸鸡桶"}}</view>

								<view class="content">x{{3}} {{"吮指原味鸡"}}</view>
								<view class="content">x{{2}} {{"爆汁脆皮鸡"}}</view>
							</view>
						</template>
						<template #footer>￥{{30.11}}</template>
					</uni-list-item>
				</uni-list>
			</uni-section>
		</uni-card>

		<uni-card>
			<uni-section type="line" title="价格明细">
				<uni-list>
					<uni-list-item title="商品小计">
						<template #footer>
							￥{{100}}
						</template>
					</uni-list-item>

					<uni-list-item title="优惠券" link>
						<template #footer>
							<uni-tag type="error" text="有3张可用" />
						</template>
					</uni-list-item>

					<uni-list-item title="积分" link>
						<template #footer>
							<uni-tag type="error" text="最高可抵扣￥10" />
						</template>
					</uni-list-item>

				</uni-list>

				<text>合计￥80</text>
			</uni-section>
		</uni-card>

		<uni-card>
			<uni-list>
				<uni-list-item title="备注" link>
					<template #footer>
						口味、偏好等要求
					</template>
				</uni-list-item>

				<uni-list-item title="开票方式">
					<template #footer>
						详情请咨询店长
					</template>
				</uni-list-item>
			</uni-list>
		</uni-card>
	</view>
</template>

<script setup>
	import { ref } from 'vue';
	const mealWay = ref(1);

	const onTapMeal = (n) => {
		mealWay.value = n
	}
</script>

<style lang="less" scoped>
	.shop-info {
		display: flex;
		justify-content: space-between;
		margin-bottom: 30rpx;
		
		.name {
			font-size: 1.4rem;
		}
	}
	.meal-way {
		display: flex;
		justify-content: space-around;

		.meal-way-item {
			display: flex;
			padding: 5rpx 20rpx;
			position: relative;
			border: 4rpx solid transparent;

			.subtitle {
				font-size: 0.6rem;
				color: #a0a0a0;
			}

			&.active {
				border: 4rpx solid red;

				&::after {
					content: "";
					font-size: 1.6rem;
					color: white;
					background-color: red;
					position: absolute;
					right: 0;
					top: 0;
				}
			}


			.meal-way-pic {
				width: 100rpx;
				height: 100rpx;
				margin: 0 10rpx;
			}
		}


	}

	.package-item {
		.package-pic {
			width: 100rpx;
			height: 100rpx;
		}

		.package-detail {
			margin-left: 30rpx;
			width: 300rpx;

			.title {
				font-size: 1.2rem;
				margin-bottom: 10rpx;
			}

			.content {
				font-size: 0.8rem;
			}
		}
	}
</style>