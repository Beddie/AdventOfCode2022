import { fstat, readFileSync, writeFileSync } from "fs";
const puzzlePath = "puzzleinput/day14.txt";
const puzzleOutputPath = "puzzleoutput/day14output.txt";

enum gridValue {
  empty = 0,
  rock = 1,
  sand = 2
}

function getGridWithRocks(rocks: number[][][], part: number): number[][] {
  let x = 1010
  let y = 300
  let highesty = 0
  let grid = Array.from(Array(x), () => new Array(y))
  rocks.forEach((rockPaths, rockPathsIndex) => {
    let highy = drawRocks(rockPaths);
    highesty = highy > highesty ? highy : highesty;
  })
  //draw highesty horizontally
  let ground = [[0, highesty + 2], [1000, highesty + 2]];
  if (part == 2) drawRocks(ground);
  return grid;

  function drawRocks(rockPaths: number[][]): number {
    let fromx = rockPaths[0][0];
    let fromy = rockPaths[0][1];
    highesty = fromy > highesty ? fromy : highesty;
    grid[fromx][fromy] = gridValue.rock;

    for (let index = 1; index < rockPaths.length; index++) {

      let tox = rockPaths[index][0];
      let toy = rockPaths[index][1];
      highesty = toy > highesty ? toy : highesty;
      let xDistance = tox - fromx;
      let yDistance = toy - fromy;
      let drawx = [...Array(Math.abs(xDistance)).keys()].map(i => xDistance > 0 ? i + 1 : -i - 1);
      let drawy = [...Array(Math.abs(yDistance)).keys()].map(i => yDistance > 0 ? i + 1 : -i - 1);

      while (drawx.length > 0) {
        let xval = drawx.pop();
        grid[fromx + xval][fromy] = gridValue.rock;
      }
      while (drawy.length > 0) {
        let yval = drawy.pop();
        grid[fromx][fromy + yval] = gridValue.rock;
      }

      fromx = tox;
      fromy = toy;
    }
    return highesty
  }

}

function printGrid(grid: number[][]) {
  let xindexFrom = 0
  let xindexTo = 1000
  let gridlines = ""
  for (let yindex = 0; yindex < grid[0].length; yindex++) {
    let gridline = ""
    for (let xindex = xindexFrom; xindex < xindexTo; xindex++) {

      let val = grid[xindex][yindex]
      let printVal;
      switch (val) {
        case gridValue.rock:
          printVal = '#'
          break;
        case gridValue.sand:
          printVal = 'o'
          break;
        default:
          printVal = '.'
          break;
      }
      gridline += printVal
    }
    gridline += "\n"
    gridlines += gridline;
  }
  console.log(gridlines);
  writeFileSync(puzzleOutputPath, gridlines)
}

function dropOntoGrid(dropStart: number[], grid: number[][]): [number[][], number] {
  let dripping = true;
  let cameAtRestCount = 0;
  let sandx = dropStart[0]
  let sandy = dropStart[1]
  while (dripping) {

    let dropping = true;
    sandx = dropStart[0]
    sandy = dropStart[1]

    if (grid[sandx][sandy + 1] != undefined && grid[sandx - 1][sandy + 1] != undefined && grid[sandx + 1][sandy + 1] != undefined) {
      //source is stuffed
      dropping = false;
      dripping = false;
    }
    while (dropping) {
      let peekGridBelowPosition = grid[sandx][sandy + 1]
      if (peekGridBelowPosition != undefined) {
        //try moving leftunder
        let moved = false
        let peekLeftUnder = grid[sandx - 1][sandy + 1]
        if (peekLeftUnder == undefined) {
          sandx += -1
          sandy += 1
          moved = true
        }
        else {
          //try moving rightunder
          let peekRightUnder = grid[sandx + 1][sandy + 1]
          if (peekRightUnder == undefined) {
            sandx += 1
            sandy += 1
            moved = true
          }
        }
        if (!moved) {
          //came to rest
          cameAtRestCount += 1
        }
        dropping = moved
      }
      else {
        sandy += 1
        if (sandy > 499) {
          dropping = false;
          dripping = false;
        }
      }

    }
    grid[sandx][sandy] = gridValue.sand
  }
  return [grid, cameAtRestCount];
}

async function day14(part: number, print: boolean) {
  const puzzlePrepare = readFileSync(puzzlePath).toString().split('\n')
  const rocks = puzzlePrepare.map(lines => lines.replaceAll(' ', '').split('->').map(x => x.split(',').map(y => parseInt(y))))
  const grid = getGridWithRocks(rocks, part)
  const filledGrid = dropOntoGrid([500, 0], grid)
  if (print) { printGrid(filledGrid[0]);}

  return filledGrid[1] + (part == 2 ? 1 : 0)
}

Promise.all([day14(1, false), day14(2, false)]).then((answer) => console.log(answer.join(', ')))

//answer1 1016
//answer2 25402