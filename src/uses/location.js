import { ref } from "vue";
export function useLocation() {
  const latitude = ref();
  const longitude = ref();
  const accuracy = ref();

  uni.getLocation({
    type: "wgs84",
    success: (result) => {
      latitude.value = result.latitude;
      longitude.value = result.longitude;
      accuracy.value = result.accuracy;
    },
    fail: (fail) => {
      uni.showToast({
        title: `加载位置失败~~~`,
      });
      console.log(fail);
    },
  });

  return { latitude, longitude, accuracy };
}
