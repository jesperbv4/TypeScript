"use strict";
exports.__esModule = true;
var list_1 = require("../lib/list");
function value(tree) {
    return (0, list_1.head)(tree);
}
function left_branch(tree) {
    return (0, list_1.head)((0, list_1.tail)(tree));
}
function right_branch(tree) {
    return (0, list_1.tail)((0, list_1.tail)(tree));
}
function make_tree(value, left, right) {
    return (0, list_1.pair)(value, (0, list_1.pair)(left, right));
}
function make_leaf(value) {
    return make_tree(value, make_empty_tree(), make_empty_tree());
}
function make_empty_tree() {
    return null;
}
function is_empty_tree(tree) {
    return tree === null;
}
// convenience function to print a tree in a simple textual format
function display_tree(tree) {
    return display_tree_helper(tree, "", true);
}
function display_tree_helper(tree, path, leftmost) {
    if (tree === null) {
        return;
    }
    else {
        var v = value(tree);
        // print tree label, with indentation pre-fixed
        console.log(path + "├─ " + v);
        // print right node first, then left
        if (leftmost) {
            display_tree_helper(right_branch(tree), "   " + path, false);
            display_tree_helper(left_branch(tree), "   " + path, leftmost);
        }
        else {
            display_tree_helper(right_branch(tree), path + "|  ", false);
            display_tree_helper(left_branch(tree), path + "|  ", leftmost);
        }
    }
}
function build_tree(elements) {
    function insert(tree, element) {
        if (tree === null) {
            return make_leaf(element);
        }
        else {
            var current = value(tree);
            var left = left_branch(tree);
            var right = right_branch(tree);
            return current > element
                ? make_tree(current, insert(left, element), right)
                : make_tree(current, left, insert(right, element));
        }
    }
    function build(tree, elements) {
        return elements === null
            ? tree
            : build(insert(tree, (0, list_1.head)(elements)), (0, list_1.tail)(elements));
    }
    return build(make_empty_tree(), elements);
}
