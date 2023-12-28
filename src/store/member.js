import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useMemberStore = defineStore('member', () => {
	const info = ref();

	const setInfo = (val) => {
		info.value = val
	}

	const getInfo = () => {
		return info.value
	}

	const clearInfo = () => {
		info.value = undefined
	}

	return {
		getInfo,
		setInfo,
		clearInfo
	}
}, {
	persist: {
		storage: {
			getItem: (key) => {
				return uni.getStorageSync(key)
			},
			setItem: (key, value) => {
				uni.setStorageSync(key, value)
			}
		}
	}
})