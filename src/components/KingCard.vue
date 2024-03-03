<template>
  <view class="king-card">
    <image class="pic" :src="option.pic" mode="aspectFit"></image>
    <view class="content ellipsis">{{ option.text }}</view>
  </view>
</template>
<script setup>
const props = defineProps({
  option: {
    type: Object,
    default: {},
  },
});

</script>
<style lang="scss" scoped>
.item {
  width: 200px;
  position: absolute;
  border: 1px solid rgba(0, 0, 0, 0.1);
  .pic {
    width: 100%;
  }

  .content {
    font-size: 0.3rem;
  }
  
}
</style>
