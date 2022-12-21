import { fstat, readFileSync, writeFileSync } from "fs";
const puzzlePath = "puzzleinput/day15.txt";
const puzzleOutputPath = "puzzleoutput/day15output.txt";

async function day15(part: number, print: boolean) {
  const sensorx = 0
  const sensory = 1
  const beaconx = 2
  const beacony = 3
  const manhattandistance = 4

  const beaconAndsensors = readFileSync(puzzlePath).toString().split('\n').map(line => {
    let values = line.split('=')
    let sensorx = values[1].substring(0, values[1].indexOf(','))
    let sensory = values[2].substring(0, values[2].indexOf(':'))
    let beaconx = values[3].substring(0, values[3].indexOf(','))
    let beacony = values[4]
    return [parseInt(sensorx), parseInt(sensory), parseInt(beaconx), parseInt(beacony)]
  })

  function heuristic(position0x, position0y, position1x, position1y) {
    let d1 = Math.abs(position1x - position0x);
    let d2 = Math.abs(position1y - position0y);
    return d1 + d2;
  }

  //const rocks = puzzlePrepare.map(lines => lines)
  //for every point on one line determine the manhatten distance to all sensors. 
  //If the manhatten distance to the sensor is equal or smaller then the manhatten distance between sensor and  beacon, it is a position wihtout beacon (if no beacon exists at that position!)
  let counter = 0;
  let answer = 0;
  let y = 2000000;
  let uniquelistofbeacons: number[][] = []
  beaconAndsensors.forEach((bs) => {
    if (bs[3] == y && !uniquelistofbeacons.find(ul => ul[0] == bs[2] && ul[1] == bs[3])) {
      uniquelistofbeacons.push([bs[2], bs[3]])
    }
  });
  let amountOfBeacons = uniquelistofbeacons.length;

  for (let index = 0; index < beaconAndsensors.length; index++) {
    let sensorBeaconDistance = heuristic(beaconAndsensors[index][0], beaconAndsensors[index][1], beaconAndsensors[index][2], beaconAndsensors[index][3]);
    beaconAndsensors[index].push(sensorBeaconDistance)
  }

  if (part == 1) {
    for (let index = -4000000; index < 4000000; index++) {
      let inRadar = false;
      beaconAndsensors.forEach(p => {
        let pointToSensorDistance = heuristic(p[beaconx], p[beacony], index, y);
        if (pointToSensorDistance <= p[4]) {
          inRadar = true
        }
        //let logline = `Sensor x:${p[0]} y:${p[1]}, Beacon x:${p[2]} y:${p[3]} = distance ${heuristic(p[0], p[1], p[2], p[3])}`
        //console.log(logline)
      })

      if (inRadar) {
        counter += 1
      }
    }
    answer = counter - amountOfBeacons;
  }

  if (part == 2) {
    console.log("start part 2")
    const rawgrid = scanAndGetRawGrid(beaconAndsensors);
    const grid = getIntrestingCoords(rawgrid);
    console.log("grid length: ", grid.length);
    grid.forEach(coord => {
      const x = coord[0] * 1000;
      const y = coord[1] * 1000;
      console.log(x, y);
      const beaconmaxX = 4000000;
      const beaconmaxY = 4000000;

      for (let indexy = y; indexy < y + 1002 && y < beaconmaxY + 1002; indexy++) {
        for (let indexx = x; indexx < x + 1002 && x < beaconmaxX + 1002; indexx++) {
          let inRadar = false;
          beaconAndsensors.forEach((p) => {
            if (!inRadar) {
              if (heuristic(p[sensorx], p[sensory], indexx, indexy) <= p[manhattandistance]) {
                inRadar = true;
                return;
              }
            }
          })
          if (!inRadar) {
            writeFileSync(puzzleOutputPath, `Distress beacon x:${indexx} y:${indexy}..`)
          }
        }
      }
    })
  }

  return answer
}

