type BaseNode<K extends string, P extends string> = {
  [key in K]: string | number;
} & {
  [key in P]?: string | number | null;
};

type BaseTreeNode<K extends string, P extends string, T extends BaseNode<K, P>> = T & {
  children?: Array<BaseTreeNode<K, P, T>>;
};

export const buildTree = <K extends string, P extends string, T extends BaseNode<K, P>>(
  flatNodes: T[],
  key: K,
  parentKey: P
) => {
  const map = new Map<string | number, BaseNode<K, P>>();
  const tree: Array<BaseTreeNode<K, P, T>> = [];

  for (const node of flatNodes) {
    const current = (map.get(node[key]) || { ...node }) as BaseTreeNode<K, P, T>;
    Object.assign(current, node);
    map.set(node[key], current);

    if (node[parentKey] === null || node[parentKey] === undefined) {
      tree.push(current);
    } else {
      const parent = (map.get(node[parentKey]) || { ...current, [key]: node[parentKey] }) as BaseTreeNode<K, P, T>;

      if (!parent.children) {
        parent.children = [];
      }
      parent.children.push(current);
      map.set(node[parentKey], parent);
    }
  }

  return tree;
};
