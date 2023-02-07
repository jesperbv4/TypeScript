import { lg_permute_list, lg_permute_nodeLists, random_permutation, lg_kosaraju, random_kosaraju } from './homework10';
import { is_null, list, pair , head, tail, List} from '../lib/list';
import { member, length, for_each, map} from '../lib/list_prelude';
import { lg_from_edges, EdgeList } from '../lib/graphs';

function list_to_array<T>(xs: List<T>):Array<T> {
    const xs_array: Array<T> = [];
    while(!is_null(xs)) {
        xs_array.push(head(xs))
        xs = tail(xs)
    }
    return xs_array;
}

test('Permutation is returning the correct elements in a new order', () => {
    const A = [0, 1, 2, 3];
    const perm1 = random_permutation(A.length)
    const perm2 = random_permutation(A.length)
    for(let i = 0; i < A.length; i++) {
        expect(perm1).toContain(i)
    }
    expect(perm1.length).toBe(A.length);
    expect(perm1).not.toStrictEqual(A);
    expect(perm1).not.toStrictEqual(perm2);
})

const el:EdgeList = list(pair(0,1), pair(1,2), pair(2,3), pair(3,0),
                pair(3,4), pair(4,6), 
                pair(5,6), pair(6,7), pair(7,5));

const lg = lg_from_edges(8, el);


test('Has the same SCCs', () => {
    const scc_list1 = list_to_array(lg_kosaraju(lg)).sort();
    const scc_list2 = list_to_array(random_kosaraju(lg)).sort();
    for (let i = 0; i < scc_list1.length; i ++) {
        const scc1 = list_to_array(scc_list1[i]).sort();
        const scc2 = list_to_array(scc_list2[i]).sort();
        expect(scc1).toStrictEqual(scc2)
    }
    
})