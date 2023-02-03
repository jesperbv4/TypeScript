import { lg_transpose, type ListGraph } from "../lib/graphs";
import { type List, type Pair, pair, tail, head, is_null, set_head } from "../lib/list";
import { build_array, enum_list, for_each, map } from "../lib/list_prelude";

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
