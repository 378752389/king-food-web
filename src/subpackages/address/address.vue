<template>
  <view class="address">
    <uni-swipe-action class="address-list">
      <uni-swipe-action-item
        v-for="item in addressStore.addressList"
        :key="item.id"
        :right-options="options"
        @click="onSwipeActionClick($event, item)"
      >
        <view class="item">
          <view class="left">
            <view class="address-info">{{
              item.province + item.city + item.distinct
            }}</view>
            <view class="address-detail">{{ item.detailAddress }}</view>

            <view class="contact">
              <view class="receiver">{{ item.receiver }}</view>
              <view class="phone">{{ item.phone }}  </view>
              <text v-if="item.default" class="default">默认</text>
            </view>
          </view>
          <view class="right">
            <navigator url="/subpackages/address/createAddress">
              <text class="iconfont icon-edit"></text>
            </navigator>
          </view>
        </view>
      </uni-swipe-action-item>
    </uni-swipe-action>

    <view
      class="op-area"
      :style="{ paddingBottom: safeAreaInsets.bottom + 'px' }"
    >
      <button
        class="add-address"
        :is-shadow="false"
        :style="{ paddingBottom: safeAreaInsets.bottom + 'px' }"
      >
        新建地址
      </button>
    </view>
  </view>
</template>

<script setup>
import { ref } from "vue";
import { onReady } from "@dcloudio/uni-app";
import { useAddressStore } from "../../store/address";

const { safeAreaInsets } = uni.getSystemInfoSync();

// 滑动选项设置
const options = ref([
  {
    text: "设为默认",
    style: {
      backgroundColor: "#007aff",
    },
  },
  {
    text: "删除",
    style: {
      backgroundColor: "#dd524d",
    },
  },
]);

const mockGetAddressInfoAPI = () => {
  return [
    {
      id: 1,
      receiver: "king",
      phone: "18312344321",
      province: "湖南省",
      city: "株洲市",
      distinct: "天元区",
      detailAddress: "马家河街道春藤小镇2栋2706",
      default: true,
    },
    {
      id: 2,
      receiver: "king",
      phone: "18312344321",
      province: "广东省",
      city: "深圳市",
      distinct: "宝安区",
      detailAddress: "福海街道桥塘路紫丽阁宾馆2楼8221",
      default: false,
    },
  ];
};

const addressStore = useAddressStore();
onReady(() => {
  // 地址列表为空，加载地址信息，并设置
  if (addressStore.addressList.length === 0) {
    const res = mockGetAddressInfoAPI();
    // 设置地址信息
    addressStore.setAddressList(res);
  }
});

// 滑动点击事件
const onSwipeActionClick = (e, item) => {
  const { content, index } = e;

  if (content.text === "设为默认") {
    // 设置为默认地址
    setDefaultAddress(item);
  } else if (content.text === "删除") {
    // 删除地址
    deleteAddress(item);
  }
};

const setDefaultAddress = (item) => {
  // todo 发送http请求设置地址列表
  // 。。。

  // 获取地址列表
  const localAddressList = addressStore.addressList;
  // 遍历地址列表，将地址项不为item 的都设置为非默认地址，设置item为默认地址
  localAddressList.forEach((x) => {
    if (x.id === item.id) {
      x.default = true;
    } else {
      x.default = false;
    }
  });
  addressStore.setAddressList(localAddressList);
};

const deleteAddress = (item) => {
  // todo 发送http请求删除地址列表
  // 。。。

  // 遍历地址列表，将地址项不为item 的都设置为非默认地址，设置item为默认地址
  const localAddressList = addressStore.addressList.filter((x) => {
    return x.id !== item.id;
  });

  console.log(localAddressList);

  // 列表不存在，则设置数组为空
  if (!localAddressList) {
    localAddressList = [];
  }

  addressStore.setAddressList(localAddressList);
};
</script>

<style lang="scss" scoped>
.address {
  background-color: #f7f7f7;

  .address-list {
    .item {
      display: flex;
      justify-content: space-between;
      padding: 10rpx 0;

      .left {
        line-height: 2;
        text-indent: 1rem;
        .address-info {
          color: rgba(0, 0, 0, 0.5);
          font-size: 0.8rem;
        }

        .contact {
          display: flex;
          align-items: center;

          .receiver {
            flex: 1;
          }

          .phone {
            flex: 1;
            color: rgba(0, 0, 0, 0.7);
          }

          .default {
            margin-left: 6rpx;
            font-size: 0.9rem;
            background-color: rgba(255, 0, 0, 0.7);
            color: white;
          }
        }
      }

      .right {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 30rpx;

        .iconfont {
          font-size: 48rpx;
        }
      }
    }
  }

  .op-area {
    position: fixed;
    width: 100%;
    bottom: 0;

    .add-address {
      height: 100rpx;
      color: white;
      background-color: red;
    }
  }
}
</style>
