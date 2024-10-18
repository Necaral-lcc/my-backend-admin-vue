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
  email: string;
  avatar: string;
  phone: string;
  role: string;
  router: vRoute[];
  permissions: vUserPermission[];
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
 * @description: vRouteType type
 * @ page 页面路由
 * @ iframe 内嵌页面路由
 * @ link 链接路由
 */
type vRouteType = "folder" | "page" | "iframe" | "link";

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
  readonly id: number;
  name: string;
  title: string;
  path: string;
  component?: string;
  type: vRouteType;
  redirect?: string;
  keepAlive: boolean;
  needLogin: boolean;
  children?: vRoute[];
  link?: string;
}
