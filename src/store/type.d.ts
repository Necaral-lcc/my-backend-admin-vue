/**
 * @description: vUserInfo interface
 * @id number 用户id
 * @name string 用户名称
 * @email string 用户邮箱
 * @avatar string 用户头像
 * @phone string 用户手机号
 * @role string 用户角色
 * @router vRoute[] 用户路由
 * @permissions vUserPermission[] 用户权限
 */
interface vUserInfo {
  id: number;
  name: string;
  nickname: string;
  email: string;
  deptId: number | null;
}

type vUserPermission = `${string}:${string}:${string}`;

/**
 * @description: vCacheView interface
 * @id number 缓存视图id
 * @name string 缓存视图名称
 * @path string 缓存视图路径
 * @component string 缓存视图组件
 * @cache boolean 是否缓存
 */
interface vCacheView {
  id: number;
  name: string;
  path: string;
  component: string;
  cache: boolean;
}

/**
 * @description: vRoute interface
 * @id number 路由id
 * @name string 路由名称
 * @title string 路由标题
 * @path string 路由路径
 * @component string 路由组件
 * @type vRouteType 路由类型
 * @redirect string 重定向路径
 * @keeAlive boolean 是否缓存
 * @needLogin boolean 是否需要登录
 * @children vRoute[] 子路由
 */
interface vRoute {
  id: number;
  name: string;
  path: string;
  title: string;
  icon: string;
  component?: string;
  redirect?: string | null;
  type: number;
  link: string | null;
  parentId: number;
  permission: string | null;
  keepAlive: boolean;
  needLogin: boolean;
  children: vRoute[];
}
/**
 * @description: vMenuType 路由类型
 * @enum 0 目录 1 菜单 2 按钮 3 外链 4 按钮
 */
type vMenuType = 0 | 1 | 2 | 3 | 4;

interface vUserInfoResponse {
  info: vUserInfo;
  routes: vRoute[];
  permission: string[];
}
