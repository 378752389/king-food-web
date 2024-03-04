<template>
  <view class="content">
    <view class="title">King Menu</view>
    <view class="btn-area">
      <button
        class="king-primary-btn btn-item"
        size="default"
        type="default"
        @click="onMenuClick"
      >
        菜单
      </button>
      <button
        class="king-primary-btn btn-item"
        size="default"
        type="default"
        @click="onTestClick"
      >
        其他
      </button>
    </view>

    <recommend></recommend>
  </view>
</template>

<script setup>
import { ref } from "vue";
import { onReady } from "@dcloudio/uni-app";
import Recommend from "@/components/Recommend";
import { getMenuAPI } from "../../api/menu";

const title = ref("Hello, World!");
onReady(async () => {
   const res = await getMenuAPI();
   console.log(res);
});

const onMenuClick = () => {
  uni.navigateTo({
    url: "/pages/menu/menu",
  });
};

const onTestClick = () => {
  uni.navigateTo({
    url: "/pages/vip/vip?name=hello&age=25",
  });
};
</script>

<style lang="scss" scoped>
.title {
  text-align: center;
  margin-top: 10vh;
  font-size: 100rpx;
  font-weight: bold;
  /* 这里可以随意加样式 */

  background: rgba(255, 0, 0, 0.7)
    linear-gradient(
      -135deg,
      transparent 25%,
      transparent 40%,
      rgba(3, 194, 205, 0.3) 40%,
      /* 这两个值是滑动条的颜色 */ rgba(99, 100, 100, 0.3) 60%,
      /* 默认是绿色 自己更改即可 */ transparent 60%,
      transparent
    );
  background-size: 60px 60px;
  background-repeat: no-repeat;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: scratchy 3s linear infinite;

  @keyframes scratchy {
    0% {
      background-position: -100% 0;
    }
    100% {
      background-position: 130% 0;
    }
  }
}

.btn-area {
  display: flex;
  justify-content: center;
  margin: 100rpx 0;

  .button-item {
    flex: 1;
  }
}
</style>
