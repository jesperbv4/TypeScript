"use strict";
exports.__esModule = true;
exports.descendants = exports.toHashtable = void 0;
var list_1 = require("../lib/list");
var list_prelude_1 = require("../lib/list_prelude");
var hashtables_1 = require("../lib/hashtables");
var queue_array_1 = require("../lib/queue_array");
/**
 * Creates person records and inserts to a hashtable
 * @param people List of people with id and name to be insertet
 * @param relations list of parent-child relations
 * @returns Returns a hashtable, key = person id, value: person records.
 * Empty hashtable if inputs are null
 */
function toHashtable(people, relations) {
    var tab = (0, hashtables_1.ph_empty)((0, list_prelude_1.length)(people), (0, hashtables_1.probe_linear)(hashtables_1.hash_id));
    while (!(0, list_1.is_null)(people)) {
        var person = {
            id: (0, list_1.head)((0, list_1.head)(people)),
            name: (0, list_1.tail)((0, list_1.head)(people)),
            parents: [],
            children: []
        };
        (0, hashtables_1.ph_insert)(tab, person.id, person);
        people = (0, list_1.tail)(people);
    }
    while (!(0, list_1.is_null)(relations)) {
        var id_child = (0, list_1.tail)((0, list_1.head)(relations));
        var id_parent = (0, list_1.head)((0, list_1.head)(relations));
        var child = (0, hashtables_1.ph_lookup)(tab, id_child);
        var parent_1 = (0, hashtables_1.ph_lookup)(tab, id_parent);
        if (child && parent_1) {
            child.parents.push(id_parent);
            parent_1.children.push(id_child);
        }
        relations = (0, list_1.tail)(relations);
    }
    return tab;
}
exports.toHashtable = toHashtable;
/**
 * Finds all descendants for a person in a hashtable of person records
 * @param ht a hashtable of person records
 * @param id identifier for the person whose descendants to look for
 * @returns an Array of identifiers:numbers of the descendants of id,
 * undefined if id not in hashtable
 */
function descendants(ht, id) {
    var in_table = (0, hashtables_1.ph_lookup)(ht, id);
    function dec_helper(id) {
        var q = (0, queue_array_1.empty)();
        (0, queue_array_1.enqueue)(id, q);
        var dec = [];
        while (!(0, queue_array_1.is_empty)(q)) {
            var person = (0, hashtables_1.ph_lookup)(ht, (0, queue_array_1.head)(q));
            var children = person === null || person === void 0 ? void 0 : person.children;
            if (children) {
                for (var i = 0; i < children.length; i++) {
                    (0, queue_array_1.enqueue)(children[i], q);
                }
            }
            dec.push((0, queue_array_1.head)(q));
            (0, queue_array_1.dequeue)(q);
        }
        return dec.slice(1);
    }
    return !in_table
        ? in_table
        : dec_helper(id);
}
exports.descendants = descendants;
