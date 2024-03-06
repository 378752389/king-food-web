<template>
  <view class="confirm-order">
    <uni-card>
      <uni-section type="line" title="店铺信息" padding>
        <view>
          <view class="shop-info">
            <view class="name">{{ confirmOrder?.shopInfo?.name }}</view>
            <view
              >{{ confirmOrder?.shopInfo?.distance }}<uni-icons type="location-filled"
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
              @tap="onTapMeal(2)"
              :class="['meal-way-item', { active: mealWay === 2 }]"
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
            :key="pkg.id"
            v-for="pkg in confirmOrder.pkgList"
          >
            <template #header>
              <image class="package-pic" :src="pkg.pic"></image>
            </template>
            <template #body>
              <view class="package-detail">
                <view class="title">{{ pkg.name }}</view>
                <view
                  class="content"
                  :key="product.id"
                  v-for="product in pkg.productList"
                  >x{{ product.productNum }} {{ product.name }}</view
                >
              </view>
            </template>
            <template #footer>
              <text style="font-size: 0.8rem;">x{{ pkg.buyCount }}</text> 
              <text style="margin-left: 20rpx; color: red;">￥{{ pkg.summaryAmount }}</text> 
              <text style="font-size: 0.7rem; margin-left: 20rpx; text-decoration: line-through;">¥{{ pkg.totalPrice }} </text>
            </template>
          </uni-list-item>
        </uni-list>
      </uni-section>
    </uni-card>

    <uni-card>
      <uni-section type="line" title="价格明细">
        <uni-list>
          <uni-list-item title="商品小计">
            <template #footer> ￥{{ confirmOrder.totalAmount }} </template>
          </uni-list-item>

          <uni-list-item title="优惠券" link @click="onCouponListClick">
            <template #footer>
              <uni-tag v-if="confirmOrder.couponList.length !== 0" type="error" :text="`有${confirmOrder.couponList.length || 0} 张优惠券可用`" />
              <uni-tag v-else type="error" text="没有优惠券可用" />
            </template>
          </uni-list-item>

          <uni-list-item title="积分" link @click="onIntegrationDetailClick">
            <template #footer>
              <uni-tag type="error" :text="`最高可抵扣￥${confirmOrder.maxIntegrationReduceAmount || 0}`" />
            </template>
          </uni-list-item>
        </uni-list>

        <!-- <text>合计￥{{ confirmOrder.payAmount }}</text> -->
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

    <!-- 优惠券弹窗 -->
    <uni-popup ref="couponListPopupRef" background-color="#fff">
      <coupon-list></coupon-list>
    </uni-popup>

    <!-- 积分弹窗 -->
    <uni-popup ref="integrationPopupRef" background-color="#fff">
      <integration-detail></integration-detail>
    </uni-popup>

    <view
      class="sumary"
      :style="{ paddingBottom: safeAreaInsets.bottom + 10 + 'px' }"
    >
      <view class="amount"> 合计: ￥{{ confirmOrder.payAmount }} </view>
      <view class="order-btn" @tap="onPayOrderTap">提交订单</view>
    </view>
  </view>
</template>

<script setup>
import { ref } from "vue";
import { useCartStore } from "../../store/cart";
import { onShow } from "@dcloudio/uni-app";
import { confirmOrderAPI, makeOrderAPI } from "../../api/order";
import CouponList from "@/pages/order/components/CouponList";
import IntegrationDetail from "@/pages/order/components/IntegrationDetail";


const { safeAreaInsets } = uni.getSystemInfoSync();
const cartStore = useCartStore();
const currentCouponId = ref();
const currentUseIntegration = ref();
const remark = ref();

const mealWay = ref(1);
const confirmOrder = ref({});

const onTapMeal = (n) => {
  mealWay.value = n;
};

onShow(async () => {
  const req = cartStore.cartList.map(x => {
    return {
      count: x.stock,
      pkgId: x.id
    }
  })

  const result = await confirmOrderAPI({
    pkgList: req
  })
  confirmOrder.value = result.data;
})
// 45.153.130.169


const onPayOrderTap = async () => {

  const pkgList = confirmOrder.value?.pkgList?.map(pkg => {
    return {
      pkgId: pkg.id,
      count: pkg.buyCount
    }
  })

  const result = await makeOrderAPI({
    mealWay: mealWay.value,
    couponId: currentCouponId.value,
    integration: currentUseIntegration.value,
    remark: remark.value,
    pkgList: pkgList
  })

  console.log("下单结果: ", result)

  uni.showToast({
    title: "下单成功！",
    icon: "success"
  })

  cartStore.clearCartList();

  uni.reLaunch({
    url: "/pages/order/result",
  })
};


const couponListPopupRef = ref();
const onCouponListClick = () => {
  couponListPopupRef.value.open('bottom');
}

const integrationPopupRef = ref();
const onIntegrationDetailClick = () => {
  integrationPopupRef.value.open('bottom');
}
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
        border: 4rpx solid rgba(0, 0, 0, 0.1);
        border-radius: 20rpx;

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

  .coupon-list {
    height: 500rpx;
  }
}
</style>
