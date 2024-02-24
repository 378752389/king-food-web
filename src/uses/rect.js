import { getCurrentInstance, ref } from "vue";
export function useRect(className) {
  const rect = ref();
  const { proxy } = getCurrentInstance();
  uni
    .createSelectorQuery()
    .in(proxy)
    .selectAll(className)
    .boundingClientRect((rect) => {
      rect.value = rect;
    })
    .exec();

  return { rect };
}