function drawGrid(beaconAndsensors: number[][], beaconminX: number, beaconmaxX: number, beaconminY: number, beaconmaxY: number) {
  const sensorx = 0
  const sensory = 1

  function heuristic(position0x, position0y, position1x, position1y) {
    let d1 = Math.abs(position1x - position0x);
    let d2 = Math.abs(position1y - position0y);
    return d1 + d2;
  }

  let interval = 1000
  let gridlines = ""

  for (let yindex = beaconminY; yindex < beaconmaxY; yindex = yindex + interval) {
    let gridline = ""
    for (let xindex = beaconminX; xindex < beaconmaxX; xindex = xindex + interval) {
      let numberofbeacon: string;
      let inRadar: boolean = false;
      beaconAndsensors.forEach((p, i) => {
        if (!inRadar) {
          const pointToSensorDistance = heuristic(p[sensorx], p[sensory], xindex, yindex);
          if (pointToSensorDistance <= p[4]) {
            inRadar = true;
            numberofbeacon = String(i)
            return;
          }
        }
      })

      let printVal: string;
      if (inRadar) {
        printVal = numberofbeacon.padStart(2, "0");
      }
      else {
        console.log(xindex, yindex)
        printVal = 'XX'
      }

      gridline += printVal
    }
    gridline += "\n"
    gridlines += gridline;
  }
  console.log(gridlines);
  writeFileSync(puzzleOutputPath, gridlines)
  console.log("done")
}


function scanAndGetRawGrid(beaconAndsensors: number[][]): number[][] {
  const sensorx = 0
  const sensory = 1
  const beaconx = 2
  const beacony = 3
  const manhattandistance = 4

  function heuristic(position0x, position0y, position1x, position1y) {
    let d1 = Math.abs(position1x - position0x);
    let d2 = Math.abs(position1y - position0y);
    return d1 + d2;
  }

  let beaconminX = 0
  let beaconminY = 0
  let beaconmaxX = 4000000
  let beaconmaxY = 4000000

  let interval = 1000
  let verhouding = 4000

  let intrestingGrid = Array.from(Array(verhouding), () => new Array(verhouding));

  for (let yindex = beaconminY; yindex < beaconmaxY; yindex = yindex + interval) {
    for (let xindex = beaconminX; xindex < beaconmaxX; xindex = xindex + interval) {
      let numberofbeacon: number;
      let inRadar: boolean = false;
      beaconAndsensors.forEach((p, i) => {
        if (!inRadar) {
          const pointToSensorDistance = heuristic(p[sensorx], p[sensory], xindex, yindex);
          if (pointToSensorDistance <= p[4]) {
            inRadar = true;
            numberofbeacon = i
            return;
          }
        }
      })

      if (inRadar) {
        intrestingGrid[xindex / interval][yindex / interval] = numberofbeacon
      }
    }
  }
  //drawIntrestingGrid(intrestingGrid);
  return intrestingGrid;
}



function drawIntrestingGrid(intrestingGrid: number[][]) {
  let gridlines = ""
  for (let yindex = 0; yindex < intrestingGrid.length - 1; yindex++) {
    let gridline = ""
    for (let xindex = 0; xindex < intrestingGrid[0].length - 1; xindex++) {
      gridline += String(intrestingGrid[xindex][yindex]).padStart(2, "0");
    }
    gridline += "\n"
    gridlines += gridline;
  }
  console.log(gridlines);
  writeFileSync(puzzleOutputPath, gridlines)
  console.log("done intresting grid")
}

function getIntrestingCoords(rawgrid: number[][]) {
  let intrestingCoords = []
  for (let y = 0; y < rawgrid.length - 2; y++) {
    for (let x = 0; x < rawgrid[0].length - 2; x++) {
      const curx = rawgrid[x][y]
      const nextx = rawgrid[x + 1][y]
      const belowx = rawgrid[x][y + 1]
      const diagfromx = rawgrid[x + 1][y + 1]

      if (curx != nextx || curx != belowx || curx != diagfromx) {
        intrestingCoords.push([x, y])
      }
    }
  }
  return intrestingCoords;
}

Promise.all([day15(1, false), day15(2, false)]).then((answer) => console.log(answer.join(', ')))

//answer1 4725496
//answer2 12051287042458
//TODO refactor