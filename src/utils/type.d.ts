interface vSetList {
  id: number;
  parentId: number;
}

interface sList {
  id: number;
  parentId: number | null;
}

type ITree<T extends object> = T & {
  children: ITree<T>[];
};
