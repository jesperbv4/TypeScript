import { mg_from_edges, lg_from_edges } from '../lib/lecture10a'
import { List, Pair, list, pair } from '../lib/list'

type EdgeList = List<Pair<number, number>>


const el:EdgeList = list(pair(0,1), pair(0,3), pair(1,2), 
                pair(1,5), pair(3,2), pair(3,3),
                pair(3,4), pair(4,6), pair(5,6), 
                pair(5,7), pair(7,6));

const A = mg_from_edges(8, el);
const Adj = lg_from_edges(8, el);
          