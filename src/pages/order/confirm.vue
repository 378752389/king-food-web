<template>
  <view class="confirm-order">
    <uni-card>
      <uni-section type="line" title="店铺信息" padding>
        <view>
          <view class="shop-info">
            <view class="name">{{ shopInfo.name }}</view>
            <view
              >{{ shopInfo.distance }}<uni-icons type="location-filled"
            /></view>
          </view>
          <view class="meal-way">
            <view
              @tap="onTapMeal(1)"
              :class="['meal-way-item', { active: mealWay === 1 }]"
            >
              <image class="meal-way-pic" src="/static/logo.png"></image>
              <view>
                <view>堂食</view>
                <view class="subtitle">店内就餐</view>
              </view>
            </view>

            <view
              :class="['meal-way-item', 'disable', { active: mealWay === 2 }]"
            >
              <image class="meal-way-pic" src="/static/logo.png"></image>
              <view>
                <view>外卖</view>
                <view class="subtitle">打包带走</view>
              </view>
            </view>
          </view>
        </view>
      </uni-section>
    </uni-card>

    <uni-card>
      <uni-section type="line" title="餐品详情">
        <uni-list>
          <uni-list-item
            class="package-item"
            :key="cart.id"
            v-for="(cart, index) in cartStore.cartList"
          >
            <template #header>
              <image class="package-pic" :src="cart.pic"></image>
            </template>
            <template #body>
              <view class="package-detail">
                <view class="title">{{ cart.name }}</view>
                <view
                  class="content"
                  :key="product.id"
                  v-for="product in cart.productList"
                  >x{{ product.count }} {{ product.name }}</view
                >
              </view>
            </template>
            <template #footer>￥{{ cart.price }}</template>
          </uni-list-item>
        </uni-list>
      </uni-section>
    </uni-card>

    <uni-card>
      <uni-section type="line" title="价格明细">
        <uni-list>
          <uni-list-item title="商品小计">
            <template #footer> ￥{{ 100 }} </template>
          </uni-list-item>

          <uni-list-item title="优惠券" link>
            <template #footer>
              <uni-tag type="error" text="有3张可用" />
            </template>
          </uni-list-item>

          <uni-list-item title="积分" link>
            <template #footer>
              <uni-tag type="error" text="最高可抵扣￥10" />
            </template>
          </uni-list-item>
        </uni-list>

        <text>合计￥80</text>
      </uni-section>
    </uni-card>

    <uni-card>
      <uni-list>
        <uni-list-item title="备注" link>
          <template #footer> 口味、偏好等要求 </template>
        </uni-list-item>

        <uni-list-item title="开票方式">
          <template #footer> 详情请咨询店长 </template>
        </uni-list-item>
      </uni-list>
    </uni-card>

    <!-- todo 填充盒子，填充确认订单按钮的高度 -->
    <view style="height: 100rpx"></view>

    <view
      class="sumary"
      :style="{ paddingBottom: safeAreaInsets.bottom + 'px' }"
    >
      <view class="amount"> 合计: ￥{{ 99.99 }} </view>
      <view class="order-btn" @tap="onPayOrderTap">提交订单</view>
    </view>
  </view>
</template>

<script setup>
import { ref } from "vue";
import { useCartStore } from "../../store/cart";
const { safeAreaInsets } = uni.getSystemInfoSync();
const cartStore = useCartStore();

const shopInfo = ref({
  name: "和平白港城店",
  distance: "1.1km",
});

const mealWay = ref(1);

const onTapMeal = (n) => {
  mealWay.value = n;
};

const onPayOrderTap = () => {
  uni.getProvider({
    service:'oauth',
    success: (res) => {
        console.log(res)
    }
  })



  // 微信支付
  // uni.requestPayment({
  //   provider: "wxpay",
  //   timeStamp: String(Date.now()),
  //   nonceStr: "A1B2C3D4E5",
  //   package: "prepay_id=wx20180101abcdefg",
  //   signType: "MD5",
  //   paySign: "",
  //   success(res) {
  //     console.log(res);
  //   },
  //   fail(e) {
  //     console.log(e);
  //   },
  // });
};
</script>

<style lang="less" scoped>
.confirm-order {
  padding-bottom: 100rpx;
  .shop-info {
    display: flex;
    justify-content: space-between;
    margin-bottom: 30rpx;

    .name {
      font-size: 1.4rem;
    }
  }

  .meal-way {
    display: flex;
    justify-content: space-around;

    .meal-way-item {
      display: flex;
      padding: 5rpx 20rpx;
      position: relative;
      border: 4rpx solid transparent;

      .subtitle {
        font-size: 0.6rem;
        color: #a0a0a0;
      }

      &.active {
        border: 4rpx solid red;

        &::after {
          content: "";
          font-size: 1.6rem;
          color: white;
          background-color: red;
          position: absolute;
          right: 0;
          top: 0;
        }
      }

      &.disable {
        opacity: 0.4;
      }

      .meal-way-pic {
        width: 100rpx;
        height: 100rpx;
        margin: 0 10rpx;
      }
    }
  }

  .package-item {
    .package-pic {
      width: 100rpx;
      height: 100rpx;
    }

    .package-detail {
      margin-left: 30rpx;
      width: 300rpx;

      .title {
        font-size: 1.2rem;
        margin-bottom: 10rpx;
      }

      .content {
        font-size: 0.8rem;
      }
    }
  }

  .sumary {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    position: fixed;
    bottom: 0;
    background-color: white;

    .amount {
      margin-right: 30rpx;
      line-height: 100rpx;
    }

    .order-btn {
      margin-right: 30rpx;
      background-color: red;
      border-radius: 10rpx;
      text-align: center;
      line-height: 100rpx;
      color: white;
      width: 200rpx;
      height: 100rpx;
    }
  }
}
</style>
