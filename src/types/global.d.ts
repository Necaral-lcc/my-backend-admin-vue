interface vMenuTree {
  id: number;
  name: string;
  parentId: number;
}

interface vMenuTreeObj {
  value: number;
  label: string;
  children?: vMenuTreeObj[];
}
