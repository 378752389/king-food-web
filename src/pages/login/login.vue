<template>
  <view class="login">
    <view class="logo">
      welcome to&nbsp;<text class="app-name">king menu</text>
    </view>

    <view class="operate">
      <button class="login-btn" open-type="getPhoneNumber" @click="onLoginClick">
        微信登录
      </button>

      <button class="login-btn" open-type="getPhoneNumber" @click="onMockLoginClick">
        模拟快捷登录
      </button>
    </view>
  </view>
</template>

<script setup>
import { onLoad } from "@dcloudio/uni-app";
import { useMemberStore } from "@/store/member";
import { wxMinLoginAPI } from "@/api/login";

// 获取用户手机号码
const onLoginClick = async () => {
  // todo mock登录数据

  uni.login({
    provider: "weixin",
    success: async (res) => {
      const code = res.code;
      console.log(code)
      if (code) {
        const loginResult = await wxMinLoginAPI(code);

        if (loginResult.code === 200) {
          // 登录成功，保存登录信息
          const memberStore = useMemberStore();
          memberStore.setInfo(loginResult.data);

          // 弹出登录提示
          uni.showToast({
            title: "登录成功！",
            duration: 500,
          });

          setTimeout(() => {
            uni.navigateBack();
          }, 500);
        }

      }
    },
  });
};


// 模拟快捷登录
const onMockLoginClick = () => {
  // todo mock登录数据
  const info = {
    username: "超级好吃的柠檬炸鸡柳",
    token: "asdf-fdsa-qwer-rewq-zxcv-vcxz",
    avatar: "https://avatars.githubusercontent.com/u/39339029?v4",
    address: "广东 深圳",
    loginTime: new Date(),
  };

  // 登录成功，保存登录信息
  const memberStore = useMemberStore();
  memberStore.setInfo(info);
  // 弹出登录提示
  uni.showToast({
    title: "登录成功！",
    duration: 500,
  });

  setTimeout(() => {
    uni.navigateBack();
  }, 500);
};
</script>

<style lang="less" scoped>
.login {
  display: flex;
  flex-direction: column;
  height: 100vh;

  .logo {
    flex: 1;

    display: flex;
    align-items: center;
    justify-content: center;

    font-size: 50rpx;

    .app-name {
      color: red;
    }
  }

  .operate {
    flex: 1;

    .login-btn {
      width: 80%;
    }
  }
}
</style>
