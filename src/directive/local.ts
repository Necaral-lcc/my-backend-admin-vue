import type { Directive, DirectiveBinding } from "vue";
import { utcToLocalTime } from "@/utils/date";

const localTime: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const time = binding.value;
    if (!time) return;
    el.innerText = utcToLocalTime(time);
  },
  updated(el: HTMLElement, binding: DirectiveBinding) {
    const time = binding.value;
    if (!time) return;
    el.innerText = utcToLocalTime(time);
  }
};

export default localTime;
