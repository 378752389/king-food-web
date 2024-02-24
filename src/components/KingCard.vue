<template>
  <view class="king-card">
    <image class="pic" :src="item.pic"></image>
    <view class="content">这是一段简短的描述</view>
  </view>
</template>
<script setup></script>
<style lang="scss" scoped>
.item {
  width: 200px;
  position: absolute;
  border: 1px solid rgba(0, 0, 0, 0.1);
  .pic {
    width: 300rpx;
    height: 450rpx;
  }
}
</style>
