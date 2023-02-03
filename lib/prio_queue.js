"use strict";
exports.__esModule = true;
exports.display_queue = exports.dequeue = exports.head = exports.enqueue = exports.is_empty = exports.empty = void 0;
// representation: [points to head index, points to next empty index, values]
/**
 * Constructs a queue without any elements.
 * @returns Returns an empty queue.
 */
function empty() {
    return [0, 0, []];
}
exports.empty = empty;
/**
 * Checks whether a queue is empty.
 * @param q queue to check for emptiness
 * @returns Returns true, if the queue q has elements, false otherwise.
 */
function is_empty(q) {
    return q[0] === q[1];
}
exports.is_empty = is_empty;
/**
 * Adds an element to the queue.
 * @param e element to add
 * @param q queue that is modified such that the element e is added
 */
function enqueue(prio, e, q) {
    var tail_index = q[1];
    q[2][tail_index] = [prio, e];
    if (!is_empty(q)) {
        // we have at least one element
        var head_index = q[0];
        var elems = q[2];
        elems[tail_index] = [prio, e];
        // swap elements until we find the right spot
        for (var i = tail_index; i > head_index; i = i - 1) {
            if (elems[i - 1][0] >= elems[i][0]) {
                break;
            }
            else { //swap
                swap(elems, i, i - 1);
            }
        }
    }
    q[1] = tail_index + 1; // update tail index
}
exports.enqueue = enqueue;
function swap(A, i, j) {
    var tmp = A[i];
    A[i] = A[j];
    A[j] = tmp;
}
/**
 * Retrieves the element with the highest priority from the queue.
 * If two elements have the same priority the one that was
 * enqueued first is returned.
 * @precondition Assumes q to be non-empty
 * @param q queue to get the highest-priority element of
 * @returns Returns the element of the queue that has the highest priority.
 */
function head(q) {
    var head_index = q[0];
    return q[2][head_index][1];
}
exports.head = head;
/**
 * Removes the element with highest priority from a queue.
 * If two elements have the same priority the one that was
 * enqueued first is dequeued first.
 * @precondition Assumes q to be non-empty
 * @param q queue that is modified such that the element
 *          with the highest priority is removed
 */
function dequeue(q) {
    var head_index = q[0];
    q[0] = head_index + 1;
}
exports.dequeue = dequeue;
/**
 * Pretty-prints the contents of a queue.
 * @param q queue to pretty-print
 */
function display_queue(q) {
    console.log(q[2].slice(q[0], q[1]));
}
exports.display_queue = display_queue;
