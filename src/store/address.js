import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useAddressStore = defineStore(
  "address",
  () => {
    const addressList = ref([]);

    const defaultAddress = computed(() => {
      if (addressList.value.length === 0) {
        return undefined;
      }

      return addressList.value.find((x) => x.default);
    });

    const setAddressList = (val) => {
      // 地址列表不存在或长度为0，直接返回
      if (!val) {
        return;
      }

      //   // 找到默认地址的索引位置
      //   const index = val.findIndex((x) => x.default);

      //   // 将默认地址替换为列表的第一个位置
      //   if (index != 0) {
      //     const tmp = val[0];
      //     val[0] = val[index];
      //     val[index] = tmp;
      //   }

      addressList.value = val;
    };

    return {
      addressList,
      defaultAddress,
      setAddressList,
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
