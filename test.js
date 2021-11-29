//#region No-Include
let size = 5;
let allcards = ["Crystal Ball", "Sacrificial Knife", "Crown of Thorns", "Holy Water", "Embalming Oil", "Death Mask", "Haunted Shroud", "Ritual Dice", "Sundial", "Preserved Butterfly", "Ink and Needle", "Mummified Hand", "Seance Board", "Temple Capstone", "Mantis in Amber", "Lion Tongue", "Gallbladder", "Signet Ring", "Veil", "Iron Stake", "Ambergris", "Honeycomb", "Antlers", "Myrrh", "Incense", "Blood Paint", "Skull Cup", "Cobra", "Belladonna", "Vial of Mercury", "Papyrus", "Antimony", "Mandrake", "Opium", "Ankh", "Scythe"];
let cards = shuffle(allcards).slice(0, size * 4);
//#endregion No-Include

//#region Include
let gr = {
    s: { u: '║', l: '═' },
    t: { u: '╚', l: '╝', d: '╗', r: '╔' },
    T: { u: '╩', l: '╣', d: '╦', r: '╠' },
    c: { u: '╬' },
    n: '╳'
};
let possibles = {
    s: {
        u: { u: true, l: false, d: true, r: false },
        l: { u: false, l: true, d: false, r: true }
    },
    t: {
        u: { u: true, l: false, d: false, r: true },
        l: { u: true, l: true, d: false, r: false },
        d: { u: false, l: true, d: true, r: false },
        r: { u: false, l: false, d: true, r: true }
    },
    T: {
        u: { u: true, l: true, d: false, r: true },
        l: { u: true, l: true, d: true, r: false },
        d: { u: false, l: true, d: true, r: true },
        r: { u: true, l: false, d: true, r: true }
    },
    c: {
        u: { u: true, l: true, d: true, r: true }
    },
    n: { u: false, l: false, d: false, r: false }
};
// #endregion Include

//#region No-Include
let types = ['s', 't', 'T', 'c'];
let orients = {
    s: ['u', 'l'],
    t: ['u', 'l', 'd', 'r'],
    T: ['u', 'l', 'd', 'r'],
    c: ['u'],
};
/** @param {Array<T>} array @returns {Array<T>} */
function shuffle(array) {
    var currentIndex = array.length, randomIndex;
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
}

let randInt = (max = 100, min = 0) => Math.floor(Math.random() * (max - min)) + min;
let choice = (seq) => seq[randInt(seq.length)];
let gen = (n = randInt(0, 5)) => {
    let t = choice(types);
    let o = choice(orients[t]);
    return `${n}${t}${o}`;
};
let parse = (s) => Array(parseInt(s[0])).fill({ type: s[1], orient: s[2] });
/** @type {{type: string, orient: string}[]} */
let tiles = [
    ...parse(gen(1)),
    ...parse(gen(1)),
    ...parse(gen(1)),
    ...parse(gen(1)),
    ...parse(gen(1)),

    ...parse('1sl'),
    ...parse('1Td'),
    ...parse(gen(1)),
    ...parse('1tr'),
    ...parse('1Tl'),

    ...parse(gen(1)),
    ...parse('1tu'),
    ...parse('1sl'),
    ...parse('1cu'),
    ...parse('1su'),

    ...parse(gen(1)),
    ...parse(gen(1)),
    ...parse(gen(1)),
    ...parse(gen(1)),
    ...parse('1su'),

    '',
    ...parse(gen(1)),
    ...parse(gen(1)),
    ...parse(gen(1)),
    ...parse('1su')
];

//shuffle(tiles);
let start = cards[1];
let end = cards[9];

let hex = Array(size*4).fill().map((_, i) => String.fromCharCode(i+65)).join('');
function graphics() { //skip this
    let graphs = '';

    graphs += ' ';
    graphs += hex.slice(size*3).split('').reverse().join('');
    graphs += ' \n';

    //cards.forEach((v, i) => console.log(hex[i] + ': ' + v));
    console.log(`Path from ${start} (${hex[cards.indexOf(start)]}) to ${end} (${hex[cards.indexOf(end)]})`);

    for (let i = 0; i < tiles.length / size; i++) {
        graphs += hex[i];
        for (let j = 0; j < tiles.length / size; j++) {
            const e = tiles[i * size + j];
            if (e == '') graphs += gr.n;
            else graphs += gr[e.type][e.orient];
        }
        graphs += hex[hex.length - (size + 1) - i];
        graphs += '\n';
    }
    
    graphs += ' ';
    graphs += hex.slice(size, size*2);
    graphs += ' ';
    
    console.log(graphs);
}
graphics();
//#endregion No-Include

//#region Include
function to2d(i) {
    return {y: Math.floor(i / size), x: i % size};
}
function toHex(i) {
    return [hex[to2d(i).x], hex[to2d(i).y+size]];
}
let inv = (i) => i * -1 + 3;
function paths() {
    /** @type {{u:boolean, l: boolean, d: boolean, r: boolean}[]} */
    let pt = tiles.map(v => v == '' ? possibles.n : possibles[v.type][v.orient]);
    //let f = toHex;
    let f = (i) => i;
    let path = [];
    for (let i = 0; i < pt.length; i++) {
        const tile = pt[i];
        if (tile.l) {
            if (to2d(i).x == 0) {
                path.push([f(i), hex[to2d(i).y]]);
            }
            else if (pt[i-1] && pt[i - 1].r) {
                path.push([f(i), f(i - 1)]);
            }
        }
        if (tile.d) {
            if (to2d(i).y == size-1) {
                path.push([f(i), hex[to2d(i).x+size]]);
            }
            else if (pt[i + size] && pt[i + size].u) {
                path.push([f(i), f(i + size)]);
            }
        }

        if (tile.r && to2d(i).x == size-1) {
            path.push([f(i), hex[inv(to2d(i).y)+size*2]]);
        }
        if (tile.u && to2d(i).y == 0) {
            path.push([f(i), hex[inv(to2d(i).x)+size*3]]);
        }
    }

    console.log(path);
    return path;
}
let ps = paths();

/**
 * 
 * @param {Array<Array<string | number>>} p 
 */
function findPath(p, s, is=[]) {
    let paths = p.filter(v => v.includes(s)).filter(v => !v.some(e => is.includes(e)));
    is.push(s);

    let e = [];
    if (paths.length == 0) {
        e = [s];
    } else {
        paths.forEach(v => {
            let i = v.indexOf(s);
            if (i == 0) e.push(...findPath(p, v[1], is));
            if (i == 1) e.push(...findPath(p, v[0], is));
        });
    }
    return e;
}
let endings = findPath(ps, hex[cards.indexOf(start)]).filter(v => typeof v == 'string');
console.log(hex[cards.indexOf(start)], endings);
console.log(endings.includes(hex[cards.indexOf(end)]));

//#endregion Include
