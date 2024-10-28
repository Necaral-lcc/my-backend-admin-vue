interface vMenuTree {
  id: number;
  title: string;
  parentId: number;
}

interface vMenuTreeObj {
  value: number;
  label: string;
  children?: vMenuTreeObj[];
}
