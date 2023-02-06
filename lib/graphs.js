"use strict";
exports.__esModule = true;
exports.lg_transpose = exports.lg_from_edges = exports.lg_new = exports.mg_from_edges = exports.mg_new = exports.undirected = void 0;
var list_1 = require("../lib/list");
var list_prelude_1 = require("../lib/list_prelude");
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
function lg_transpose(_a) {
    var size = _a.size, adj = _a.adj;
    var result = lg_new(size);
    for (var i = 0; i < size; i = i + 1) {
        (0, list_prelude_1.for_each)(function (p) { return result.adj[p] = (0, list_1.pair)(i, result.adj[p]); }, adj[i]);
    }
    return result;
}
exports.lg_transpose = lg_transpose;
