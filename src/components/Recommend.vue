<template>
  <view class="recommend">
    <water-fall :itemList="itemList" :width="160">
      <template #default="scope">
        <king-card :option="scope.item"></king-card>
      </template>
    </water-fall>
  </view>
</template>
<script setup>
import WaterFall from "@/components/WaterFall";
import KingCard from "@/components/KingCard";
import { onReady } from "@dcloudio/uni-app";
import { ref } from "vue";
const generatePics = (n) => {
  let tmp = [];
  for (let i = 1; i <= n; i++) {
    tmp.push({
      id: i,
      pic: `https://picsum.photos/200/300?id=${i}`,
      text: "这是一段超级长的广告词"
    });
  }
  return tmp;
};
const itemList = ref([
  {
    id: 1,
    pic: 'https://pcp-pic.hwwt8.com/1/01012/images/100096376__ALL__M__20240111163443400.jpg',
    text: "点击进入"
  },
  {
    id: 2,
    pic: 'https://pcp-pic.hwwt8.com/1/01012/images/100098804__ALL__M__20240222100320398.jpg',
    text: "这是一段很长很长的广告词"
  },
  {
    id: 3,
    pic: "https://pcp-pic.hwwt8.com/1/01012/images/100096365__ALL__M__20240226141255996.jpg",
    text: "点击购买"
  }
]);
onReady(() => {
  // let n = 9;
  // itemList.value = generatePics(n);
});
</script>
<style lang="scss" scoped></style>
