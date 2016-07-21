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

var combinations = [[1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]];

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
    return winningTriples(triples, opponent(me)) > 0
}

function blockOpponentWin(triples, me) {
    return chooseWinningMove(triples, opponent(me))
}

/* iCanFork */

function iCanFork(triples, me) {
    return choosePivot(triples, me).length > 0
}

function choosePivot(triples, me) {
    let singles = filterSingles(triples, me)
    return organizeSingles(singles, me)
}

function filterSingles(triples, me) {
    return triples.filter(function(x) {
        return mySingle(x, me)
    })
}

function mySingle(triple, me) {
    return (appearances(me, triple) === 1) && (appearances(opponent(me), triple) === 0)
}

function organizeSingles(singles, me) {
    let flattened = singles.reduce(function(a, b) {
        return a.concat(b)
    }, [])
    let sortedList = flattened.sort()
    return selectPivot(sortedList)
}

function selectPivot(sortedList) {
    let temp = []
    for (var i = 0; i < sortedList.length; i++) {
        if (sortedList[i] === sortedList[i+1] && typeof sortedList[i] !== 'string')
            temp.push(sortedList[i+1])
    }
    return temp
}

/* iCanAdvance */

function iCanAdvance(triples, me) {
    let myTriples = filterSingles(triples, me)
    return bestMove(myTriples, triples, me)
}

function bestMove(myTriples, triples, me) {
    if (myTriples.length === 0)
        return false
    else
        return bestSquare(myTriples[0], triples, me)
}

function bestSquare(myTriple, triples, me) {
    let numbersOnly = myTriple.filter(function(x) {
        return typeof x === "number"
    })
    return bestSquareHelper(choosePivot(triples, opponent(me)), numbersOnly)
}

function bestSquareHelper(opponentPivots, pair) {
    if (appearances(pair[0], opponentPivots) > 0)
        return pair[0]
    else
        return pair[1]
}

/* bestFreeSquare */

function bestFreeSquare(triples) {
    let flattened = triples.reduce(function(a, b) {
        return a.concat(b)
    }, [])
    return firstChoice(flattened, [5,1,3,7,9,2,4,6,8])
}

function firstChoice(possibilities, preferences) {
    console.log("test")
}

/*

console.log(bestSquare([7,8,"o"], findTriples(["x","o","_","_","x","_","_","_","o"]), "o"))
console.log(bestSquare([3,6,"o"], findTriples(["x","o","_","_","x","_","_","_","o"]), "o"))
console.log(bestMove([[3,6,"o"],[7,8,"o"]], findTriples(["x","o","_","_","x","_","_","_","o"]), "o"))
console.log(iCanAdvance(findTriples(["x","o","_","_","x","_","_","_","o"]), "o"))
console.log(blockOpponentWin([[1, "x", "o"], [4, "x", 6], ["o", 8, 9], [1, 4, "o"],
                     ["x", "x", 8], ["o", 6, 9], [1, "x", 9], ["o", "x", "o"]], "o"));
console.log(iCanFork([["x","o",3],[4,"x",6],[7,8,"o"],["x",4,7],["o","x",8],[3,6,"o"],["x","x","o"],
            [3,"x",7]], "o"));
*/
