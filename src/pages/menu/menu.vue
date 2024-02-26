<template>
  <view class="menu">
    <advertise-list></advertise-list>
    <main-menu :menu-list="menuList"></main-menu>
  </view>
</template>

<script setup>
import MainMenu from "./components/MainMenu.vue";
import { onPageScroll, onReady } from "@dcloudio/uni-app";
import { useCartStore } from "../../store/cart";
import AdvertiseList from "@/pages/menu/components/AdvertiseList";
import { getMenuAPI } from "../../api/menu";
import { ref } from "vue";

onPageScroll((data) => {
  uni.$emit("onPageScroll", data.scrollTop);
  // console.log(data)
});

const cartStore = useCartStore();
const menuList = ref([]);
onReady(async () => {
  // 加载购物车列表
  // const cartList = mockLoadCartList();
  // cartStore.setCartList(cartList);

  const menu = await getMenuAPI();
  menuList.value = menu.data;
});
</script>

<style lang="scss" scoped></style>
