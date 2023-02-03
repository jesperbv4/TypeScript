"use strict";
exports.__esModule = true;
var lecture10a_1 = require("../lib/lecture10a");
var list_1 = require("../lib/list");
var el = (0, list_1.list)((0, list_1.pair)(0, 1), (0, list_1.pair)(0, 3), (0, list_1.pair)(1, 2), (0, list_1.pair)(1, 5), (0, list_1.pair)(3, 2), (0, list_1.pair)(3, 3), (0, list_1.pair)(3, 4), (0, list_1.pair)(4, 6), (0, list_1.pair)(5, 6), (0, list_1.pair)(5, 7), (0, list_1.pair)(7, 6));
var A = (0, lecture10a_1.mg_from_edges)(8, el);
var Adj = (0, lecture10a_1.lg_from_edges)(8, el);
console.log(Adj);
