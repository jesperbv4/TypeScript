import { type Pair, pair, head, tail, type List, is_null } from '../lib/list';
import { for_each } from '../lib/list_prelude';

export type EdgeList = List<Pair<number, number>>

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

function build_array<T>(size: number, content: (i: number) => T): Array<T> {
    const result = Array<T>(size);
    for (var i = 0; i < size; i = i + 1) {
        result[i] = content(i);
    }
    return result;
}

export type MatrixGraph = {
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

export type ListGraph = {
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

export function lg_transpose({size, adj}: ListGraph): ListGraph {
    const result = lg_new(size);
    for (var i = 0; i < size; i = i + 1) {
        for_each(p => result.adj[p] = pair(i, result.adj[p]), adj[i]);
    }
    return result;
}
