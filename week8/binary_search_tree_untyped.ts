import { head, tail, pair} from '../lib/list';

type Tree<T> = Leaf | TreeNode<T>;
type Leaf = null;
type TreeNode<T> = [T, [Tree<T>, Tree<T>]];
type List<T> = null | [T, List<T>];

function value<T>(tree: TreeNode<T>): T {
	return head(tree);
}

function left_branch<T>(tree: TreeNode<T>): Tree<T> {
	return head(tail(tree));
}

function right_branch<T>(tree: TreeNode<T>): Tree<T> {
	return tail(tail(tree));
}

function make_tree<T>(value: T, left: Tree<T>, right: Tree<T>): Tree<T> {
	return pair(value, pair(left, right));
}

function make_leaf<T>(value: T): Tree<T> {
	return make_tree(value,
                 	make_empty_tree(),
                 	make_empty_tree());
}

function make_empty_tree<T>(): Tree<T> {
	return null;
}

function is_empty_tree<T>(tree: Tree<T>): tree is null {
	return tree === null;
}

// convenience function to print a tree in a simple textual format
function display_tree<T>(tree: Tree<T>): void {
    return display_tree_helper(tree, "", true);
}

function display_tree_helper<T>(tree: Tree<T>, path: string, leftmost: boolean): void {
    if (tree === null) {
        return;
    } else {
        const v = value(tree);
        // print tree label, with indentation pre-fixed
        console.log(path + "├─ " + v);

        // print right node first, then left
        if (leftmost) {
            display_tree_helper(right_branch(tree), "   " + path, false);
            display_tree_helper(left_branch(tree), "   " + path, leftmost);
        } else {
			display_tree_helper(right_branch(tree), path + "|  ", false);
			display_tree_helper(left_branch(tree), path + "|  ", leftmost);
        }
    }
}

function build_tree<L>(elements: List<L>): Tree<L> {
	function insert<L>(tree: Tree<L>, element: L): Tree<L> {
    	if (tree === null) {
        	return make_leaf(element);
    	} else {
        	const current = value(tree);
        	const left = left_branch(tree);
        	const right = right_branch(tree);

        	return current > element
            	? make_tree(current,
                        	insert(left, element),
                        	right)
            	: make_tree(current,
                        	left,
                        	insert(right, element));
    	}
	}
	function build<L>(tree: Tree<L>, elements: List<L>): Tree<L> {
    	return elements === null
        	? tree
        	: build(insert(tree, head(elements)),
                	tail(elements));
	}
	return build(make_empty_tree(),
             	elements);
}