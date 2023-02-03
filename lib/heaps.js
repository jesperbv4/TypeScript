"use strict";
exports.__esModule = true;
exports.before = exports.ah_remove = exports.ah_top = exports.ah_insert = exports.ah_is_empty = exports.ah_empty = exports.th_remove = exports.th_top = exports.th_insert = exports.th_leaf = exports.th_is_empty = exports.th_empty = void 0;
var list_1 = require("../lib/list");
function th_empty() {
    return null;
}
exports.th_empty = th_empty;
function th_is_empty(th) {
    return th === null;
}
exports.th_is_empty = th_is_empty;
function th_leaf(key, data) {
    return { key: key, data: data, left_child: th_empty(), right_child: th_empty() };
}
exports.th_leaf = th_leaf;
function th_insert(th, new_key, new_data) {
    return th_is_empty(th)
        ? th_leaf(new_key, new_data)
        : new_key < th.key
            ? { key: new_key, data: new_data, left_child: th, right_child: null }
            : th_is_empty(th.left_child)
                ? { key: th.key, data: th.data,
                    left_child: th_leaf(new_key, new_data),
                    right_child: th.right_child }
                : th_is_empty(th.right_child)
                    ? { key: th.key, data: th.data,
                        left_child: th_leaf(new_key, new_data),
                        right_child: th.right_child }
                    : th.left_child.key < th.right_child.key
                        ? th_insert(th.right_child, new_key, new_data)
                        : th_insert(th.left_child, new_key, new_data);
}
exports.th_insert = th_insert;
function th_top(_a) {
    var key = _a.key, data = _a.data;
    return (0, list_1.pair)(key, data);
}
exports.th_top = th_top;
function th_remove(_a) {
    var left_child = _a.left_child, right_child = _a.right_child;
    return th_is_empty(left_child)
        ? right_child
        : th_is_empty(right_child)
            ? left_child
            : left_child.key < right_child.key
                ? { key: left_child.key,
                    data: left_child.data,
                    left_child: th_remove(left_child), right_child: right_child }
                : { key: right_child.key,
                    data: left_child.data, left_child: left_child, right_child: th_remove(right_child) };
}
exports.th_remove = th_remove;
function ah_empty() {
    return { arr: [], size: 0 };
}
exports.ah_empty = ah_empty;
function ah_is_empty(ah) {
    return ah.size === 0;
}
exports.ah_is_empty = ah_is_empty;
function left_child(i) {
    return i * 2 + 1;
}
function right_child(i) {
    return i * 2 + 2;
}
function parent_of(i) {
    return i % 2 === 0 ? i / 2 - 1 : (i - 1) / 2;
}
function ah_insert(ah, key) {
    function bubbleUp(i) {
        var _a;
        if (ah.arr[parent_of(i)] > ah.arr[i]) {
            _a = [ah.arr[parent_of(i)], ah.arr[i]], ah.arr[i] = _a[0], ah.arr[parent_of(i)] = _a[1];
            bubbleUp(parent_of(i));
        }
        else { } // The heap property is restored
    }
    ah.arr[ah.size] = key;
    ah.size = ah.size + 1;
    bubbleUp(ah.size - 1);
}
exports.ah_insert = ah_insert;
function ah_top(ah) {
    return ah.arr[0];
}
exports.ah_top = ah_top;
function ah_remove(ah) {
    function bubbleDown(i) {
        var _a, _b, _c, _d;
        if (right_child(i) < ah.size && ah.arr[right_child(i)] < ah.arr[i]) {
            // We know that i < left_child(i) < right_child(i) < ah.size
            if (ah.arr[left_child(i)] < ah.arr[i]) {
                if (ah.arr[left_child(i)] < ah.arr[right_child(i)]) {
                    _a = [ah.arr[left_child(i)], ah.arr[i]], ah.arr[i] = _a[0], ah.arr[left_child(i)] = _a[1];
                    bubbleDown(left_child(i));
                }
                else {
                    _b = [ah.arr[right_child(i)], ah.arr[i]], ah.arr[i] = _b[0], ah.arr[right_child(i)] = _b[1];
                    bubbleDown(right_child(i));
                }
            }
            else {
                _c = [ah.arr[right_child(i)], ah.arr[i]], ah.arr[i] = _c[0], ah.arr[right_child(i)] = _c[1];
                bubbleDown(right_child(i));
            }
        }
        else if (left_child(i) < ah.size && ah.arr[left_child(i)] < ah.arr[i]) {
            _d = [ah.arr[left_child(i)], ah.arr[i]], ah.arr[i] = _d[0], ah.arr[left_child(i)] = _d[1];
            bubbleDown(left_child(i));
        }
        else { } // The heap property is restored
    }
    if (ah.size === 0) {
        return false;
    }
    else {
        var key = ah.arr[0];
        ah.size = ah.size - 1;
        ah.arr[0] = ah.arr[ah.size];
        bubbleDown(0);
        return true;
    }
}
exports.ah_remove = ah_remove;
function before(x1, x2) {
    return x1 < x2;
}
exports.before = before;
