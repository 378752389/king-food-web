<template>
  <view class="content">
    <image class="logo" src="/static/logo.png"></image>
    <view class="text-area">
      <navigator url="/pages/index/menu">
        <button
          size="default"
          type="default"
          style="
            color: #ffffff;
            background-color: #1aad19;
            border-color: #1aad19;
          "
          hover-class="is-hover"
        >
          菜单
        </button>
      </navigator>

      <navigator url="/pages/index/confirm">
        <button
          size="default"
          type="default"
          style="
            color: #ffffff;
            background-color: #1aad19;
            border-color: #1aad19;
          "
          hover-class="is-hover"
        >
          确认订单
        </button>
      </navigator>
    </view>
  </view>
</template>

<script setup>
import { ref } from "vue";
import { onReady } from "@dcloudio/uni-app";

const title = ref("Hello, World!");
onReady(() => {
  const res = uni.getSystemInfoSync();
  console.log(res);
  console.log("onReady");
});

const jumpMenu = () => {
  uni.navigateTo({
    url: "/pages/index/menu",
  });
};
</script>

<style>
page {
  background-color: #f7f7f7;
}
.is-hover {
  color: rgba(255, 255, 255, 0.6);
  background-color: #179b16;
  border-color: #179b16;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin-top: 200rpx;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50rpx;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
