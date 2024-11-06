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

type vToTree<T extends { id: number; parentId: number }> = T & {
  children: vToTree<T>[];
};

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

interface vAdminUserTable extends vAdminUser, vTime {
  role?: Pick<vRole, "id" | "name">;
  dept?: Pick<vDept, "id" | "name">;
}

type vAdminUserForm = Partial<vAdminUser>;

/**
 * 部门
 * @interface vDept
 * @property {number} id - 部门ID
 * @property {string} name - 部门名称
 * @property {string} description - 部门描述
 * @property {boolean} status - 部门状态
 * @property {number} parentId - 父级部门ID
 */
interface vDept {
  readonly id: number;
  name: string;
  description: string;
  status: boolean;
  parentId: number;
}
