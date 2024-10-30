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

/* export const privateRoutesRes: vRoute[] = [
  {
    id: 1,
    path: "/dashboard",
    name: "dashboard",
    title: "数据展示",
    component: "",
    type: 0,
    keepAlive: false,
    needLogin: true,
    children: [
      {
        id: 11,
        path: "total",
        name: "dashboardTotal",
        title: "数据统计",
        component: "dashboard/total",
        type: 1,
        keepAlive: false,
        needLogin: true
      },
      {
        id: 12,
        path: "dash",
        name: "dashboardDash",
        title: "数据可视化",
        component: "dashboard/dash",
        type: 1,
        keepAlive: false,
        needLogin: true
      }
    ]
  },
  {
    id: 2,
    path: "/system",
    name: "system",
    title: "系统管理",
    type: 0,
    redirect: "/system/admin",
    keepAlive: false,
    needLogin: true,
    children: [
      {
        id: 21,
        path: "admin",
        name: "systemAdmin",
        title: "后台人员管理",
        component: "system/admin",
        type: 1,
        keepAlive: true,
        needLogin: true
      },
      {
        id: 22,
        path: "dept",
        name: "systemDept",
        title: "部门管理",
        component: "system/dept",
        type: 1,
        keepAlive: true,
        needLogin: true
      },
      {
        id: 23,
        path: "menu",
        name: "systemMenu",
        title: "权限管理",
        component: "system/menu",
        type: 1,
        keepAlive: true,
        needLogin: true
      },
      {
        id: 24,
        path: "role",
        name: "systemRole",
        title: "角色管理",
        component: "system/role",
        type: 1,
        keepAlive: true,
        needLogin: true
      }
    ]
  }
];
 */
