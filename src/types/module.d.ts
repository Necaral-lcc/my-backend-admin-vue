import type { FormRules } from "element-plus";

export interface vDialogForm<T> {
  visible: boolean;
  title: string;
  data: T;
  rules: FormRules<T>;
}
