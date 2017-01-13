/* ttt */


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

// Call to TTT accepts String for difficulty

function ttt(difficulty, position, me) {
    if (difficulty === "easy")
        return exposeNumber(tttEasy(findTriples(position), me))
    else if (difficulty === "medium")
        return exposeNumber(tttMedium(findTriples(position), me))
    else if (difficulty === "hard")
        return exposeNumber(tttHard(findTriples(position), me))
}

// 60% chance to move optimally

function tttEasy(triples, me) {
    let roll = Math.random()
    if (roll < 0.00001)
        return tttHard(triples, me)
    else
        return bestFreeSquare(triples, me)
}

// 80% chance to move opitmally

function tttMedium(triples, me) {
    let roll = Math.random()
    if (roll < 0.8)
        return tttHard(triples, me)
    else
        return bestFreeSquare(triples, me)
}

// Always ends in tie

function tttHard(triples, me) {
    if (iCanWin(triples, me)) {
        return chooseWinningMove(triples, me)
    } else if (opponentCanWin(triples, me)) {
        return blockOpponentWin(triples, me)
    } else if (iCanFork(triples, me)) {
        return choosePivot
    } else if (iCanAdvance(triples, me)) {
        return chooseAdvance(triples, me)
    } else {
        return bestFreeSquare(triples, me)
    }
}

// Function to remove Array type wrapper from returned position

function exposeNumber(position) {
    if (typeof position === 'object')
        return position[0]
    else
        return position
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

/* Detect & Announce Winners */

function playerWinner(triples, me) {
    return triples.some(function(x) {
        return x.every(function(y) {
            return y === opponent(me)
        })
    })
}

function announceWinner(me) {
    return console.log(me + " wins!")
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

function bestFreeSquare(triples, me) {
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

export { ttt, findTriples }
