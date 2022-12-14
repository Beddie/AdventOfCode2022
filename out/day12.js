"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const puzzlePath = "puzzleinput/day12.txt";
const puzzleOutputPath = "puzzleoutput/day12output.txt";
async function day12(part, print) {
    let answer = 0;
    let endPosition = [0, 0];
    let startPositionPart1 = [];
    let startPositions = [];
    const puzzlePrepare = (0, fs_1.readFileSync)(puzzlePath).toString().split('\n');
    const hills = puzzlePrepare.map((line, y) => line.split('').flatMap((x, i) => {
        let currentHeight = x.charCodeAt(0);
        if (currentHeight == 83) {
            "S";
            currentHeight = 96;
            startPositionPart1 = [y, i];
        }
        else if (currentHeight == 69) {
            "E";
            currentHeight = 123;
            endPosition = [y, i];
        }
        else if (currentHeight == 97) {
            let startPosition97 = [y, i];
            startPositions.push(startPosition97);
        }
        return currentHeight;
    }));
    let cols = hills[0].length; //columns in the grid
    let rows = hills.length; //rows in the grid
    let grid = new Array(cols); //array of all the grid points
    let openSet = []; //array containing unevaluated grid points
    let closedSet = []; //array containing completely evaluated grid points
    let path = [];
    //heuristic we will be using - Manhattan distance
    //for other heuristics visit - https://theory.stanford.edu/~amitp/GameProgramming/Heuristics.html
    function heuristic(position0, position1) {
        let d1 = Math.abs(position1.x - position0.x);
        let d2 = Math.abs(position1.y - position0.y);
        return d1 + d2;
    }
    //constructor function to create all the grid points as objects containind the data for the points
    function GridPoint(x, y, hillHeight) {
        this.x = x; //x location of the grid point
        this.y = y; //y location of the grid point
        this.f = 0; //total cost function
        this.g = 0; //cost function from start to the current grid point
        this.h = 0; //heuristic estimated cost function from current grid point to the goal
        this.neighbors = []; // neighbors of the current grid point
        this.parent = undefined; // immediate source of the current grid point
        // update neighbors array for a given grid point
        this.updateNeighbors = function (grid) {
            let i = this.x;
            let j = this.y;
            let currentHeight = hills[j][i];
            let rightHeightValue = i + 1 > hills[0].length - 1 ? false : hills[j][i + 1] <= currentHeight + 1;
            let leftHeightValue = i - 1 < 0 ? false : hills[j][i - 1] <= currentHeight + 1;
            let upHeightValue = y - 1 < 0 ? false : hills[j - 1][i] <= currentHeight + 1;
            let downHeightValue = y + 1 > hills.length - 1 ? false : hills[j + 1][i] <= currentHeight + 1;
            if (i < cols - 1 && rightHeightValue) {
                this.neighbors.push(grid[i + 1][j]);
            }
            if (i > 0 && leftHeightValue) {
                this.neighbors.push(grid[i - 1][j]);
            }
            if (j < rows - 1 && downHeightValue) {
                this.neighbors.push(grid[i][j + 1]);
            }
            if (j > 0 && upHeightValue) {
                this.neighbors.push(grid[i][j - 1]);
            }
        };
    }
    //initializing the grid
    function init(starter) {
        //making a 2D array
        for (let i = 0; i < cols; i++) {
            grid[i] = new Array(rows);
        }
        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                grid[i][j] = new GridPoint(i, j, hills[j][i]);
            }
        }
        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                grid[i][j].updateNeighbors(grid);
            }
        }
        let start = grid[starter[1]][starter[0]];
        openSet.push(start);
    }
    //A star search implementation
    function search(startnum, endnum) {
        init(startnum);
        let end = grid[endnum[0]][endnum[1]];
        while (openSet.length > 0) {
            //assumption lowest index is the first one to begin with
            let lowestIndex = 0;
            for (let i = 0; i < openSet.length; i++) {
                if (openSet[i].f < openSet[lowestIndex].f) {
                    lowestIndex = i;
                }
            }
            let current = openSet[lowestIndex];
            if (current === end) {
                let temp = current;
                path.push(temp);
                while (temp.parent) {
                    path.push(temp.parent);
                    temp = temp.parent;
                }
                // return the traced path
                return path.reverse();
            }
            //remove current from openSet
            openSet.splice(lowestIndex, 1);
            //add current to closedSet
            closedSet.push(current);
            let neighbors = current.neighbors;
            for (let i = 0; i < neighbors.length; i++) {
                let neighbor = neighbors[i];
                if (!closedSet.includes(neighbor)) {
                    let possibleG = current.g + 1;
                    if (!openSet.includes(neighbor)) {
                        openSet.push(neighbor);
                    }
                    else if (possibleG >= neighbor.g) {
                        continue;
                    }
                    neighbor.g = possibleG;
                    neighbor.h = heuristic(neighbor, end);
                    neighbor.f = neighbor.g + neighbor.h;
                    neighbor.parent = current;
                }
            }
        }
        return undefined;
    }
    if (part == 1) {
        let gridpoints = search(startPositionPart1, [endPosition[1], endPosition[0]]);
        answer = gridpoints.length - 1;
        drawGrid(hills, gridpoints);
    }
    else {
        let paths = [];
        let endpos = [endPosition[1], endPosition[0]];
        startPositions.forEach(sp => {
            openSet = []; //array containing unevaluated grid points
            closedSet = []; //array containing completely evaluated grid points
            path = [];
            let whatisit = search(sp, endpos);
            if (whatisit) {
                paths.push(whatisit);
            }
        });
        paths.sort((a, b) => a.length - b.length);
        //answer = gridpoints.length - 1;
        //drawGrid(hills, gridpoints)
        answer = paths[0].length - 1;
    }
    return answer;
}
function drawGrid(hills, gridpoints) {
    // this.hillPathDistanceMap
    let grid = "";
    hills.forEach((hilly, y) => {
        hilly.forEach((hillx, x) => {
            grid += (gridpoints.find(pos => pos.x == x && pos.y == y) ? "(X)" + String.fromCharCode(hillx) : "....") + " ";
        });
        grid += "\n";
    });
    console.log(grid);
    (0, fs_1.writeFileSync)(puzzleOutputPath, grid);
}
Promise.all([day12(1, true), day12(2, true)]).then((answer) => console.log(answer.join(', ')));
//answer1 380
//answer2 375
//# sourceMappingURL=day12.js.map