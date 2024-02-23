import { defineStore } from "pinia";
import { ref } from "vue";

// const info = {
//   token: ''
// }
export const useMemberStore = defineStore(
  "member",
  () => {
    const info = ref();

    const setInfo = (val) => {
      info.value = val;
    };

    const clearInfo = () => {
      info.value = undefined;
    };

    return {
      info,
      setInfo,
      clearInfo,
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
