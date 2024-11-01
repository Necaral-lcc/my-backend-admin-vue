import type { RouteRecordRaw } from "vue-router";

export const privateRoutes: RouteRecordRaw = {
  path: "/",
  name: "home",
  meta: {
    needLogin: true,
    title: "首页"
  },
  children: [
    {
      path: "",
      name: "dashboard",
      meta: {
        needLogin: true,
        title: "数据展示"
      },
      children: [
        {
          path: "",
          name: "dashboardTotal",
          component: () => import("@/views/dashboard/total/index.vue"),
          meta: {
            needLogin: true,
            title: "统计"
          }
        },
        {
          path: "dash",
          name: "dashboardDash",
          component: () => import("@/views/dashboard/dash/index.vue"),
          meta: {
            needLogin: true,
            title: "数据"
          }
        }
      ]
    },
    {
      path: "/system",
      name: "system",
      meta: {
        needLogin: true,
        title: "数据"
      },
      redirect: "/system/admin",
      children: [
        {
          path: "admin",
          name: "systemAdmin",
          component: () => import("@/views/system/admin/index.vue"),
          meta: {
            needLogin: true,
            title: "后台人员管理"
          }
        },
        {
          path: "dept",
          name: "systemDept",
          component: () => import("@/views/system/dept/index.vue"),
          meta: {
            needLogin: true,
            title: "部门管理"
          }
        },
        {
          path: "menu",
          name: "systemMenu",
          component: () => import("@/views/system/menu/index.vue"),
          meta: {
            needLogin: true,
            title: "权限管理"
          }
        },
        {
          path: "role",
          name: "systemRole",
          component: () => import("@/views/system/role/index.vue"),
          meta: {
            needLogin: true,
            title: "角色管理"
          }
        }
      ]
    }
  ]
};
