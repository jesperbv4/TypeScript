import { empty, is_empty, enqueue, head, dequeue, display_queue}
    from './prio_queue_nonstarving';

const q = empty<string>();

enqueue(2, "a", q); enqueue(7, "b", q); enqueue(7, "b2", q); enqueue(4, "c", q);
display_queue(q);

dequeue(q);
display_queue(q);

// testing capping at 10
enqueue(15, "d", q); enqueue(8, "e", q); enqueue(8, "f", q);
enqueue(8, "g", q); enqueue(8, "h", q);
display_queue(q);
dequeue(q); dequeue(q); dequeue(q); dequeue(q);
display_queue(q);
dequeue(q);
display_queue(q);
dequeue(q);
display_queue(q);

