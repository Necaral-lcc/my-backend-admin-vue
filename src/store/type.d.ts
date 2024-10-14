interface vUserInfo {
  id: number;
  name: string;
  email: string;
  avatar: string;
  phone: string;
  roles: string;
  router: vUserRouter[];
  permissions: vUserPermission[];
}

type vUserPermission = `${string}:${string}:${string}`;

interface vUserRouter {
  id: number;
  name: string;
  path: string;
  component: string;
  children: vUserRouter[];
}
