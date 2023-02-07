"use strict";
exports.__esModule = true;
exports.random_kosaraju = exports.lg_permute_nodeLists = exports.lg_permute_list = exports.random_permutation = exports.lg_kosaraju = void 0;
var prio_queue_1 = require("../lib/prio_queue");
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
function random_permutation(length) {
    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min);
    }
    function swap(A, i, j) {
        var temp = A[i];
        A[i] = A[j];
        A[j] = temp;
    }
    var result = Array(length);
    for (var i = 0; i < length; i++) {
        result[i] = i;
    }
    for (var i = 0; i < length - 1; i++) {
        var j = getRandomInt(i, length);
        swap(result, i, j);
    }
    return result;
}
exports.random_permutation = random_permutation;
function lg_permute_list(xs) {
    function reorder(xs) {
        var len = (0, list_prelude_1.length)(xs);
        var sigma = random_permutation(len);
        var q = (0, prio_queue_1.empty)();
        var i = 0;
        while (!(0, list_1.is_null)(xs)) {
            (0, prio_queue_1.enqueue)(sigma[i], (0, list_1.head)(xs), q);
            xs = (0, list_1.tail)(xs);
            i++;
        }
        return q;
    }
    function p_list(q) {
        var lst = null;
        while (!(0, prio_queue_1.is_empty)(q)) {
            lst = (0, list_1.pair)((0, prio_queue_1.head)(q), lst);
            (0, prio_queue_1.dequeue)(q);
        }
        return lst;
    }
    return p_list(reorder(xs));
}
exports.lg_permute_list = lg_permute_list;
function lg_permute_nodeLists(lg) {
    var res = (0, graphs_1.lg_new)(lg.size);
    for (var i = 0; i < lg.size; i++) {
        res.adj[i] = lg_permute_list(lg.adj[i]);
    }
    return res;
}
exports.lg_permute_nodeLists = lg_permute_nodeLists;
function random_kosaraju(lg) {
    var random_nodeLists = lg_permute_nodeLists(lg);
    var random_restartOrder = lg_permute_list((0, list_prelude_1.enum_list)(0, lg.size - 1));
    //    console.log(random_nodeLists);      //TEST
    //    console.log(random_restartOrder);   //TEST
    return lg_kosaraju(random_nodeLists, random_restartOrder);
}
exports.random_kosaraju = random_kosaraju;
function stream_dfs_reachables(lg, restart_order) {
    var colour = (0, list_prelude_1.build_array)(lg.size, function (_) { return white; });
    function reachables(restart_order) {
        var result = null;
        function dfs_visit(current) {
            if (colour[current] === white) {
                result = (0, list_1.pair)(current, result);
                colour[current] = grey;
                (0, list_prelude_1.map)(dfs_visit, lg.adj[current]);
                colour[current] = black;
            }
            else { }
        }
        function dfs_restart(initial) {
            if (colour[initial] === white) {
                dfs_visit(initial);
            }
            else { }
        }
        while (!(0, list_1.is_null)(restart_order)) {
            dfs_restart((0, list_1.head)(restart_order));
            restart_order = (0, list_1.tail)(restart_order);
            if (!(0, list_1.is_null)(result)) {
                return (0, list_1.pair)(result, function () { return stream_dfs_reachables(lg, restart_order); });
            }
            else { }
        }
        return null;
    }
    return reachables(restart_order);
}
function stream_kosaraju(lg) {
    var rev_order = lg_dfs_reverse_finish_order(lg);
    var lg_T = (0, graphs_1.lg_transpose)(lg);
    return stream_dfs_reachables(lg_T, rev_order);
}
function stream_random_kosaraju(lg) {
    var random_restartOrder = lg_permute_list((0, list_prelude_1.enum_list)(0, lg.size - 1));
    var random_nodeLists = lg_permute_nodeLists(lg);
    return stream_dfs_reachables(random_nodeLists, random_restartOrder);
}
var el = (0, list_1.list)((0, list_1.pair)(0, 1), (0, list_1.pair)(1, 2), (0, list_1.pair)(2, 3), (0, list_1.pair)(3, 0), (0, list_1.pair)(3, 4), (0, list_1.pair)(4, 6), (0, list_1.pair)(5, 6), (0, list_1.pair)(6, 7), (0, list_1.pair)(7, 5));
var lg = (0, graphs_1.lg_from_edges)(8, el);
var stream = stream_kosaraju(lg);
var rstream = stream_random_kosaraju(lg);
if (!(0, list_1.is_null)(stream) && !(0, list_1.is_null)(rstream)) {
    console.log((0, list_1.tail)(stream)());
    console.log((0, list_1.tail)(rstream)());
}
console.log(rstream);
console.log(stream);
