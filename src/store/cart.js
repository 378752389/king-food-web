import { defineStore } from "pinia";
import { computed, ref } from "vue";

// const cart = {
//   name: "芝士猪柳帕尼尼三件套",
//   pic: "http://image.wenking.fun/king-food/food/%E5%8F%AF%E4%B9%90.png",
//   price: 20,
//   stock: 1,
//   description: "超级好吃",
//   originPrice: 25,
//   productList: [
//     {
//       name: "芝士猪柳帕尼尼",
//       count: 1,
//     },
//   ],
// }

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
      // todo
      const cartItemIndex = cartList.value.findIndex((x) => x.id === item.id);
      if (cartItemIndex !== -1) {
        cartList.value[cartItemIndex].stock += 1;
      } else {
        item.stock = 1;
        cartList.value.push(item);
      }

      // todo 发送网络请求
    };

    const removeCartItem = (item) => {
      const cartItemIndex = cartList.value.findIndex((x) => x.id === item.id);
      const cartItem = cartList.value[cartItemIndex];
      if(cartItem.stock > 1) {
          cartList.value[cartItemIndex].stock -= 1;
      } else if (cartItem.stock === 1) {
        const target = cartList.value.splice(cartItemIndex, 1)[0];
      }
      
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
