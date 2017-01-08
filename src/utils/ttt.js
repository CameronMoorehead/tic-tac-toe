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

var combinations = [[1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]]

/* -- Game Logic -- */

function ttt(position, me) {
    return tttChoose(findTriples(position), me)
}

function tttChoose(triples, me) {
    if (iCanWin(triples, me))
        return chooseWinningMove(triples, me)
    else if (opponentCanWin(triples, me))
        return blockOpponentWin(triples, me)
    else if (iCanFork(triples, me))
        return choosePivot
    else if (iCanAdvance(triples, me))
        return chooseAdvance(triples, me)
    else
        return bestFreeSquare(triples)
}

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
    return chooseAdvance(triples, me)
}

function chooseAdvance(triples, me) {
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
    let filteredPreferences = preferences.filter(function(x) {
        return (appearances(x, possibilities))
    })
    return filteredPreferences[0]
}

/* -- Tests -- */

console.log("ttt tests:")
console.log(ttt(["_","_","_","_","x","_","_","_","_"], "o"))
console.log(ttt(["o","_","_","x","x","_","_","_","_"], "o"))
console.log(ttt(["o","_","x","x","x","o","_","_","_"], "o"))
console.log(ttt(["o","_","x","x","x","o","o","x","_"], "o"))

/*
console.log("find triples tests:")
console.log(findTriples(["_","x","o","_","x","_","o","_","_"]))
console.log(findTriples(["x","_","_","_","_","_","o","x","o"]))

console.log("opponent tests:")
console.log(opponent("x"))
console.log(opponent("o"))

console.log("myPair tests:")

console.log(myPair(["o","o",7], "o"))
console.log(myPair(["x","o",7], "o"))
console.log(myPair(["o","o","x"], "o"))

console.log("iCanWin tests:")
console.log(iCanWin([[1,"x","o"],[4,"x",6],["o",8,9],[1,4,"o"],
                     ["x","x",8],["o",6,9],[1,"x",9],["o","x","o"]], "x"))
console.log(iCanWin([[1,"x","o"],[4,"x",6],["o",8,9],[1,4,"o"],
                     ["x","x",8],["o",6,9],[1,"x",9],["o","x","o"]], "o"))

console.log("chooseWinningMove tests:")
console.log(chooseWinningMove([[1,"x","o"],[4,"x",6],["o",8,9],[1,4,"o"],
                               ["x","x",8],["o",6,9],[1,"x",9],["o","x","o"]], "x"))

console.log("opponentCanWin tests:")
console.log(opponentCanWin([[1,"x","o"],[4,"x",6],["o",8,9],[1,4,"o"],
                               ["x","x",8],["o",6,9],[1,"x",9],["o","x","o"]], "x"))
console.log(opponentCanWin([[1,"x","o"],[4,"x",6],["o",8,9],[1,4,"o"],
                               ["x","x",8],["o",6,9],[1,"x",9],["o","x","o"]], "o"))
*/
