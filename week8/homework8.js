"use strict";
exports.__esModule = true;
var list_1 = require("../lib/list");
var binary_search_tree_1 = require("./binary_search_tree");
/* End of type declarations */
/*
    TASK 1: type the following Table functions
    ONLY add types, and otherwise DO NOT modify the code.
*/
function make_table() {
    return null;
}
// Adds (or updates) a key => value mapping in the table
function table_insert(t, k, v) {
    return t === null
        ? (0, binary_search_tree_1.make_leaf)((0, list_1.pair)(k, v))
        : (0, list_1.head)((0, binary_search_tree_1.value)(t)) === k
            ? (0, binary_search_tree_1.make_tree)((0, list_1.pair)(k, v), (0, binary_search_tree_1.left_branch)(t), (0, binary_search_tree_1.right_branch)(t))
            : (0, list_1.head)((0, binary_search_tree_1.value)(t)) > k
                ? (0, binary_search_tree_1.make_tree)((0, binary_search_tree_1.value)(t), table_insert((0, binary_search_tree_1.left_branch)(t), k, v), (0, binary_search_tree_1.right_branch)(t))
                : (0, binary_search_tree_1.make_tree)((0, binary_search_tree_1.value)(t), (0, binary_search_tree_1.left_branch)(t), table_insert((0, binary_search_tree_1.right_branch)(t), k, v));
}
function table_has_key(t, k) {
    return table_get_value(t, k) !== null;
}
function table_get_value(t, k) {
    return t === null
        ? null
        : (0, list_1.head)((0, binary_search_tree_1.value)(t)) === k
            ? (0, list_1.tail)((0, binary_search_tree_1.value)(t))
            : (0, list_1.head)((0, binary_search_tree_1.value)(t)) > k
                ? table_get_value((0, binary_search_tree_1.left_branch)(t), k)
                : table_get_value((0, binary_search_tree_1.right_branch)(t), k);
}
function display_table(t) {
    function concat(t) {
        return (0, binary_search_tree_1.is_empty_tree)(t)
            ? ""
            : concat((0, binary_search_tree_1.left_branch)(t)) + " (" + (0, binary_search_tree_1.value)(t) + "), " + concat((0, binary_search_tree_1.right_branch)(t));
    }
    console.log(concat(t));
}
// Small test program
var keys = ["b", "a", "c"];
var values = [2, 1, 3];
var table = make_table();
for (var i = 0; i < keys.length; i = i + 1) {
    table = table_insert(table, keys[i], values[i]);
}
display_table(table);
// /*
// /*
//     TASK 2: type the following Expression functions
//     ONLY add types, and otherwise DO NOT modify the code.
// */
// // define the following types:
// type BinaryExp = any;
// type Variable = any;
// type Literal = any;
// type Invalid = any;
// function make_binary_expression(tag, lhs, rhs) {
//     if (tag === "+" || tag === "-" || tag === "*" || tag === "/") {
//         return pair(tag, pair(lhs, rhs));
//     } else {
//         return pair("+", pair(lhs, rhs));
//     }
// }
// function get_lhs(exp) {
//     return head(tail(exp));
// }
// function get_rhs(exp) {
//     return tail(tail(exp));
// }
// function make_add(lhs, rhs) {
//     return make_binary_expression("+", lhs, rhs);
// }
// function make_sub(lhs, rhs) {
//     return make_binary_expression("-", lhs, rhs);
// }
// function make_mul(lhs, rhs) {
//     return make_binary_expression("*", lhs, rhs);
// }
// function make_div(lhs, rhs) {
//     return make_binary_expression("/", lhs, rhs);
// }
// function make_number(num) {
//     return pair("number", num);
// }
// function make_variable(name) {
//     return pair("variable", name);
// }
// function is_binary(exp) {
//     const tag = head(exp);
//     return tag === "+" || tag === "-" || tag === "*" || tag === "/";
// }
// function needs_parentheses(exp) {
//     const tag = head(exp);
//     return tag === "+" || tag === "-";
// }
// function get_operator(exp) { return head(exp); }
// function is_add(exp) { return head(exp) === "+"; }
// function is_sub(exp) { return head(exp) === "-"; }
// function is_mul(exp) { return head(exp) === "*"; }
// function is_div(exp) { return head(exp) === "/"; }
// // do not modify the function is_number
// function is_number(exp: Exp): exp is Literal { return head<string, any>(exp) === "number"; }
// function get_value(exp) { return tail(exp); }
// function is_variable(exp) { return head(exp) === "variable"; }
// function get_var_name(exp) { return tail(exp); }
// function evaluate(exp, env) {
//     function evaluate_binary(bin_exp) {
//         const lhs = evaluate(get_lhs(bin_exp), env);
//         const rhs = evaluate(get_rhs(bin_exp), env);
//         if (is_number(lhs) && is_number(rhs)) {
//             return is_add(bin_exp) ? make_number(get_value(lhs) + get_value(rhs))
//                 : is_sub(bin_exp) ? make_number(get_value(lhs) - get_value(rhs))
//                 : is_mul(bin_exp) ? make_number(get_value(lhs) * get_value(rhs))
//                 :               make_number(get_value(lhs) / get_value(rhs));
//         } else {
//             return make_add(lhs, rhs);
//         }
//     }
//     function evaluate_variable(exp) {
//         const var_name = get_var_name(exp);
//         return table_has_key(env, var_name)
//             ? make_number(table_get_value(env, var_name) as number)
//             : exp;
//     }
//     return is_number(exp)
//         ? exp
//         : is_variable(exp)
//         ? evaluate_variable(exp as Variable)
//         : evaluate_binary(exp as BinaryExp);
// }
// /*
//     Test code for task 2
// */
// const exp1 = make_mul(make_add(make_number(5), make_mul(make_number(6), make_number(8))), make_add(make_number(5), make_add(make_number(6), make_number(8))));
// const exp2 = make_add(make_number(5), make_add(make_mul(make_number(6), make_mul(make_number(8), make_number(5))), make_add(make_number(6), make_number(8))));
// // prints: [ 'number', 1007 ]
// console.log(evaluate(exp1, table));
// // prints: [ 'number', 259 ]
// console.log(evaluate(exp2, table));
// /*
//     TASK 3: implement and type the function pretty-print
//     DO NOT change the signature of this function, i.e. the number of arguments etc.
// */
// function pretty_print(exp: Exp) {
//     // write your code here
// }
// /*
//     Test code for task 3
// */
// // prints: (5 + 6 * 8) * (5 + 6 + 8)
// //console.log(pretty_print(exp1));
// // prints: 5 + 6 * 8 * 5 + 6 + 8
// //console.log(pretty_print(exp2));
