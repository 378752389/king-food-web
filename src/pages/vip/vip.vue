<template>
  <view class="vip">
    you konw, for test!

    <button
      size="default"
      type="default"
      style="color: #ffffff; background-color: #1aad19; border-color: #1aad19"
      hover-class="is-hover"
      @click="onBtnClick"
    >
      新菜单
    </button>

    <button
      size="default"
      type="default"
      style="color: #ffffff; background-color: #1aad19; border-color: #1aad19"
      hover-class="is-hover"
      open-type="getPhoneNumber"
      @getphonenumber="onGetuserinfo"
    >
      获取用户信息
    </button>

    <water-fall>
    </water-fall>
  </view>
</template>

<script setup>
import { ref } from "vue";
import { onReady } from "@dcloudio/uni-app";
import { currentTimeAPI, wxMinLoginAPI } from "../../api/login";
import { useLocation } from "@/uses/location";
import WaterFall from "../../components/WaterFall.vue";
import KingCard from '@/components/KingCard';
// 页面传参
const props = defineProps({
  name: String,
  age: Number,
});

onReady(() => {
});

const onGetuserinfo = (info) => {
  uni.requestPayment({
    provider: "wxpay",
    timeStamp: String(new Date()),
    nonceStr: "A1B2C3D4E5",
    package: "prepay_id=wx20180101abcdefg",
    signType: "MD5",
    paySign: "",
    success: function (res) {
      console.log("success:" + JSON.stringify(res));
    },
    fail: function (err) {
      console.log("fail:" + JSON.stringify(err));
    },
  });
};

const onBtnClick = async () => {
  console.log(11);
  // const res = await currentTimeAPI()
  // console.log("res", res)

  uni.login({
    provider: "weixin",
    success: async (res) => {
      const code = res.code;
      if (code) {
        // todo 发送请求
        const loginRes = await wxMinLoginAPI(code);
        console.log(loginRes);
      }
    },
  });
};
</script>

<style scoped lang="scss"></style>
