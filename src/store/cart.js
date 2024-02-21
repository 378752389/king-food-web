import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useCartStore = defineStore(
  "cart",
  () => {
    const cartList = ref([]);

    const clearCartList = () => {
      cartList.value = [];
    };

    const setCartList = (list) => {
      cartList.value = list;
    };

    const addCartItem = (item) => {
      cartList.value.push(item);
      // todo 发送网络请求
    };

    const removeCartItem = (index) => {
      const target = cartList.value.splice(index, 1)[0]
      // todo 发送网路请求
    };
    return {
      cartList,
      clearCartList,
      setCartList,
      addCartItem,
      removeCartItem,
    };
  },
  {
    persist: {
      storage: {
        getItem: (key) => {
          return uni.getStorageSync(key);
        },
        setItem: (key, value) => {
          uni.setStorageSync(key, value);
        },
      },
    },
  }
);
