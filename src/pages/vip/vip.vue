<template>
  <view class="vip">
    you konw, for test!

    <button
      size="default"
      type="default"
      style="color: #ffffff; background-color: #1aad19; border-color: #1aad19"
      hover-class="is-hover"
    >
      新菜单
    </button>
  </view>
</template>

<script setup>
import { onReady } from "@dcloudio/uni-app";
// 页面传参
const props = defineProps({
  name: String,
  age: Number,
});

onReady(() => {
  console.log(props);
});
</script>

<style scoped lang="scss"></style>
