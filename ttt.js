/* ttt */

"use strict"

/* Primitive functions */

function appearances(key, array) {
    var count = 0
    for (var i = 0; i < array.length; i++) {
        if (key === array[i]) 
            count++
    }
    return count
}

function opponent(letter) {
    return letter === "x" ? "o" : "x"
}

/* -- Game Logic -- */

/* Triples */
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

/* iCanWin */

function iCanWin(triples, me) {
    return winningTriples(triples, me).length > 0
}

function winningTriples(triples, me) {
    return triples.filter(function(x) {
        return myPair(x, me)
    })
}

function myPair(triple, me) {
    return (appearances(me, triple) === 2) && (appearances(opponent(me), triple) === 0)
}

function chooseWinningMove(triples, me) {
    let solutions = winningTriples(triples, me)
    return solutions[0].filter(function(x) {
        return typeof x === "number"
    })
}

/* opponentCanWin */


function opponentCanWin(triples, me) {
    return winningTriples(triples, opponent(me)).length > 0
}

function blockOpponentWin(triples, me) {
    return chooseWinningMove(triples, opponent(me))
}

/* iCanFork */

function iCanFork(triples, me) {
    return pivots(triples, me)
}

function pivots(triples, me) {
    let singles = filterSingles(triples, me)
    return choosePivot(singles, me)
}

function filterSingles(triples, me) {
    return triples.filter(function(x) {
        return mySingle(x, me)
    })
}

function mySingle(triple, me) {
    return (appearances(me, triple) === 1) && (appearances(opponent(me), triple) === 0)
}

function choosePivot(singles, me) {
    let flattened = singles.reduce(function(a, b) {
        return a.concat(b)
    }, [])
    let sortedList = flattened.sort()
    return choosePivot2(sortedList)
}

function choosePivot2(sortedList) {
    if (sortedList.length === 0)
        return false
    else if (sortedList[0] === sortedList[1])
        return sortedList[0]
    else
        return choosePivot2(sortedList.slice(1))
}


/*
console.log(blockOpponentWin([[1, "x", "o"], [4, "x", 6], ["o", 8, 9], [1, 4, "o"],
                     ["x", "x", 8], ["o", 6, 9], [1, "x", 9], ["o", "x", "o"]], "o"));
*/
console.log(iCanFork([["x","o",3],[4,"x",6],[7,8,"o"],["x",4,7],["o","x",8],[3,6,"o"],["x","x","o"],
            [3,"x",7]], "x"));
