<template>
  <view class="recommend-item">
    <image :src="option.pic"></image>
  </view>
</template>
<script setup>
const props = defineProps({
  option: {
    id: Number,
    pic: String
  }
})
</script>
<style lang="scss" scoped>
  .recommend-item {
    border: 1px solid;
    height: 400rpx;
  }
</style>