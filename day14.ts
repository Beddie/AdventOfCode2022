import { fstat, readFileSync, writeFileSync } from "fs";
const puzzlePath = "puzzleinput/day14.txt";
const puzzleOutputPath = "puzzleoutput/day14output.txt";

async function day14(part: number, print: boolean) {
  let answer = 0;
  const puzzlePrepare = readFileSync(puzzlePath).toString().split('\n')
  const rocks = puzzlePrepare.map(lines => lines.replaceAll(' ', '').split('->').map(x => x.split(',').map(y => parseInt(y))))

  const grid = getGridWithRocks(rocks)
  printGrid(grid)

  return answer
}

Promise.all([day14(1, true)]).then((answer) => console.log(answer.join(', ')))

// 498,4 -> 498,6 -> 496,6
// 503,4 -> 502,4 -> 502,9 -> 494,9
function getGridWithRocks(rocks: number[][][]): number[][] {
  let x = 1000
  let y = 50
  let grid = Array.from(Array(x), () => new Array(y))
  rocks.forEach((rockPaths, rockPathsIndex) => {

    let fromx = rockPaths[0][0]
    let fromy = rockPaths[0][1]
    grid[fromx][fromy] = "#"
    grid[fromx][fromy] = "#"

    for (let index = 1; index < rockPaths.length - 1; index++) {

      let tox = rockPaths[index][0]
      let toy = rockPaths[index][1]
      let xDistance = tox - fromx;
      let yDistance = toy - fromy;
      let drawx = [...Array(Math.abs(xDistance)).keys()].map(i => xDistance > 0 ? i + 1 : -i - 1);
      let drawy = [...Array(Math.abs(yDistance)).keys()].map(i => yDistance > 0 ? i + 1 : -i - 1);
      let test = 1
      fromx = tox
      fromy = toy

      while (drawx.length > 0) {
        let xval = drawx.pop()
        grid[fromx + xval][fromy] = "#"
      }
      while (drawy.length > 0) {
        let yval = drawy.pop()
        grid[fromx][fromy + yval] = "#"
      }
    }


  })
  return grid;
}

function printGrid(grid: number[][]) {
  let xindexFrom = 460
  let xindexTo = 520 
  let gridlines = []
  for (let yindex = 0; yindex < grid[0].length; yindex++) {
    let gridline = ""
    for (let xindex = xindexFrom; xindex < xindexTo; xindex++) {
      gridline += grid[xindex][yindex] ? grid[xindex][yindex] : '.'
    }
    gridline += "\n"
    gridlines.push(gridline);
  }
  console.log(gridlines);
}
//answer1
//answer2 