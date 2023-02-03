import { type Queue, empty, is_empty, enqueue, dequeue, head as qhead } from './queue_array';
import { type Pair, pair, head, tail, List, is_null, list } from './list';
import { for_each, filter, enum_list } from './list_prelude';

type EdgeList = List<Pair<number, number>>

export function undirected(el: EdgeList): EdgeList {
    function add_reverse(xs: EdgeList): EdgeList {
        if(is_null(xs)) {
            return el;
        } else if (head(head(xs)) === tail(head(xs))) {
            return add_reverse(tail(xs));
        } else {
            return pair(pair(tail(head(xs)), head(head(xs))), add_reverse(tail(xs)));
        }
    }
    return add_reverse(el);
}

const white = 0;
const grey  = 1;
const black = 2;

function build_array<T>(size: number, content: (i: number) => T): Array<T> {
    const result = Array<T>(size);
    for (var i = 0; i < size; i = i + 1) {
        result[i] = content(i);
    }
    return result;
}

type MatrixGraph = {
    adj:  Array<Array<boolean>>;
    size: number;
};

export function mg_new(size: number): MatrixGraph {
    const adj = Array<Array<boolean>>(size);
    for (var i = 0; i < size; i = i + 1) {
        adj[i] = build_array(size, _ => false);
    }
    return { adj, size };
}

export function mg_from_edges(size: number, edges: EdgeList): MatrixGraph {
    const result = mg_new(size);
    for_each(p => result.adj[head(p)][tail(p)] = true, edges);
    return result;
}

type ListGraph = {
    adj:  Array<List<number>>; // Lists may not be sorted
    size: number;
}

export function lg_new(size: number): ListGraph {
    return { adj: build_array(size, _ => null), size };
}

export function lg_from_edges(size: number, edges: EdgeList): ListGraph {
    const result = lg_new(size);
    for_each(p => result.adj[head(p)] = pair(tail(p), result.adj[head(p)]), edges);
    return result;
}

export function lg_bfs_visit_order({adj, size}: ListGraph, initial: number = 0): Array<number> {     
    const result  = Array<number>(size);
    const pending = empty<number>();
    const colour  = build_array(size, _ => white);

    function bfs_visit(distance: number): (current: number) => void{
        return function(current: number){
            colour[current] = grey;
            result[current] = distance;
            enqueue(current, pending);
        }
        
    }

    bfs_visit(0)(initial);

    while (!is_empty(pending)) {
        const current = qhead(pending);
        dequeue(pending);
        for_each(bfs_visit(result[current]+1), filter(node => colour[node] === white, adj[current]));
        colour[current] = black;
    }

    return result;
}


export function lg_dfs_visit_order({adj, size}: ListGraph, restart_order: List<number> = null): Queue<number> {        
    const result = empty<number>();
    const colour = build_array(size, _ => white);
    if (restart_order === null) {
        restart_order = enum_list(0, size - 1);
    } else {}

    function dfs_visit(current: number) {
        if (colour[current] === white) {
            colour[current] = grey;
            enqueue(current, result);
            for_each(dfs_visit, adj[current]);
            colour[current] = black;
        } else {}
    }

    for_each(dfs_visit, restart_order);

    return result;
}

export function mg_dfs_visit_order({adj, size}: MatrixGraph, restart_order: List<number> = null): Queue<number> {        
    const result = empty<number>();
    const colour = build_array(size, _ => white);
    if (restart_order === null) {
        restart_order = enum_list(0, size - 1);
    } else {}

    function dfs_visit(current: number) {
        if (colour[current] === white) {
            colour[current] = grey;
            enqueue(current, result);
            for (var sink = 0; sink < size; sink = sink + 1) {
                if(adj[current][sink]) {
                    dfs_visit(sink);
                } else {}
            }
            colour[current] = black;
        } else {}
    }

    for_each(dfs_visit, restart_order);

    return result;
}

const el:EdgeList = list(pair(0,1), pair(0,3), pair(1,2), 
                        pair(1,5), pair(3,2), pair(3,3),
                        pair(3,4), pair(4,6), pair(5,6), 
                        pair(5,7), pair(7,6));

const A = mg_from_edges(8, el);
const Adj = lg_from_edges(8, el);

console.log(lg_bfs_visit_order(Adj));