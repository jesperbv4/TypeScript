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
function make_binary_expression(tag, lhs, rhs) {
    if (tag === "+" || tag === "-" || tag === "*" || tag === "/") {
        return (0, list_1.pair)(tag, (0, list_1.pair)(lhs, rhs));
    }
    else {
        return (0, list_1.pair)("+", (0, list_1.pair)(lhs, rhs));
    }
}
function get_lhs(exp) {
    return (0, list_1.head)((0, list_1.tail)(exp));
}
function get_rhs(exp) {
    return (0, list_1.tail)((0, list_1.tail)(exp));
}
function make_add(lhs, rhs) {
    return make_binary_expression("+", lhs, rhs);
}
function make_sub(lhs, rhs) {
    return make_binary_expression("-", lhs, rhs);
}
function make_mul(lhs, rhs) {
    return make_binary_expression("*", lhs, rhs);
}
function make_div(lhs, rhs) {
    return make_binary_expression("/", lhs, rhs);
}
function make_number(num) {
    return (0, list_1.pair)("number", num);
}
function make_variable(name) {
    return (0, list_1.pair)("variable", name);
}
function is_binary(exp) {
    var tag = (0, list_1.head)(exp);
    return tag === "+" || tag === "-" || tag === "*" || tag === "/";
}
function needs_parentheses(exp) {
    var tag = (0, list_1.head)(exp);
    return tag === "+" || tag === "-";
}
function get_operator(exp) { return (0, list_1.head)(exp); }
function is_add(exp) { return (0, list_1.head)(exp) === "+"; }
function is_sub(exp) { return (0, list_1.head)(exp) === "-"; }
function is_mul(exp) { return (0, list_1.head)(exp) === "*"; }
function is_div(exp) { return (0, list_1.head)(exp) === "/"; }
// do not modify the function is_number
function is_number(exp) { return (0, list_1.head)(exp) === "number"; }
function get_value(exp) { return (0, list_1.tail)(exp); }
function is_variable(exp) { return (0, list_1.head)(exp) === "variable"; }
function get_var_name(exp) { return (0, list_1.tail)(exp); }
function evaluate(exp, env) {
    function evaluate_binary(bin_exp) {
        var lhs = evaluate(get_lhs(bin_exp), env);
        var rhs = evaluate(get_rhs(bin_exp), env);
        if (is_number(lhs) && is_number(rhs)) {
            return is_add(bin_exp) ? make_number(get_value(lhs) + get_value(rhs))
                : is_sub(bin_exp) ? make_number(get_value(lhs) - get_value(rhs))
                    : is_mul(bin_exp) ? make_number(get_value(lhs) * get_value(rhs))
                        : make_number(get_value(lhs) / get_value(rhs));
        }
        else {
            return make_add(lhs, rhs);
        }
    }
    function evaluate_variable(exp) {
        var var_name = get_var_name(exp);
        return table_has_key(env, var_name)
            ? make_number(table_get_value(env, var_name))
            : exp;
    }
    return is_number(exp)
        ? exp
        : is_variable(exp)
            ? evaluate_variable(exp)
            : evaluate_binary(exp);
}
/*
    Test code for task 2
*/
var exp1 = make_mul(make_add(make_number(5), make_mul(make_number(6), make_number(8))), make_add(make_number(5), make_add(make_number(6), make_number(8))));
var exp2 = make_add(make_number(5), make_add(make_mul(make_number(6), make_mul(make_number(8), make_number(5))), make_add(make_number(6), make_number(8))));
// prints: [ 'number', 1007 ]
console.log(evaluate(exp1, table));
// prints: [ 'number', 259 ]
console.log(evaluate(exp2, table));
/*
    TASK 3: implement and type the function pretty-print
    DO NOT change the signature of this function, i.e. the number of arguments etc.
*/
function pretty_print(exp) {
    function remove_para(exp) {
        if (exp[0] === "(") {
            exp = exp.substring(1, exp.length - 1);
        }
        return exp;
    }
    function print_helper(exp, depth) {
        function print_bin(bin_exp) {
            var lhs = print_helper(get_lhs(bin_exp), depth + 1);
            var rhs = print_helper(get_rhs(bin_exp), depth + 1);
            if (needs_parentheses(bin_exp)) {
                lhs = remove_para(lhs);
                rhs = remove_para(rhs);
                if (depth === 0) {
                    return lhs + " " + print_op(bin_exp) + " " + rhs;
                }
                else {
                    return "(" + lhs + " " + print_op(bin_exp) + " " + rhs + ")";
                }
            }
            else {
                return lhs + " " + print_op(bin_exp) + " " + rhs;
            }
        }
        function print_lit(exp) {
            return get_value(exp).toString();
        }
        function print_var(exp) {
            return get_var_name(exp);
        }
        function print_op(exp) {
            return get_operator(exp);
        }
        return is_number(exp)
            ? print_lit(exp)
            : is_variable(exp)
                ? print_var(exp)
                : print_bin(exp);
    }
    return print_helper(exp, 0);
}
/*
    Test code for task 3
*/
// prints: (5 + 6 * 8) * (5 + 6 + 8)
console.log(pretty_print(exp1));
// prints: 5 + 6 * 8 * 5 + 6 + 8
console.log(pretty_print(exp2));
