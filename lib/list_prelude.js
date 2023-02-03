"use strict";
exports.__esModule = true;
exports.build_array = exports.all = exports.flatten = exports.fold_left = exports.accumulate = exports.list_ref = exports.enum_list = exports.filter = exports.remove_all = exports.remove = exports.member = exports.reverse = exports.list_to_string = exports.for_each = exports.build_list = exports.map = exports.length = exports.to_string = void 0;
var list_1 = require("../lib/list");
function empty_list() {
    return null;
}
function to_string(xs) {
    function print(s) {
        var tl = (0, list_1.tail)(s);
        return (0, list_1.is_null)(tl)
            ? (0, list_1.head)(s) + ""
            : (0, list_1.head)(s) + ", " + print(tl);
    }
    if (xs === null) {
        return "list()";
    }
    else {
        return "list(" + print(xs) + ")";
    }
}
exports.to_string = to_string;
// equal computes the structural equality
/* over its arguments
function equal(xs, ys) {
  return is_pair(xs)
  ? (is_pair(ys) &&
    equal(head(xs), head(ys)) &&
    equal(tail(xs), tail(ys)))
  : is_null(xs)
  ? is_null(ys)
  : is_number(xs)
  ? (is_number(ys) && xs === ys)
  : is_boolean(xs)
  ? (is_boolean(ys) && ((xs && ys) || (!xs && !ys)))
  : is_string(xs)
  ? (is_string(ys) && xs === ys)
  : is_undefined(xs)
  ? is_undefined(ys)
  : is_function(xs)
    // we know now that xs is a function,
    // but we use an if check anyway to make use of the type predicate
  ? (is_function(ys) && xs === ys)
  : false;
} */
// returns the length of a given argument list
// assumes that the argument is a list
function $length(xs, acc) {
    return (0, list_1.is_null)(xs) ? acc : $length((0, list_1.tail)(xs), acc + 1);
}
function length(xs) {
    return $length(xs, 0);
}
exports.length = length;
// map applies first arg f, assumed to be a unary function,
// to the elements of the second argument, assumed to be a list.
// f is applied element-by-element:
// map(f, list(1, 2)) results in list(f(1), f(2))
function $map(f, xs, acc) {
    return (0, list_1.is_null)(xs)
        ? reverse(acc)
        : $map(f, (0, list_1.tail)(xs), (0, list_1.pair)(f((0, list_1.head)(xs)), acc));
}
function map(f, xs) {
    return $map(f, xs, null);
}
exports.map = map;
// build_list takes a a function fun as first argument, 
// and a nonnegative integer n as second argument,
// build_list returns a list of n elements, that results from
// applying fun to the numbers from 0 to n-1.
function $build_list(i, fun, already_built) {
    return i < 0 ? already_built : $build_list(i - 1, fun, (0, list_1.pair)(fun(i), already_built));
}
function build_list(fun, n) {
    return $build_list(n - 1, fun, null);
}
exports.build_list = build_list;
// for_each applies first arg fun, assumed to be a unary function,
// to the elements of the second argument, assumed to be a list.
// fun is applied element-by-element:
// for_each(fun, list(1, 2)) results in the calls fun(1) and fun(2).
function for_each(fun, xs) {
    while (!(0, list_1.is_null)(xs)) {
        fun((0, list_1.head)(xs));
        xs = (0, list_1.tail)(xs);
    }
}
exports.for_each = for_each;
// list_to_string returns a string that represents the argument list.
// It applies itself recursively on the elements of the given list.
/* When it encounters a non-list, it applies to_string to it.
function $list_to_string(xs, cont) {
    return is_null(xs)
        ? cont("null")
        : is_pair(xs)
        ? $list_to_string(
              head(xs),
              x => $list_to_string(
                       tail(xs),
                       y => cont("[" + x + "," + y + "]")))
        : cont(stringify(xs));
} */
function list_to_string(xs) {
    return to_string(xs);
}
exports.list_to_string = list_to_string;
// reverse reverses the argument, assumed to be a list
function $reverse(original, reversed) {
    return (0, list_1.is_null)(original)
        ? reversed
        : $reverse((0, list_1.tail)(original), (0, list_1.pair)((0, list_1.head)(original), reversed));
}
function reverse(xs) {
    return $reverse(xs, null);
}
exports.reverse = reverse;
// append first argument, assumed to be a list, to the second argument.
// In the result null at the end of the first argument list
// is replaced by the second argument, regardless what the second
// argument consists of.
function $append(xs, ys, cont) {
    return (0, list_1.is_null)(xs)
        ? cont(ys)
        : $append((0, list_1.tail)(xs), ys, function (zs) { return cont((0, list_1.pair)((0, list_1.head)(xs), zs)); });
}
//export function append(xs, ys) {
//    return $append(xs, ys, xs => xs);
// }
// member looks for a given first-argument element in the
// second argument, assumed to be a list. It returns the first
// postfix sublist that starts with the given element. It returns null if the
// element does not occur in the list
function member(v, xs) {
    return (0, list_1.is_null)(xs)
        ? null
        : v === (0, list_1.head)(xs)
            ? xs
            : member(v, (0, list_1.tail)(xs));
}
exports.member = member;
// removes the first occurrence of a given first-argument element
// in second-argument, assmed to be a list. Returns the original
// list if there is no occurrence.
function $remove(v, xs, acc) {
    // Ensure that typechecking of append and reverse are done independently
    var app = list_1.append;
    var rev = reverse;
    return (0, list_1.is_null)(xs)
        ? app(rev(acc), xs)
        : v === (0, list_1.head)(xs)
            ? app(rev(acc), (0, list_1.tail)(xs))
            : $remove(v, (0, list_1.tail)(xs), (0, list_1.pair)((0, list_1.head)(xs), acc));
}
function remove(v, xs) {
    return $remove(v, xs, null);
}
exports.remove = remove;
// Similar to remove, but removes all instances of v
// instead of just the first
function $remove_all(v, xs, acc) {
    // Ensure that typechecking of append and reverse are done independently
    var app = list_1.append;
    var rev = reverse;
    return (0, list_1.is_null)(xs)
        ? app(rev(acc), xs)
        : v === (0, list_1.head)(xs)
            ? $remove_all(v, (0, list_1.tail)(xs), acc)
            : $remove_all(v, (0, list_1.tail)(xs), (0, list_1.pair)((0, list_1.head)(xs), acc));
}
function remove_all(v, xs) {
    return $remove_all(v, xs, null);
}
exports.remove_all = remove_all;
// filter returns the sublist of elements of the second argument
// (assumed to be a list), for which the given predicate function
// returns true.
function $filter(pred, xs, acc) {
    return (0, list_1.is_null)(xs)
        ? reverse(acc)
        : pred((0, list_1.head)(xs))
            ? $filter(pred, (0, list_1.tail)(xs), (0, list_1.pair)((0, list_1.head)(xs), acc))
            : $filter(pred, (0, list_1.tail)(xs), acc);
}
function filter(pred, xs) {
    return $filter(pred, xs, null);
}
exports.filter = filter;
// enumerates numbers starting from start,
// using a step size of 1, until the number exceeds end.
function $enum_list(start, end, acc) {
    // Ensure that typechecking of reverse are done independently
    var rev = reverse;
    return start > end
        ? rev(acc)
        : $enum_list(start + 1, end, (0, list_1.pair)(start, acc));
}
function enum_list(start, end) {
    return $enum_list(start, end, null);
}
exports.enum_list = enum_list;
// Returns the item in xs (assumed to be a list) at index n,
// assumed to be a nonnegative integer.
// Note: the first item is at position 0
function list_ref(xs, n) {
    if ((0, list_1.is_null)(xs)) {
        return undefined;
    }
    else {
        return n === 0
            ? (0, list_1.head)(xs)
            : list_ref((0, list_1.tail)(xs), n - 1);
    }
}
exports.list_ref = list_ref;
// accumulate applies an operation op (assumed to be a binary function)
// to elements of sequence (assumed to be a list) in a right-to-left order.
// first apply op to the last element and initial, resulting in r1, then to
// the  second-last element and r1, resulting in r2, etc, and finally
// to the first element and r_n-1, where n is the length of the
// list.
// accumulate(op, zero, list(1, 2, 3)) results in
// op(1, op(2, op(3, zero)))
function $accumulate(f, initial, xs, cont) {
    return (0, list_1.is_null)(xs)
        ? cont(initial)
        : $accumulate(f, initial, (0, list_1.tail)(xs), function (x) { return cont(f((0, list_1.head)(xs), x)); });
}
function accumulate(f, initial, xs) {
    return $accumulate(f, initial, xs, function (x) { return x; });
}
exports.accumulate = accumulate;
function fold_left(f, initial, xs) {
    return (0, list_1.is_null)(xs)
        ? initial
        : fold_left(f, f(initial, (0, list_1.head)(xs)), (0, list_1.tail)(xs));
}
exports.fold_left = fold_left;
function flatten(xs) {
    return accumulate(list_1.append, empty_list(), xs);
}
exports.flatten = flatten;
function all(pred, xs) {
    return (0, list_1.is_null)(xs) ? true : pred((0, list_1.head)(xs)) && all(pred, (0, list_1.tail)(xs));
}
exports.all = all;
// Belongs elsewhere.
function build_array(size, content) {
    var result = Array(size);
    for (var i = 0; i < size; i = i + 1) {
        result[i] = content(i);
    }
    return result;
}
exports.build_array = build_array;
