<template>
  <view class="login">
    <view class="logo">
      welcome to&nbsp;<text class="app-name">king menu</text>
    </view>

    <view class="operate">
      <button
        class="login-btn"
        open-type="getPhoneNumber"
        @getphonenumber="onGetphonenumber"
      >
        手机号快捷登录
      </button>
    </view>
  </view>
</template>

<script setup>
import { onLoad } from "@dcloudio/uni-app";
import { useMemberStore } from "@/store/member";

onLoad(async () => {
  const res = await wx.login();
  console.log(res);
});

// 获取用户手机号码
const onGetphonenumber = (e) => {
  // console.log(e);

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
