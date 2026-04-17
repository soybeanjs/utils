import { describe, expect, it } from 'vitest';

import { buildTree, getTreePaths } from './tree';

type TestTreeNode = {
  id: number;
  children?: TestTreeNode[];
};

describe('tree utils', () => {
  it('builds a nested tree from flat nodes', () => {
    const flatNodes = [
      { id: 2, pid: 1, name: 'child' },
      { id: 1, pid: null, name: 'root' },
      { id: 3, pid: 2, name: 'grandchild' }
    ];

    const tree = buildTree(flatNodes, 'id', 'pid');

    expect(tree).toHaveLength(1);
    expect(tree[0].id).toBe(1);
    expect(tree[0].children).toHaveLength(1);
    expect(tree[0].children?.[0].id).toBe(2);
    expect(tree[0].children?.[0].children?.[0].id).toBe(3);
  });

  it('gets the path to a nested node', () => {
    const nodes: TestTreeNode[] = [
      {
        id: 1,
        children: [
          {
            id: 2,
            children: [{ id: 3 }]
          }
        ]
      }
    ];

    const paths = getTreePaths('id', 3, nodes);

    expect(paths).toEqual([1, 2, 3]);
  });

  it('returns an empty array when the target node does not exist', () => {
    const nodes: TestTreeNode[] = [
      {
        id: 1,
        children: [{ id: 2 }]
      }
    ];

    const paths = getTreePaths('id', 9, nodes);

    expect(paths).toEqual([]);
  });

  it('supports falsy target values like 0', () => {
    const nodes: TestTreeNode[] = [
      {
        id: 0,
        children: [{ id: 1 }]
      }
    ];

    const paths = getTreePaths('id', 0, nodes);

    expect(paths).toEqual([0]);
  });
});
