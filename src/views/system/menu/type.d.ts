export type vMenu = Omit<vRoute, "id" | "children"> & {
  parentId: number;
  status: boolean;
  readonly id?: number;
};

export type vMenuTree = vRoute & {
  status: boolean;
};
