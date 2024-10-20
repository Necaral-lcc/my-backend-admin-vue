import { onMounted, onBeforeUnmount, reactive } from "vue";

export const useWindowResize = () => {
  const windowSize = reactive({
    width: window.innerWidth,
    type: "xl",
    level: 4
  });

  function onResize(_: UIEvent) {
    windowSize.width = window.innerWidth;
    windowSize.type = getSizeName(windowSize.width);
    windowSize.level = windowSizeName.indexOf(windowSize.type);
  }
  onMounted(() => {
    window.addEventListener("resize", onResize);
  });
  onBeforeUnmount(() => {
    window.removeEventListener("resize", onResize);
  });

  return windowSize;
};

const windowSizeName = ["xs", "sm", "md", "lg", "xl"];

const windowSizeRange = [768, 992, 1200, 1920];

const getSizeName = (width: number) => {
  let i = 0;
  for (; i < windowSizeRange.length; i++) {
    if (width <= windowSizeRange[i]) {
      return windowSizeName[i];
    }
  }
  return windowSizeName[windowSizeName.length - 1];
};
