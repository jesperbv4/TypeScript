import { type Pair, pair } from '../lib/list';
export type TreeHeap<Key, Data> = null | NonEmptyTreeHeap<Key, Data>;
export type NonEmptyTreeHeap<Key, Data> = {
    readonly key: Key, 
    readonly data: Data, 
    readonly left_child: TreeHeap<Key, Data>, 
    readonly right_child: TreeHeap<Key, Data>
};

export function th_empty<Key, Data>(): TreeHeap<Key, Data> {
    return null;
}

export function th_is_empty<Key, Data>(th: TreeHeap<Key, Data>): th is null {
    return th === null;
}

export function th_leaf<Key, Data>(key: Key, data: Data): NonEmptyTreeHeap<Key, Data> {
    return { key, data, left_child : th_empty(), right_child: th_empty() };

}

export function th_insert<Key, Data>(th: TreeHeap<Key, Data>, new_key: Key, new_data: Data): NonEmptyTreeHeap<Key, Data> {
        return  th_is_empty(th)
                ? th_leaf(new_key, new_data)
            : new_key < th.key
                ? { key: new_key, data: new_data, left_child: th, right_child: null }
            : th_is_empty(th.left_child)
                ? { key: th.key, data:th.data,
                    left_child: th_leaf(new_key, new_data), 
                    right_child: th.right_child }
            : th_is_empty(th.right_child)
                ? { key: th.key, data:th.data,
                    left_child: th_leaf(new_key, new_data), 
                    right_child: th.right_child }
            : th.left_child.key < th.right_child.key
                ? th_insert(th.right_child, new_key, new_data)
            : th_insert(th.left_child, new_key, new_data);
}

export function th_top<Key, Data>({key, data}: NonEmptyTreeHeap<Key, Data>): Pair<Key, Data> {
    return pair(key, data);
}

export function th_remove<Key, Data>({left_child, right_child}: NonEmptyTreeHeap<Key, Data>): TreeHeap<Key, Data> {
    return  th_is_empty(left_child)
                ? right_child
            : th_is_empty(right_child)
                ? left_child
            : left_child.key < right_child.key
                ? { key: left_child.key,
                    data: left_child.data,
                    left_child: th_remove(left_child),
                    right_child }
            : { key: right_child.key,
                data: left_child.data,
                left_child,
                right_child: th_remove(right_child) };
}


export type ArrayHeap<Key> = {
    arr: Array<Key>,
    size: number
};

export function ah_empty<Key>(): ArrayHeap<Key> {
    return { arr: [], size: 0};
}

export function ah_is_empty<Key>(ah: ArrayHeap<Key>): boolean {
    return ah.size === 0;
}

function left_child(i: number): number {
    return i * 2 + 1;
}

function right_child(i: number): number {
    return i * 2 + 2;
}

function parent_of(i: number): number {
    return i % 2 === 0 ? i / 2 - 1 : (i - 1) / 2;
}

export function ah_insert<Key>(ah: ArrayHeap<Key>, key: Key): void {
    function bubbleUp(i: number): void {
        if (ah.arr[parent_of(i)] > ah.arr[i]) {
            [ah.arr[i], ah.arr[parent_of(i)]] = [ah.arr[parent_of(i)], ah.arr[i]]
            bubbleUp(parent_of(i));
        } else {}  // The heap property is restored
    }    
    ah.arr[ah.size] = key;
    ah.size = ah.size + 1;
    bubbleUp(ah.size - 1);
}

export function ah_top<Key>(ah: ArrayHeap<Key>): Key {
    return ah.arr[0];
}

export function ah_remove<Key>(ah: ArrayHeap<Key>): boolean {
    function bubbleDown(i: number): void {
        if (right_child(i) < ah.size && ah.arr[right_child(i)] < ah.arr[i]) { 
            // We know that i < left_child(i) < right_child(i) < ah.size
            if (ah.arr[left_child(i)] < ah.arr[i]) {
                if(ah.arr[left_child(i)] < ah.arr[right_child(i)]) {
                    [ah.arr[i], ah.arr[left_child(i)]] = [ah.arr[left_child(i)], ah.arr[i]];
                    bubbleDown(left_child(i));
                } else {
                    [ah.arr[i], ah.arr[right_child(i)]] = [ah.arr[right_child(i)], ah.arr[i]];
                    bubbleDown(right_child(i));
                }
            } else {
                [ah.arr[i], ah.arr[right_child(i)]] = [ah.arr[right_child(i)], ah.arr[i]];
                bubbleDown(right_child(i));
            }
        } else if (left_child(i) < ah.size && ah.arr[left_child(i)] < ah.arr[i]) {
            [ah.arr[i], ah.arr[left_child(i)]] = [ah.arr[left_child(i)], ah.arr[i]];
            bubbleDown(left_child(i));
        } else {} // The heap property is restored
    }
    if (ah.size === 0) {
        return false;
    } else {
        const key = ah.arr[0];
        ah.size   = ah.size - 1;
        ah.arr[0] = ah.arr[ah.size];
        bubbleDown(0);
        return true;
    }
}

export function before<T>(x1: T, x2: T): boolean {
    return x1 < x2;
}

