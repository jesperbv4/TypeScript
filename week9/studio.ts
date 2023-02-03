import { ah_empty } from "../lib/heaps"
import {list, List, pair, Pair} from "../lib/list"

type Person = {
    name: string,
    parents?: Pair<string, string>,
    children: List<string>
}

const person: Person = {
    name: "Jesper",
    parents: pair("Ove", "Kerstin"),
    children: list("benny", "svenny", "kurt")
}
