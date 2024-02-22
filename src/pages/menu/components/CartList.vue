<template>
  <view class="cart-list">
    <view class="head">
      <view class="title">购物车</view>
      <view class="clear-cart" @tap="onClearCartTap">
        <text class="iconfont icon-delete"></text>清除购物车
      </view>
    </view>

    <view class="list">
      <view class="item" :key="cart.name" v-for="cart in cartStore.cartList">
        <view class="left">
          <image class="pic" :src="cart.pic"></image>
        </view>
        <view class="right">
          <text class="name">{{ cart.name }}</text>
          <view class="detail">
            <view
              class="detail-item"
              :key="item.name"
              v-for="item in cart.productList"
              >{{ "x" + item.count + " " + item.name }}</view
            >
          </view>
          <view class="summary">
            <view class="price">￥{{ cart.price }}</view>
            <view class="stock">
              <uni-icons @tap="onSubStockTap(cart)" type="minus" size="24" />
              <text class="sotck-count">{{ cart.stock }}</text>
              <uni-icons @tap="onAddStockTap(cart)" type="plus" size="24" />
            </view>
          </view>
        </view>
      </view>
    </view>

    <view>
      <button class="confirm" @click="onBuyClick">选好了</button>
    </view>

    <!-- <uni-popup ref="clearCartPopupRef" background-color="#fff">
      <uni-popup-dialog
        type="warn"
        cancelText="关闭"
        confirmText="确定"
        title="警告"
        content="请确认是否清空购物车？"
        @confirm="dialogConfirm"
        @close="dialogClose"
      ></uni-popup-dialog>
    </uni-popup> -->
  </view>
</template>
<script setup>
import { ref } from "vue";
import { useCartStore } from "../../../store/cart";

// const cartList = ref([
//   {
//     name: "芝士猪柳帕尼尼三件套",
//     pic: "http://image.wenking.fun/king-food/food/%E5%8F%AF%E4%B9%90.png",
//     price: 20,
//     stock: 1,
//     productList: [
//       {
//         name: "芝士猪柳帕尼尼",
//         count: 1,
//       },
//       {
//         name: "薯饼",
//         count: 1,
//       },
//       {
//         name: "中杯美式",
//         count: 1,
//       },
//     ],
//   },
// ]);

const onClearCartTap = () => {
  cartStore.clearCartList();
  uni.showToast({
    title: "清除购物车成功",
    icon: "none",
  });
};

const cartStore = useCartStore();

const onSubStockTap = (cart) => {
  cartStore.removeCartItem(cart);
};

const onAddStockTap = (cart) => {
  cartStore.addCartItem(cart);
};

const onBuyClick = () => {
  // todo
  uni.navigateTo({
    url: "/pages/order/confirm",
  });
};
</script>
<style lang="scss" scoped>
.cart-list {
  .head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 20rpx 10rpx 50rpx;

    .title {
      font-size: 20px;
      font-weight: bold;
    }

    .clear-cart {
      color: rgba(0, 0, 0, 0.7);
    }
  }

  .list {
    .item {
      margin-bottom: 20rpx;
      display: flex;
      .left {
        .pic {
          width: 120rpx;
          height: 120rpx;
        }
      }

      .right {
        flex: 1;
        .name {
          line-height: 1.5;
        }

        .detail {
          .detail-item {
            font-size: 20rpx;
            color: rgba(0, 0, 0, 0.6);
          }
        }

        .summary {
          display: flex;
          justify-content: space-between;
          margin: 20rpx 0;
          .price {
            color: red;
          }

          .stock {
            display: flex;
            justify-content: center;
            align-items: center;

            .sotck-count {
              margin: 0 20rpx;
            }
          }
        }
      }
    }
  }

  .confirm {
    background-color: red;
    color: white;
  }
}

.popup-center {
  position: fixed;
  top: 50% !important;
  left: 50% !important;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
</style>
