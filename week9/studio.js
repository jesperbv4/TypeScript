"use strict";
exports.__esModule = true;
var list_1 = require("../lib/list");
var person = {
    name: "Jesper",
    parents: (0, list_1.pair)("Ove", "Kerstin"),
    children: (0, list_1.list)("benny", "svenny", "kurt")
};
console.log(person);
