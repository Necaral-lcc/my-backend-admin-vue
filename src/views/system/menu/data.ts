import type { vMenu } from "@/api/system/menu";

export const pageTypeList = [
  {
    key: 0,
    name: "目录"
  },
  {
    key: 1,
    name: "页面"
  },
  {
    key: 2,
    name: "内嵌"
  },
  {
    key: 3,
    name: "外部链接"
  },
  {
    key: 4,
    name: "按钮"
  }
];

export const dialogFormData_default: vMenu = {
  name: "",
  title: "",
  path: "",
  icon: "",
  component: "",
  status: true,
  type: 0,
  redirect: "",
  keepAlive: false,
  needLogin: true,
  parentId: 0,
  permission: "",
  link: ""
};
