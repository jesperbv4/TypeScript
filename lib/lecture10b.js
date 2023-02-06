"use strict";
exports.__esModule = true;
exports.lg_kosaraju = void 0;
var graphs_1 = require("../lib/graphs");
var list_1 = require("../lib/list");
var list_prelude_1 = require("../lib/list_prelude");
var white = 1;
var black = 2;
var grey = 3;
function lg_dfs_reverse_finish_order(_a, restart_order) {
    var adj = _a.adj, size = _a.size;
    if (restart_order === void 0) { restart_order = null; }
    var result = null;
    var colour = (0, list_prelude_1.build_array)(size, function (_) { return white; });
    if (restart_order === null) {
        restart_order = (0, list_prelude_1.enum_list)(0, size - 1);
    }
    else { }
    function dfs_visit(current) {
        if (colour[current] === white) {
            colour[current] = grey;
            (0, list_prelude_1.map)(dfs_visit, adj[current]);
            colour[current] = black;
            result = (0, list_1.pair)(current, result);
        }
        else { }
    }
    (0, list_prelude_1.for_each)(dfs_visit, restart_order);
    return result;
}
function lg_dfs_reachables(_a, restart_order) {
    var adj = _a.adj, size = _a.size;
    if (restart_order === void 0) { restart_order = null; }
    var result = null;
    var colour = (0, list_prelude_1.build_array)(size, function (_) { return white; });
    if (restart_order === null) {
        restart_order = (0, list_prelude_1.enum_list)(0, size - 1);
    }
    else { }
    function dfs_visit(current) {
        if (colour[current] === white && !(0, list_1.is_null)(result)) {
            (0, list_1.set_head)(result, (0, list_1.pair)(current, (0, list_1.head)(result)));
            colour[current] = grey;
            (0, list_prelude_1.map)(dfs_visit, adj[current]);
            colour[current] = black;
        }
        else { }
    }
    function dfs_restart(initial) {
        if (colour[initial] === white) {
            result = (0, list_1.pair)(null, result);
            dfs_visit(initial);
        }
        else { }
    }
    (0, list_prelude_1.for_each)(dfs_restart, restart_order);
    return result;
}
function lg_kosaraju(lg, restart_order) {
    if (restart_order === void 0) { restart_order = null; }
    return lg_dfs_reachables((0, graphs_1.lg_transpose)(lg), lg_dfs_reverse_finish_order(lg, restart_order));
}
exports.lg_kosaraju = lg_kosaraju;
