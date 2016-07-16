/* ttt */

"use strict"

/* Primitive for counting appearances of key in an array */

function appearances(key, array) {
    var count = 0
    for (var i = 0; i < array.length; i++) {
        if (key === array[i]) 
            count++
    }
    return count
}

/* Game Logic */

function findTriples(position) {
    return combinations.map(function(x) {
        return x.map(function(y) {
            if (position[y-1] === "_")
                return y
            else 
                return position[y -1]
        })
    })
}

function myPair(triple, me) {
    return (appearances(me, triple) === 2) && (appearances(opponent(me), triple) === 0)
}

function opponent(letter) {
    return letter === "x" ? "o" : "x"
}

function iCanWin(triples, me) {
    return winningTriples(triples, me).length > 0
}

function winningTriples(triples, me) {
    return triples.filter(function(x) {
        return myPair(x, me)
    })
}

function chooseWinningMove(triples, me) {
    let solutions = winningTriples(triples, me)
    return solutions[0].filter(function(x) {
        return typeof x === "number"
    })
}

function opponentCanWin(triples, me) {
    return winningTriples(triples, opponent(me)).length > 0
}

function blockOpponentWin(triples, me) {
    return chooseWinningMove(triples, opponent(me))
}

function iCanFork(triples, me) {
    return firstIfAny(pivots(triples, me))
}

function firstIfAny(array) {
    if (array.length === 0)
        return false
    else
        return array[0]
}

console.log(blockOpponentWin([[1, "x", "o"], [4, "x", 6], ["o", 8, 9], [1, 4, "o"],
                     ["x", "x", 8], ["o", 6, 9], [1, "x", 9], ["o", "x", "o"]], "o"));


