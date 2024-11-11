interface vUser {
  id: number;
  name: string;
  email: string;
  password: string;
  avatar: string;
  deptId: number;
}

interface vUserForm
  extends Pick<vUser, "email">,
    Partial<Omit<vUser, "email">> {
  deptId?: number;
}

interface vUserUpdate extends Partial<Omit<vUser, "id">>, Pick<vUser, "id"> {}

interface vUserTable extends vUser, vTime {
  dept: {
    id: number;
    name: string;
  };
}
