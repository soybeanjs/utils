type BaseFlattedNode<K extends string, P extends string> = {
  [key in K]: string | number;
} & {
  [key in P]?: string | number | null;
};

type BaseTreeFlattedNode<K extends string, P extends string, T extends BaseFlattedNode<K, P>> = T & {
  children?: Array<BaseTreeFlattedNode<K, P, T>>;
};

export const buildTree = <K extends string, P extends string, T extends BaseFlattedNode<K, P>>(
  flatNodes: T[],
  key: K,
  parentKey: P
) => {
  const map = new Map<string | number, BaseFlattedNode<K, P>>();
  const tree: Array<BaseTreeFlattedNode<K, P, T>> = [];

  for (const node of flatNodes) {
    const current = (map.get(node[key]) || { ...node }) as BaseTreeFlattedNode<K, P, T>;
    Object.assign(current, node);
    map.set(node[key], current);

    if (node[parentKey] === null || node[parentKey] === undefined) {
      tree.push(current);
    } else {
      const parent = (map.get(node[parentKey]) || { ...current, [key]: node[parentKey] }) as BaseTreeFlattedNode<
        K,
        P,
        T
      >;

      if (!parent.children) {
        parent.children = [];
      }
      parent.children.push(current);
      map.set(node[parentKey], parent);
    }
  }

  return tree;
};

type BaseNode<K extends string, V extends string | number> = {
  [key in K]: V;
};

type BaseTreeNode<K extends string, V extends string | number, T extends BaseNode<K, V>> = T & {
  children?: Array<BaseTreeNode<K, V, T>>;
};

export const getTreePaths = <K extends string, V extends string | number, T extends BaseNode<K, V>>(
  nodeKey: K,
  target: V,
  nodes: BaseTreeNode<K, V, T>[]
) => {
  const paths: V[] = [];

  if (!target) {
    return paths;
  }

  function dfs(node: BaseTreeNode<K, V, T>, path: V[]): V[] | null {
    const currentPath = [...path, node[nodeKey]];

    // if find the target value, return the path
    if (node[nodeKey] === target) {
      return currentPath;
    }

    // if there are child nodes, recursively search
    if (node.children && node.children.length > 0) {
      for (const child of node.children) {
        const result = dfs(child, currentPath);
        if (result) {
          return result;
        }
      }
    }

    // if not found, return null
    return null;
  }

  for (const node of nodes) {
    const result = dfs(node, []);
    if (result) {
      paths.push(...result);
      break; // exit loop once found
    }
  }

  return paths;
};
