<template>
  <view class="card-item">
    <image
      class="pic"
      mode="aspectFit"
      :src="options.pic"
    ></image>
    <view class="main">
      <view class="title">{{ options.name }}</view>
      <view class="description">{{ options.description }}</view>
      <view class="amount">
        <text class="real-amount">{{ options.price }}</text>
        <text class="init-amount">{{ options.originPrice }}</text>
      </view>
    </view>

    <view class="add-btn" @tap="onAddTap">添加</view>
  </view>
</template>
<script setup>
import { ref } from "vue";

const options = ref({
  name: "可乐",
  description: "清凉一夏，身轻预约",
  price: 5,
  originPrice: 10,
  pic: 'http://image.wenking.fun/king-food/food/%E5%8F%AF%E4%B9%90.png'
});

const emit = defineEmits(['onAddTap'])
const onAddTap = () => {
  emit('onAddTap', options.value)
}

</script>
<style lang="scss" scoped>
.card-item {
  display: flex;
  justify-content: flex-start;
  position: relative;
  .pic {
    width: 200rpx;
    height: 200rpx;
  }
  .main {
    flex: 1;
    padding-top: 20rpx;

    .title {
      font-weight: 700;
    }

    .description {
      font-size: 20rpx;
      color: rgba(0, 0, 0, 0.7);
    }

    .amount {
      display: flex;
      font-size: 50rpx;

      .real-amount {
        color: red;
      }

      .init-amount {
        font-size: 0.7rem;
        text-decoration: line-through;

        margin-left: 30rpx;
        vertical-align: bottom;
      }
    }
  }

  .add-btn {
    position: absolute;
    bottom: 20rpx;
    right: 20rpx;
  }
}
</style>
