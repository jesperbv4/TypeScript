import {List, list, pair, is_null, head, tail} from '../lib/list'
import { length} from '../lib/list_prelude'
import { enqueue, empty, is_empty, type Prio_Queue, head as qhead, dequeue} from '../lib/prio_queue'

type Permutation = Array<number>;

function random_permutation(length: number): Permutation {

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

function lg_permute_list<T>(xs: List<T>): List<T> {
    
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
//function lg_permute_nodeLists(lg: ListGraph): ListGraph

console.log(lg_permute_list(list(1,2,3,4)));
