interface vResponseData<T = any> {
  code: number;
  msg: string;
  data: T;
}

interface vTime {
  createdAt: string;
  updatedAt: string;
}

interface vUserLoginData {
  username: string;
  password: string;
}

interface vPageParams {
  page: number;
  pageSize: number;
}

interface vListResponse<T = any> extends vPageParams {
  list: T[];
  total: number;
}

/**
 * 管理员用户
 * @interface vAdminUser
 * @property {number} id - 用户ID
 * @property {string} name - 用户名
 * @property {string} nickname - 昵称
 * @property {string} email - 邮箱
 * @property {number} roleId - 角色ID
 * @property {number} deptId - 部门ID
 * @property {string} createdAt - 创建时间
 * @property {string} updatedAt - 更新时间
 */
interface vAdminUser {
  id: number;
  name: string;
  nickname: string;
  password: string;
  email: string;
  roleId: number;
  deptId: number;
  status: boolean;
}

type vAdminUserForm = Partial<vAdminUser>;
