/* ttt */

/*var combinations = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7],
                    [2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7]];
var position1 = ["_", "x", "o", "_", "x", "_", "o", "_", "_"];
*/



/* Primitive for counting appearances of key in an array */

function appearances(key, array) {
    var count = 0;
    for (var i = 0; i < array.length; i++) {
        if (key === array[i]) {
            count++;
        }
    }
    return count;
}

function findTriples(position) {
    return combinations.map(function(x) {
        return x.map(function(y) {
            if (position[y-1] === "_") {
                return y;
            } else {
                return position[y -1];
            }
        });
    });
}

function myPair(triple, me) {
    return (appearances(me, triple) === 2) && (appearances(opponent(me), triple) === 0);
}

function opponent(letter) {
    if (letter === "x") {
        return "o";
    } else {
        return "x";
    }
}

function winningTriples(triples, me) {
    return triples.filter(function(x) {
        return myPair(x, me);
    });
}

function iCanWin(triples, me) {
    return winningTriples(triples, me).length > 0;
}

console.log(iCanWin([[1, "x", "o"], [4, "x", 6], ["o", 8, 9], [1, 4, "o"],
                    ["x", "x", 8], ["o", 6, 9], [1, "x", 9], ["o", "x", "o"]], "o"));
