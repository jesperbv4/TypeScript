import { enqueue, empty, is_empty, type Prio_Queue, head as qhead, dequeue } from '../lib/prio_queue'
import { lg_new, type ListGraph, lg_transpose, lg_from_edges, EdgeList } from '../lib/graphs'
import { type List, type Pair, pair, tail, head, is_null, set_head, list } from "../lib/list";
import { build_array, enum_list, for_each, map, length, list_to_string } from "../lib/list_prelude";

const white = 1;
const black = 2;
const grey  = 3;

//Code written by Johannes from lecture10b
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
//Assignment 1
type Permutation = Array<number>;

/**
 * Takes a number and makes a permutation 
 * @param length number: the length for the Array
 * @returns Array: an Array with a permutation of the numbers from 0-(number-1)
 */
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

/**
 * Takes a List and makes a permutation of the order of the elements
 * @param xs List: the list to be permuted
 * @returns List: a list with a new permutation of xs 
 */
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
 /**
  * Permutes the nodeLists of a ListGragh
  * @param lg ListGraph: The graph with nodeLists to permute
  * @returns Listgraph: A new ListGraph with it's nodeLists permuted
  */
export function lg_permute_nodeLists(lg: ListGraph): ListGraph {
    const res = lg_new(lg.size);
    for (let i = 0; i < lg.size; i++) {
        res.adj[i] = lg_permute_list(lg.adj[i]);
    }
    return res
}

//Assignment 2
/**
 * Creating random orders to pass to kosaraju algorithm
 * @param lg ListGraph: The graph to pass to the algorithm
 * @returns List: a list where each element is a list of SCC in a random order
 */
export function random_kosaraju(lg: ListGraph): List<List<number>> {
    const random_nodeLists = lg_permute_nodeLists(lg)
    const random_restartOrder = lg_permute_list(enum_list(0, lg.size - 1))
    return  lg_kosaraju(random_nodeLists, random_restartOrder);
}

//Assignment 3
type Stream<T> = Pair<T, () => Stream<T>> | null;
/**
 * A function that given a ListGraph returns it's SCC as a stream
 * @param lg the graph to find SCCs
 * @param restart_order the order to check the nodes
 * @returns Stream: A stream of SCCs from a ListGraph
 */
function stream_dfs_reachables(lg: ListGraph, restart_order: List<number>): Stream<List<number>> {
    const colour = build_array(lg.size,_ => white);

    function reachables(restart_order: List<number>): Stream<List<number>> {
        let result: List<number> = null;

        function dfs_visit(current: number): void {
            if (colour[current] === white) {
                result = pair(current, result);
                colour[current] = grey;
                map(dfs_visit, lg.adj[current]);
                colour[current] = black;
                } else {}
        }
        while (!is_null(restart_order)) {
            const initial = head(restart_order);
            const next_node = tail(restart_order);
            if (colour[initial] === white) {
                dfs_visit(initial);
                return pair(result, ()=> reachables(next_node));
            } else {restart_order = next_node;}
        } 
        return null
    }
    return reachables(restart_order);
}

/**
 * Given a ListGraph computes a stream of it's SCCs
 * @param lg ListGraph 
 * @returns a stream of SCCs
 */
function stream_kosaraju(lg: ListGraph): Stream<List<number>>{
    const rev_order = lg_dfs_reverse_finish_order(lg);
    const lg_T = lg_transpose(lg);       
    return stream_dfs_reachables(lg_T, rev_order);
}
/**
 * Given a ListGraph computes a stream in random order of it's SCCs
 * @param lg ListGraph 
 * @returns a stream of SCCs in random order
 */
function stream_random_kosaraju(lg: ListGraph): Stream<List<number>> {
    const random_nodeLists = lg_permute_nodeLists(lg)
    const random_restartOrder = lg_permute_list(enum_list(0, lg.size - 1))
    const new_order = lg_dfs_reverse_finish_order(lg, random_restartOrder)
    const lg_T = lg_transpose(random_nodeLists);
    return  stream_dfs_reachables(lg_T, new_order);
}


const lg: ListGraph = {
    adj: [
        list(1,2,3),
        list(0,2,3),
        list(0,1,3),
        list(0,1,2),
        list(),
        list(6,7),
        list(5,7),
        list(5,6),
        list(9),
        list(8)
    ],
    size: 10
} 



let lgk = lg_kosaraju(lg)
while (!is_null(lgk)) {
    console.log(list_to_string(head(lgk)))
    lgk = tail(lgk)  
}


