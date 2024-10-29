import type { DirectiveBinding, Directive } from "vue";
import { useUserStore } from "@/store/user";

const permission: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const userStore = useUserStore();
    const { value } = binding;
    if (value && !userStore.hasPermission(value)) {
      el.parentNode?.removeChild(el);
    }
  }
};

export default permission;
