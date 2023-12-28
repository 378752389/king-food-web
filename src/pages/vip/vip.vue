<template>
	<button @tap="setContent">setContent</button>
	<button @tap="getContent">getContent</button>
	<button @tap="clearContent">clearContent</button>
	
	<view class="uni-primary-bg" style="height: 300rpx; width: 300rpx;"></view>
</template>

<script setup>
	import { onShow } from '@dcloudio/uni-app'
	import {useMemberStore} from '../../store/member.js'
	import { request } from "../../utils/http";
	
	onShow(async () => {
		console.log(111)
		
		let resp = await request({
			url: 'http://localhost:8080/package/menu',
			method: 'get'
		})
		console.log(resp)
	})
	
	const memberStore = useMemberStore()
	
	const clearContent = () => {
		memberStore.clearInfo()
	}
	
	const setContent = () => {
		memberStore.setInfo({
			name: 'king',
			age: 22,
			addr: 'sz'
		})
	}
	
	const getContent = () => {
		console.log(memberStore.getInfo())
	}
</script>


<style scoped lang="scss">
</style>