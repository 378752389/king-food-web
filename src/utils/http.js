import { useMemberStore } from "../store/member";

const baseURL = "http://localhost:8081";

const httpInterceptor = {
  invoke(options) {
    // 请求加载
    uni.showLoading({
      title: "加载中",
    });

    // 不包含协议头， 进行补充
    if (!options.url.startsWith("http")) {
      options.url = baseURL + options.url;
    }
    // 设置请求超时时间
    if (!options.timeout) {
      options.timeout = 3000;
    }

    // 自定义请求头
    // options.header = {
    //  ...options.header,
    // 	'X-Source': 'app'
    // }

    // 添加认证标识
    const memberStore = useMemberStore();
    const token = memberStore.info?.token;
    if (token) {
      options.header["X-Custom-Token"] = token;
    }

    console.log("options", options);
  },

  complete() {
    // 关闭加载请求
    uni.hideLoading();
  },
};

uni.addInterceptor("request", httpInterceptor);
uni.addInterceptor("uploadFile", httpInterceptor);

export const request = (options) => {
  return new Promise((resolve, reject) => {
    uni.request({
      ...options,
      success(res) {
        if (res.statusCode >= 200 && res.statusCode <= 300) {
          // 正常结果返回
          resolve(res.data);
        } else if (res.statusCode === 401) {
          // 业务处理，登录过期
          const memberStore = useMemberStore();
          memberStore.clearInfo();
          uni.navigateTo({
            url: "/pages/mine/mine",
          });
          reject(res);
        }
      },
      fail(err) {
        uni.showToast({
          icon: "none",
          title: "网络错误",
        });
        reject(err);
      },
    });
  });
};
