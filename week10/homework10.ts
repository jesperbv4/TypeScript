import { enqueue, empty, is_empty, type Prio_Queue, head as qhead, dequeue } from '../lib/prio_queue'
import { lg_new, type ListGraph, lg_transpose, lg_from_edges } from '../lib/graphs'
import { type List, type Pair, pair, tail, head, is_null, set_head, list } from "../lib/list";
import { build_array, enum_list, for_each, map, length } from "../lib/list_prelude";


const white = 1;
const black = 2;
const grey  = 3;

function lg_dfs_reverse_finish_order({adj, size}: ListGraph, 
                                     restart_order: List<number> = null): List<number> {        
    var result: List<number> = null;
    const colour = build_array(size, _ => white);
    if (restart_order === null) {
        restart_order = enum_list(0, size - 1);
    } else {}

    function dfs_visit(current: number): void {
        if (colour[current] === white) {
            colour[current] = grey;
            map(dfs_visit, adj[current]);
            colour[current] = black;
            result = pair(current, result);
        } else {}
    }
    for_each(dfs_visit, restart_order);
    return result;
}


function lg_dfs_reachables({adj, size}: ListGraph, 
                           restart_order: List<number> = null): List<List<number>> {        
    var result: List<List<number>> = null;

    const colour = build_array(size, _ => white);
    if (restart_order === null) {
        restart_order = enum_list(0, size - 1);
    } else {}

    function dfs_visit(current: number): void {
    if (colour[current] === white && !is_null(result)) {
        set_head(result, pair(current, head(result)));
        colour[current] = grey;
        map(dfs_visit, adj[current]);
        colour[current] = black;
        } else {}
    }

    function dfs_restart(initial: number): void {
        if (colour[initial] === white) {
            result = pair(null, result);
            dfs_visit(initial);
        } else {}
    }
    for_each(dfs_restart, restart_order);
    return result;
}

export function lg_kosaraju(lg: ListGraph, 
                            restart_order: List<number> = null): List<List<number>> {
    return lg_dfs_reachables(lg_transpose(lg), 
                             lg_dfs_reverse_finish_order(lg, restart_order));
}

//Start of my code
type Permutation = Array<number>;

export function random_permutation(length: number): Permutation {

    function getRandomInt(min: number, max: number): number {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min);
    }
    function swap(A: Array<number>, i: number, j: number): void {
        const temp = A[i];
        A[i] = A[j];
        A[j] = temp;
    }
      
    const result = Array<number>(length)
    
    for (let i = 0; i < length; i++) {
        result[i] = i;
    }
    for (let i = 0; i < length - 1; i++) {
        const j = getRandomInt(i,length)
        swap(result, i, j);
    }
    return result;
}

export function lg_permute_list<T>(xs: List<T>): List<T> {
    
    function reorder<T>(xs: List<T>): Prio_Queue<T> {
        const len = length(xs);
        const sigma = random_permutation(len);
        const q: Prio_Queue<T> = empty();
        let i = 0;
        while (!is_null(xs)) {
            enqueue(sigma[i], head(xs), q);
            xs = tail(xs);
            i++;
        }
        return q;
    }

    function p_list<T>(q: Prio_Queue<T>): List <T> {
        let lst:List<T> = null;
        while(!is_empty(q)) {
            lst = pair(qhead(q), lst);
            dequeue(q)
        }
        return lst;
    }
    return p_list(reorder(xs));
}

export function lg_permute_nodeLists(lg: ListGraph): ListGraph {
    const res = lg_new(lg.size);
    for (let i = 0; i < lg.size; i++) {
        res.adj[i] = lg_permute_list(lg.adj[i]);
    }
    return res
}

export function random_kosaraju(lg: ListGraph): List<List<number>> {
    const random_nodeLists = lg_permute_nodeLists(lg)
    const random_restartOrder = lg_permute_list(enum_list(0, lg.size - 1))
//    console.log(random_nodeLists);      //TEST
//    console.log(random_restartOrder);   //TEST
    return  lg_kosaraju(random_nodeLists, random_restartOrder);
}