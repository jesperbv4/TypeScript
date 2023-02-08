import { lg_permute_list, lg_permute_nodeLists, random_permutation, lg_kosaraju, random_kosaraju } from './homework10';
import { is_null, list, head, tail, List} from '../lib/list';
import { ListGraph } from '../lib/graphs';

/**
 * Takes a List and tranforms it to an Array
 * @param xs a list 
 * @returns an Array with the same elements and order as xs
 */
function list_to_array<T>(xs: List<T>):Array<T> {
    const xs_array: Array<T> = [];
    while(!is_null(xs)) {
        xs_array.push(head(xs))
        xs = tail(xs)
    }
    return xs_array;
}

//lg for testing
//SCCs = list(0,1,2,3), list(4), list(5,6,7), list(8,9)
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
test('random permutation has same elements in a new order', () => {
    const A = [0, 1, 2, 3];
    const perm = random_permutation(A.length);
    for(let i = 0; i < A.length; i++) {
        expect(perm).toContain(i);
    }
    expect(perm.length).toBe(A.length);
    expect(perm).not.toStrictEqual(A);
});

test('list permutation has same elements in a new order', () => {
    const reference = [1,2,3,4];
    let p_list = lg_permute_list(list(1,2,3,4));
    while(!is_null(p_list)) {
        expect(reference).toContain(head(p_list));
        p_list = tail(p_list);
    }
});

test('nodelists has same element in a new order', () => {
    const reference = list_to_array(lg.adj[0]);
    const p_nodeLists = lg_permute_nodeLists(lg);
    const n_list1 = list_to_array(p_nodeLists.adj[0]);
    expect(reference).not.toStrictEqual(n_list1)
    expect(reference).toStrictEqual(n_list1.sort())
    
});

test('random and regular kosaraju has the same SCCs', () => {
    const scc_list1 = list_to_array(lg_kosaraju(lg)).sort();
    const scc_list2 = list_to_array(random_kosaraju(lg)).sort();
    for (let i = 0; i < scc_list1.length; i ++) {
        const scc1 = list_to_array(scc_list1[i]).sort();
        const scc2 = list_to_array(scc_list2[i]).sort();
        expect(scc1).toStrictEqual(scc2)
    }
    
})