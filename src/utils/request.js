// const BASE_URL = "http://localhost:8080"
const send = (url, method = 'POST', data = {}, showLoading = true) => {
	uni.showLoading({
		title: '加载中'
	})
	return new Promise((resolve) => {
		uni.request({
			method: method,
			url: url,
			data: data,
			header: (() => {
				// todo 加载 token
				const headers = {
					'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhZG1pbklkIjoxLCJyb2xlIjoicm9sZSIsImNyZWF0ZVRpbWUiOjE3MDA3OTk0MTI4MDMsInN1YiI6ImFkbWluIiwiaXNzIjoia2luZy1mb29kLWFkbWluIiwiYXVkIjoia2luZy1mb29kLWFkbWluIiwiZXhwIjoxNzAwODAyNDEyLCJuYmYiOjE3MDA3OTk0MTJ9.Pc0Z-O2SvogcS_AD44YZVcvcL2-bWHV0g_9BZl5KT3g',
					// 'Content-Type': 'application/x-www-form-urlencoded'
					'Content-Type': 'application/json'
				}
				return headers
			})(),
			success: (res) => {
				resolve(res.data)
			}
		})
	})
}

export const request = {
	get: (url, data) => {
		try {
			return send(url, 'GET', data)
		} finally {
			uni.hideLoading()
		}

	},
	post: (url, data) => {
		try {
			return send(url, 'POST', data)
		} finally {
			uni.hideLoading()
		}
	}
}