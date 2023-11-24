<template>
	<view>
		<view class="box"></view>
		<view class="sticky"></view>
		<view class="box"></view>
		<view class="box"></view>
	</view>
</template>

<script setup>

</script>

<style>
	.sticky {
		position: sticky;
		top: 200rpx;
		height: 300rpx;
		background-color: darkgreen;
	}

	.box {
		margin: 100rpx 0;
		height: 1000rpx;
		background-color: darkred;
	}
</style>