import { options } from "less";
import { useMemberStore } from "../store/member";

const baseURL = "/api";

const httpInterceptor = {
	invoke(options) {
		// 请求加载
		uni.showLoading({
			title: '加载中'
		})

		// 不包含协议头， 进行补充
		if (!options.url.startsWith('http')) {
			options.url = baseURL + options.url
		}
		// 设置请求超时时间
		if (!options.timeout) {
			options.timeout = 10000
		}

		// 自定义请求头
		// options.header = {
		//  ...options.header,
		// 	'X-Source': 'app'
		// }

		// 添加认证标识
		const memberStore = useMemberStore()
		const token = memberStore.getInfo()?.token
		if (token) {
			options.header['X-Custom-Token'] = token
		}

		console.log(options)
	},

	complete() {
		// 关闭加载请求
		uni.hideLoading()
	}
}

uni.addInterceptor('request', httpInterceptor)
uni.addInterceptor('uploadFile', httpInterceptor)

// 响应结果拦截，只返回data字段
uni.addInterceptor({
  returnValue(args) {
    // 只返回 data 字段
    return args.data
  }
})


export const request = (options) => {
	return new Promise((resolve, reject) => {
		uni.request({
			...options,
			success(res) {
				if (res.statusCode >= 200 && res.statusCode <= 300) {
					resolve(res)
				} else if (res.statusCode === 400) {
					const memberStore = useMemberStore()
					memberStore.clearInfo()
					uni.navigateTo({
						url: '/pages/mine/mine'
					})
					reject(res)
				}

			},
			fail(err) {
				uni.showToast({
					icon: 'none',
					title: '网路错误'
				})
				reject(err)
			}

		})
	})
}