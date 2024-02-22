<template>
  <view class="menu">
    <advertise-list></advertise-list>
    <main-menu></main-menu>
  </view>
</template>

<script setup>
import MainMenu from './components/MainMenu.vue';
import {onPageScroll, onReady} from '@dcloudio/uni-app';
import {useCartStore} from '../../store/cart';
import AdvertiseList from '@/pages/menu/components/AdvertiseList'

onPageScroll((data) => {
  uni.$emit('onPageScroll', data.scrollTop)
  // console.log(data)
} )


const cartStore =  useCartStore()

const mockLoadCartList = () => {
  return [
    {
      id: 1,
      pic: 'http://image.wenking.fun/king-food/food/%E5%8F%AF%E4%B9%90.png',
      name: '可乐',
      price: '5',
      originPrice: '10'
    }
  ]
}
onReady(() => {
  // 加载购物车列表
  // const cartList = mockLoadCartList();
  // cartStore.setCartList(cartList);
})
</script>

<style lang="scss" scoped></style>