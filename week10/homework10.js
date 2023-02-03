"use strict";
exports.__esModule = true;
var list_1 = require("../lib/list");
var list_prelude_1 = require("../lib/list_prelude");
var prio_queue_1 = require("../lib/prio_queue");
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
//function lg_permute_nodeLists(lg: ListGraph): ListGraph
console.log(lg_permute_list((0, list_1.list)(1, 2, 3, 4)));
