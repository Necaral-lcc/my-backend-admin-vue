interface vMenuTree {
  id: number;
  title: string;
  parentId: number;
}

interface vTreeOption {
  value: number;
  label: string;
  children?: vTreeOption[];
}

interface vListOption {
  id: number;
  name: string;
  parentId: number;
}

interface vOption {
  id: number;
  name: string;
}
