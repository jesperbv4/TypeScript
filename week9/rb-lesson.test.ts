import { make_empty_tree, is_empty_tree, is_red, build_tree, insert, RBTree, search, left_branch, right_branch, RBTreeNode } from '../lib/red-black-tree';
import { list } from '../lib/list'

const init_tree = insert(make_empty_tree(), 5, "a");
const large_tree = build_tree(list([1, "a"], [3, "b"], [5, "c"], [7, "d"],
                                    [9, "e"], [11, "f"], [13, "g"]));


test('empty tree is indeed empty', () => {
    expect(is_empty_tree(make_empty_tree())).toBe(true);
});

test('the element is indeed black', ()=> {
    expect(is_red(init_tree)).toBe(false);
});

test('search is working', () => {
    expect(search(large_tree, 1)).toBe("a");
    expect(search(large_tree, 10)).toBe(undefined);
});

test('tree contains a red leaf', () => {
    const tr = insert(init_tree, 3, "b");
    const leaf = left_branch(tr);
    expect(!is_empty_tree(leaf) && is_red(leaf)).toBe(true);
});

// test('tree equality', () => {
//     const init_tree = insert(make_empty_tree(), 5, "a");
//     const tree1 = insert(insert(init_tree, 3, "b"), 7, "c");
//     const tree2 = insert(insert(init_tree, 3, "b"), 7, "c");
//     expect(tree1).toBe(tree2);
//     expect(tree1).toStrictEqual(tree2);
// });