<template>
  <view class="card-item">
    <image
      class="pic"
      mode="aspectFit"
      :src="option.pic"
    ></image>
    <view class="main">
      <view class="title">{{ option.name }}</view>
      <view class="description">{{ option.description }}</view>
      <view class="amount">
        <text class="real-amount">¥{{ option.promotionPrice }}</text>
        <text class="init-amount">¥{{ option.totalPrice }}</text>
      </view>
    </view>

    <view class="add-btn" @tap="onAddTap">添加</view>
  </view>
</template>
<script setup>
import { ref } from "vue";

const props = defineProps({
  option: {
    id: Number,
    name: String,
    description: String,
    price: Number,
    originPrice: Number,
    pic: String
  }
})


const emit = defineEmits(['onAddTap'])
const onAddTap = () => {
  emit('onAddTap', props.option)
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
        font-size: 1rem;
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
