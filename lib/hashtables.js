"use strict";
exports.__esModule = true;
exports.ph_keys = exports.ph_delete = exports.ph_insert = exports.ph_lookup = exports.ph_empty = exports.probe_quadratic = exports.probe_linear = exports.ch_keys = exports.ch_delete = exports.ch_insert = exports.ch_lookup = exports.ch_empty = exports.hash_id = void 0;
var list_1 = require("../lib/list");
var list_prelude_1 = require("../lib/list_prelude");
var hash_id = function (x) { return x; };
exports.hash_id = hash_id;
function ch_empty(size, hash) {
    var arr = new Array(size);
    for (var i = 0; i < size; i++) {
        arr[i] = null;
    }
    return { arr: arr, hash: hash, length: size };
}
exports.ch_empty = ch_empty;
function scan(xs, key) {
    return (0, list_1.is_null)(xs)
        ? undefined
        : key === (0, list_1.head)((0, list_1.head)(xs))
            ? (0, list_1.tail)((0, list_1.head)(xs))
            : scan((0, list_1.tail)(xs), key);
}
function ch_lookup(_a, key) {
    var arr = _a.arr, hash = _a.hash, length = _a.length;
    return scan(arr[hash(key) % length], key);
}
exports.ch_lookup = ch_lookup;
function add(xs, key, value) {
    var tl = (0, list_1.tail)(xs);
    if ((0, list_1.head)((0, list_1.head)(xs)) === key) {
        (0, list_1.set_tail)((0, list_1.head)(xs), value);
    }
    else if ((0, list_1.is_null)(tl)) {
        (0, list_1.set_tail)(xs, (0, list_1.pair)((0, list_1.pair)(key, value), null));
    }
    else {
        add(tl, key, value);
    }
}
function ch_insert(_a, key, value) {
    var arr = _a.arr, hash = _a.hash, length = _a.length;
    var index = hash(key) % length;
    var xs = arr[index];
    if (xs === null) {
        arr[index] = (0, list_1.pair)((0, list_1.pair)(key, value), null);
    }
    else {
        add(xs, key, value);
    }
}
exports.ch_insert = ch_insert;
function ch_delete(_a, key) {
    var arr = _a.arr, hash = _a.hash, length = _a.length;
    function scan_and_delete(xs) {
        var tl = (0, list_1.tail)(xs);
        if ((0, list_1.is_null)(tl)) {
            return false;
        }
        else if (key === (0, list_1.head)((0, list_1.head)(tl))) {
            (0, list_1.set_tail)(xs, (0, list_1.tail)(tl));
            return true;
        }
        else {
            return scan_and_delete(tl);
        }
    }
    var xs = arr[hash(key) % length];
    if ((0, list_1.is_null)(xs)) {
        return false;
    }
    else if (key === (0, list_1.head)((0, list_1.head)(xs))) {
        arr[hash(key) % length] = (0, list_1.tail)(xs);
        return true;
    }
    else {
        return scan_and_delete(xs);
    }
}
exports.ch_delete = ch_delete;
function ch_keys(tab) {
    return (0, list_prelude_1.map)(list_1.head, (0, list_prelude_1.flatten)((0, list_prelude_1.build_list)(function (i) { return tab.arr[i]; }, tab.length)));
}
exports.ch_keys = ch_keys;
function probe_linear(hash) {
    return function (length, key, i) { return (hash(key) + i) % length; };
}
exports.probe_linear = probe_linear;
function probe_quadratic(hash) {
    return function (length, key, i) { return (hash(key) + i * i) % length; };
}
exports.probe_quadratic = probe_quadratic;
function ph_empty(length, probe) {
    return { keys: new Array(length), data: new Array(length), probe: probe, length: length, size: 0 };
}
exports.ph_empty = ph_empty;
function probe_from(tab, key, i) {
    function step(i) {
        var index = tab.probe(tab.length, key, i);
        return i === tab.length || tab.keys[index] === undefined
            ? undefined
            : tab.keys[index] === key
                ? index
                : step(i + 1);
    }
    return step(i);
}
function ph_lookup(tab, key) {
    var index = probe_from(tab, key, 0);
    return index == undefined
        ? undefined
        : tab.data[index];
}
exports.ph_lookup = ph_lookup;
function ph_insert(tab, key, value) {
    function insertAt(index) {
        tab.keys[index] = key;
        tab.data[index] = value;
        tab.size = tab.size + 1;
        return true;
    }
    function insertFrom(i) {
        var index = tab.probe(tab.length, key, i);
        if (tab.keys[index] === key || tab.keys[index] === undefined) {
            return insertAt(index);
        }
        else if (tab.keys[index] === null) {
            var location_1 = probe_from(tab, key, i);
            return insertAt(location_1 === undefined ? index : location_1);
        }
        else {
            return insertFrom(i + 1);
        }
    }
    return tab.length === tab.size ? false : insertFrom(0);
}
exports.ph_insert = ph_insert;
function ph_delete(tab, key) {
    var index = probe_from(tab, key, 0);
    if (index === undefined) {
        return false;
    }
    else {
        tab.keys[index] = null;
        tab.size = tab.size - 1;
        return true;
    }
}
exports.ph_delete = ph_delete;
function filterNulls(xs) {
    if ((0, list_1.is_null)(xs)) {
        return null;
    }
    else {
        var x = (0, list_1.head)(xs);
        if (x === undefined || x === null) {
            return filterNulls((0, list_1.tail)(xs));
        }
        else {
            return (0, list_1.pair)(x, filterNulls((0, list_1.tail)(xs)));
        }
    }
}
function ph_keys(tab) {
    return filterNulls((0, list_prelude_1.build_list)(function (i) { return tab.keys[i]; }, tab.length));
}
exports.ph_keys = ph_keys;
