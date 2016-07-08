/* ttt */

var combinations = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7],
                    [2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7]];
var position1 = ["_", "x", "o", "_", "x", "_", "o", "_", "_"];

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

console.log(findTriples(position1));
