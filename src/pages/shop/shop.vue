<template>
	<view>
		<uni-section title="商家信息" type="line">
			<uni-list>
				<uni-list-item>
					<template #body>
						<view class="contact">
							<view>
								<uni-icons type="location-filled" />
								深圳市宝安区福海街道
							</view>

							<view class="phone">
								<uni-icons type="phone" />
							</view>
						</view>
					</template>
				</uni-list-item>

				<uni-list-item>
					<template #body>
						<scroll-view class="shop-image-list" scroll-x="true">
							<image src="../../static/logo.png" v-for="(item, index) in 10" />
						</scroll-view>
					</template>
				</uni-list-item>

				<uni-list-item link>
					<template #body>
						<view class="contact">
							<view>
								<uni-icons type="location-filled" />
								查看食品安全档案
							</view>
						</view>
					</template>
				</uni-list-item>

				<uni-list-item link>
					<template #body>
						<view class="contact">
							<view>
								<uni-icons type="location-filled" />
								查看商家青山档案
							</view>
						</view>
					</template>
				</uni-list-item>
			</uni-list>

		</uni-section>

		<uni-section title="配送时间" type="line">
			<uni-list>
				<uni-list-item>
					<template #header>
						<view><uni-icons type="calendar-filled"></uni-icons></view>
					</template>
					<template #body>
						<view>08:30 - 23:00</view>
					</template>
				</uni-list-item>
			</uni-list>
		</uni-section>

		<uni-section title="商家服务" type="line">
			<uni-list>
				<uni-list-item>
					<template #header>
						<view><uni-icons type="calendar-filled"></uni-icons></view>
					</template>
					<template #body>
						<view>跨天预定</view>
					</template>
				</uni-list-item>
			</uni-list>
		</uni-section>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>

<style lang="less">
	.shop-image-list {

		image {
			width: 100rpx;
			height: 100rpx;
		}
	}

	.contact {
		width: 100%;
		display: flex;
		justify-content: space-between;

		.phone {
			width: 50rpx;
		}
	}
</style>