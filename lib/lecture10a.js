"use strict";
exports.__esModule = true;
exports.mg_dfs_visit_order = exports.lg_dfs_visit_order = exports.lg_bfs_visit_order = exports.lg_from_edges = exports.lg_new = exports.mg_from_edges = exports.mg_new = exports.undirected = void 0;
var queue_array_1 = require("./queue_array");
var list_1 = require("./list");
var list_prelude_1 = require("./list_prelude");
function undirected(el) {
    function add_reverse(xs) {
        if ((0, list_1.is_null)(xs)) {
            return el;
        }
        else if ((0, list_1.head)((0, list_1.head)(xs)) === (0, list_1.tail)((0, list_1.head)(xs))) {
            return add_reverse((0, list_1.tail)(xs));
        }
        else {
            return (0, list_1.pair)((0, list_1.pair)((0, list_1.tail)((0, list_1.head)(xs)), (0, list_1.head)((0, list_1.head)(xs))), add_reverse((0, list_1.tail)(xs)));
        }
    }
    return add_reverse(el);
}
exports.undirected = undirected;
var white = 0;
var grey = 1;
var black = 2;
function build_array(size, content) {
    var result = Array(size);
    for (var i = 0; i < size; i = i + 1) {
        result[i] = content(i);
    }
    return result;
}
function mg_new(size) {
    var adj = Array(size);
    for (var i = 0; i < size; i = i + 1) {
        adj[i] = build_array(size, function (_) { return false; });
    }
    return { adj: adj, size: size };
}
exports.mg_new = mg_new;
function mg_from_edges(size, edges) {
    var result = mg_new(size);
    (0, list_prelude_1.for_each)(function (p) { return result.adj[(0, list_1.head)(p)][(0, list_1.tail)(p)] = true; }, edges);
    return result;
}
exports.mg_from_edges = mg_from_edges;
function lg_new(size) {
    return { adj: build_array(size, function (_) { return null; }), size: size };
}
exports.lg_new = lg_new;
function lg_from_edges(size, edges) {
    var result = lg_new(size);
    (0, list_prelude_1.for_each)(function (p) { return result.adj[(0, list_1.head)(p)] = (0, list_1.pair)((0, list_1.tail)(p), result.adj[(0, list_1.head)(p)]); }, edges);
    return result;
}
exports.lg_from_edges = lg_from_edges;
function lg_bfs_visit_order(_a, initial) {
    var adj = _a.adj, size = _a.size;
    if (initial === void 0) { initial = 0; }
    var result = Array(size);
    var pending = (0, queue_array_1.empty)();
    var colour = build_array(size, function (_) { return white; });
    function bfs_visit(distance) {
        return function (current) {
            colour[current] = grey;
            result[current] = distance;
            (0, queue_array_1.enqueue)(current, pending);
        };
    }
    bfs_visit(0)(initial);
    while (!(0, queue_array_1.is_empty)(pending)) {
        var current = (0, queue_array_1.head)(pending);
        (0, queue_array_1.dequeue)(pending);
        (0, list_prelude_1.for_each)(bfs_visit(result[current] + 1), (0, list_prelude_1.filter)(function (node) { return colour[node] === white; }, adj[current]));
        colour[current] = black;
    }
    return result;
}
exports.lg_bfs_visit_order = lg_bfs_visit_order;
function lg_dfs_visit_order(_a, restart_order) {
    var adj = _a.adj, size = _a.size;
    if (restart_order === void 0) { restart_order = null; }
    var result = (0, queue_array_1.empty)();
    var colour = build_array(size, function (_) { return white; });
    if (restart_order === null) {
        restart_order = (0, list_prelude_1.enum_list)(0, size - 1);
    }
    else { }
    function dfs_visit(current) {
        if (colour[current] === white) {
            colour[current] = grey;
            (0, queue_array_1.enqueue)(current, result);
            (0, list_prelude_1.for_each)(dfs_visit, adj[current]);
            colour[current] = black;
        }
        else { }
    }
    (0, list_prelude_1.for_each)(dfs_visit, restart_order);
    return result;
}
exports.lg_dfs_visit_order = lg_dfs_visit_order;
function mg_dfs_visit_order(_a, restart_order) {
    var adj = _a.adj, size = _a.size;
    if (restart_order === void 0) { restart_order = null; }
    var result = (0, queue_array_1.empty)();
    var colour = build_array(size, function (_) { return white; });
    if (restart_order === null) {
        restart_order = (0, list_prelude_1.enum_list)(0, size - 1);
    }
    else { }
    function dfs_visit(current) {
        if (colour[current] === white) {
            colour[current] = grey;
            (0, queue_array_1.enqueue)(current, result);
            for (var sink = 0; sink < size; sink = sink + 1) {
                if (adj[current][sink]) {
                    dfs_visit(sink);
                }
                else { }
            }
            colour[current] = black;
        }
        else { }
    }
    (0, list_prelude_1.for_each)(dfs_visit, restart_order);
    return result;
}
exports.mg_dfs_visit_order = mg_dfs_visit_order;
var el = (0, list_1.list)((0, list_1.pair)(0, 1), (0, list_1.pair)(0, 3), (0, list_1.pair)(1, 2), (0, list_1.pair)(1, 5), (0, list_1.pair)(3, 2), (0, list_1.pair)(3, 3), (0, list_1.pair)(3, 4), (0, list_1.pair)(4, 6), (0, list_1.pair)(5, 6), (0, list_1.pair)(5, 7), (0, list_1.pair)(7, 6));
var A = mg_from_edges(8, el);
var Adj = lg_from_edges(8, el);
console.log(lg_bfs_visit_order(Adj));
