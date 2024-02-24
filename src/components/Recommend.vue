<template>
  <view class="recommend">
    <water-fall :itemList="itemList">
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
    });
  }
  return tmp;
};
const itemList = ref([]);
onReady(() => {
  let n = 9;
  itemList.value = generatePics(n);
});
</script>
<style lang="scss" scoped></style>
