<template>
  <view>
    <!-- 登录成功头部信息 -->
    <view v-if="memberStore.info" class="head">
      <view class="profile">
        <view class="avatar">
          <image :src="memberStore.info.avatar" mode="aspectFill"></image>
        </view>
        <view class="nickname">{{ memberStore.info.username }}</view>
      </view>

      <view class="system">
        <navigator hover-class="none" url="/subpackages/settings/settings">
          <view class="setting"
            ><text class="iconfont icon-settings"></text
          ></view>
        </navigator>
      </view>
    </view>

    <!-- 未登录头部信息 -->
    <view v-else class="head">
      <navigator url="/pages/login/login">
        <view class="profile">
          <view class="avatar">
            <image src="../../static/logo.png"></image>
          </view>
          <view class="nickname">点击登录</view>
        </view>
      </navigator>
    </view>

    <view class="body">
      <uni-card v-if="memberStore.info" class="vip-card">
        <view class="vip-card-title">
          <view class="vip-card-name"> 白金会员 </view>

          <view class="renewal">立即续费 ></view>
        </view>
        <view class="card-detail"> 还有360天过期，已省100元 </view>
        <view class="card-privilege">
          <view class="privilege-item" :key="item" v-for="(item, index) in 6">
            <image src="../../static/logo.png"></image>
            <view>早餐6折</view>
          </view>
        </view>
      </uni-card>

      <uni-card v-if="hasRecentOrder" class="order">
        <view class="order-title">
          <view>和平（百港城店）</view>
          <view>请取餐 ></view>
        </view>

        <view class="order-no"> A0066 </view>
        <view class="package">
          <view class="list">
            <image
              src="../../static/logo.png"
              :key="item"
              v-for="(item, index) in 2"
            ></image>
          </view>

          <view class="summary"> 共2件 </view>
        </view>
      </uni-card>

      <uni-card class="deduction">
        <view class="deduction-group">
          <view class="deduction-item">
            <view><text class="enhance">2000</text></view>
            <view>积分</view>
          </view>

          <view class="deduction-item">
            <view><text class="enhance">15</text>张</view>
            <view>优惠券</view>
          </view>
        </view>
      </uni-card>

      <uni-card class="service">
        <uni-grid :column="4" :highlight="true" @change="change">
          <uni-grid-item v-for="(item, index) in 6" :index="index" :key="index">
            <view class="grid-item-box">
              <uni-icons type="image" :size="30" color="#777" />
              <text class="text">文本信息</text>
            </view>
          </uni-grid-item>
        </uni-grid>
      </uni-card>
    </view>
  </view>
</template>

<script setup>
import { ref } from "vue";
import { useMemberStore } from "@/store/member";
import { onLoad } from "@dcloudio/uni-app";

const memberStore = useMemberStore();

onLoad(() => {
  console.log(memberStore.info);
});

const hasRecentOrder = ref(true);
</script>

<style lang="less">
.head {
  display: flex;
  justify-content: space-between;
  line-height: 100rpx;

  .profile {
    display: flex;
    height: 100rpx;

    .avatar > image {
      width: 100rpx;
      height: 100rpx;
      margin: 0 20rpx;
    }
  }

  .system {
    .setting {
      width: 70rpx;
      height: 70rpx;
      margin: 0 10rpx;
      // border: 1px solid;

      display: flex;
      justify-content: center;

      .iconfont {
        font-size: 48rpx;
      }
    }
  }
}

.body {
  margin: 40rpx 0;

  .vip-card {
    margin-bottom: 40rpx;

    .vip-card-title {
      display: flex;
      justify-content: space-between;
      margin: 20rpx 0;

      .vip-card-name {
        color: black;
        font-weight: bold;
        font-size: 1.3rem;
      }
    }

    .card-detail {
      margin: 10rpx;
    }

    .card-privilege {
      display: flex;
      flex-wrap: wrap;

      .privilege-item {
        text-align: center;
        width: 150rpx;

        image {
          width: 80rpx;
          height: 80rpx;
        }
      }
    }
  }

  .order {
    height: 300rpx;
    background-color: antiquewhite;

    .order-title {
      display: flex;
      justify-content: space-between;
    }

    .order-no {
      font-size: 2rem;
      color: red;
      margin: 50rpx 0;
    }

    .package {
      display: flex;
      justify-content: space-between;

      .list {
        & > image {
          width: 60rpx;
          height: 60rpx;
          margin: 0 10rpx;
        }

        & > image:nth-child(1) {
          margin-left: 0;
        }
      }

      .summary {
        align-self: center;
      }
    }
  }

  .deduction {
    .deduction-group {
      display: flex;
      justify-content: space-around;

      .deduction-item {
        flex: 1;
        text-align: center;
        border-right: 1rpx solid;

        .enhance {
          font-size: 1.2rem;
        }
      }

      .deduction-item:last-child {
        border-right: none;
      }
    }
  }

  .service {
    margin-top: 40rpx;

    .grid-item-box {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 15px 0;
    }
  }
}
</style>
