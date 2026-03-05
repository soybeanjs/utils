import { describe, expect, it } from 'vitest';

import { buildTree } from './tree';

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
});
