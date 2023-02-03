import { List, Pair, head, is_null, tail, list, pair } from '../lib/list'
import { length } from '../lib/list_prelude'
import { ProbingHashtable, ph_empty, probe_linear, hash_id, ph_lookup, ph_insert} from '../lib/hashtables'
import {  empty, enqueue, is_empty, Queue, head as q_head, dequeue } from '../lib/queue_array'

type People = List<Pair<number, string>>;
type Relations = List<Pair<number, number>>;
type Person = {
    id: number,
    name: string,
    parents: Array<number>,
    children: Array<number>
};
type PersonTable = ProbingHashtable<number, Person>;

/**
 * Converts lists of person data to person records and inserts to a hashtable
 * @precontition Assumes that relations are valid parent-chil pairs, pair(parent, child)
 * @param people list of people with id and name to be converted 
 * @param relations list of parent-child relations to be convertet
 * @returns Returns a hashtable, key: person id, value: person records.
 * empty hashtable if inputs are null
 */
export function toHashtable(people: People, relations: Relations): PersonTable {
    const tab: PersonTable = ph_empty(length(people), probe_linear(hash_id))

    while (!is_null(people)) {
        const person: Person = {
            id: head(head(people)), 
            name: tail(head(people)), 
            parents: [], 
            children: []
        };
        ph_insert(tab, person.id, person);
        people = tail(people);
    }

    while (!is_null(relations)){
        const id_child = tail(head(relations));
        const id_parent = head(head(relations));
        const child = ph_lookup(tab, id_child);
        const parent = ph_lookup(tab, id_parent);
        if (child && parent){
            child.parents.push(id_parent);
            parent.children.push(id_child);
        }
        relations = tail(relations);
    }
    return tab;
}

/**
 * Finds all descendants for a person in a hashtable of person records 
 * @param ht a hashtable of person records
 * @param id identifier for the person whose descendants to look for
 * @returns an Array of identifiers:numbers of the descendants of id,
 * undefined if id not in hashtable
 */
export function descendants(ht: PersonTable, id: number): Array<number> | undefined  {
    const in_table = ph_lookup(ht, id);

    function dec_helper(id:number): Array<number> {
        const q: Queue<number> = empty();       
        enqueue(id, q);                          
        while (!is_empty(q)) {
            const person = ph_lookup(ht, q_head(q));
            const children = person?.children;
            if (children) {
                for (let i = 0; i < children.length; i++) {
                    enqueue(children[i], q);
                }
            }
            dequeue(q);
        }
        return q[2].slice(1);  
    }
    return !in_table 
        ? in_table 
        : dec_helper(id);
    
}

