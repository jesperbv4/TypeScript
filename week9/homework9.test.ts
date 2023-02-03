import { toHashtable, descendants} from "./homework9";
import { list, pair } from '../lib/list'
import { ph_lookup} from "../lib/hashtables";

const people = list(
    pair(1, "Mormor"), pair(2, "Farmor"),
    pair(3,"Morfar"), pair(4, "Farfar"),
    pair(5, "Mamma"), pair(6, "Pappa"),
    pair(7, "Jag"), pair(8, "Syskon")
);

const relations = list(
    pair(1,5), pair(3,5),
    pair(2,6), pair(4,6),
    pair(5,7), pair(6,7),
    pair(5,8), pair(6,8)
);

const person_table = toHashtable(people, relations);

test('Table uses correct length', () => {
    expect(person_table.length).toBe(8);
});

test('id is stored correct', () => {
    const person = ph_lookup(person_table, 7)
    expect(person?.id).toBe(7);
});

test('name is stored correct', () => {
    const person = ph_lookup(person_table, 7)
    expect(person?.name).toBe("Jag");
});

test('relations are stored correct', () => {
    const person = ph_lookup(person_table, 7)
    expect(person?.parents).toStrictEqual([5, 6]);
    expect(person?.children). toStrictEqual([]);
});

test('stores correct person records for all people', () => {
    for (let i = 1; i <= 7; i++){
        const person = ph_lookup(person_table, i);
        expect(person).toStrictEqual({
            id: person?.id,
            name: person?.name,
            parents: person?.parents,
            children: person?.children,
        });
    }
});

test('the person is not in the table', () => {
    expect(descendants(person_table, 9)).toBe(undefined)
});

test('the person indees has no descendants', () => {
    expect(descendants(person_table, 7)).toStrictEqual([])
});

test('person 5 has 2 desencendats', () => {
    expect(descendants(person_table, 5)?.length).toBe(2)
});

test('person 1 and 2 has the same grandchildren', () => {
    expect(descendants(person_table,1)?.slice(1)).toStrictEqual([7,8]);
    expect(descendants(person_table,2)?.slice(1)).toStrictEqual([7,8]);
});

test('Mammas descendats names is indeed Jag and Syskon', () => {
    const dec = descendants(person_table,5)
    if (dec) {
        const name_p7 = ph_lookup(person_table, dec[0])?.name;
        const name_p8 = ph_lookup(person_table, dec[1])?.name;
        expect(name_p7).toBe('Jag');
        expect(name_p8).toBe('Syskon');
    }
});