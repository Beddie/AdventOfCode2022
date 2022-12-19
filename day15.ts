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

  let verhouding = 4000

  const beaconminX = (846 / 2) * verhouding  //0
  const beaconmaxX = (1050 / 2) * verhouding //4000000
  const beaconminY = 0 * verhouding
  const beaconmaxY = 42 * verhouding //4000000
  if (print) {

    //drawGrid(beaconAndsensors, beaconminX, beaconmaxX, beaconminY, beaconmaxY);
  }
  if (part == 1) {
    for (let index = -4000000; index < 4000000; index++) {
      let inRadar = false;
      beaconAndsensors.forEach(p => {
        let pointToSensorDistance = heuristic(p[beaconx], p[beacony], index, y);
        if (pointToSensorDistance <= p[4]) {
          inRadar = true
        }
        else {
          //
          let test = 0
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

    const rawgrid = scanAndGetRawGrid(beaconAndsensors);
    const grid = getIntrestingCoords(rawgrid);

    grid.forEach(coord => {
      const x = coord[0] * 1000;
      const y = coord[1] * 1000;
      const beaconminX = 0;
      const beaconminY = 0;
      const beaconmaxX = 4000000;
      const beaconmaxY = 4000000;

      for (let indexy = y; indexy < y + 1002 && y < beaconmaxY + 1002; indexy++) {
        //console.log(indexy);
        for (let indexx = x; indexx < x + 1002 && x < beaconmaxX + 1002; indexx++) {
          //let breaky = indexy == 1 && indexx == 19;
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
            let logline = `Sensor x:${indexx} y:${indexy}..`
            console.log(logline);
          }
        }
      }
    })
    //between all beacons
    

    // beaconminY = 67249
    // beaconmaxY = 67250
    // beaconminX = 2328400
    // beaconmaxX = 2328500

    // beaconminX = beaconAndsensors.sort((bs, bs2) => bs[0] - bs2[0])[0][0]
    // beaconminY = beaconAndsensors.sort((bs, bs2) => bs[1] - bs2[1])[0][1]
    // beaconmaxX = beaconAndsensors.sort((bs, bs2) => bs2[0] - bs[0])[0][0]
    // beaconmaxY = beaconAndsensors.sort((bs, bs2) => bs2[1] - bs[1])[0][1]



    //scan a grid 3x3. If 3 numbers store topleft and topleft x+y
    const interval = 1;
   
  }

  return answer
}

Promise.all([day15(2, true)]).then((answer) => console.log(answer.join(', ')))


function drawGrid(beaconAndsensors: number[][], beaconminX: number, beaconmaxX: number, beaconminY: number, beaconmaxY: number) {
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

  // let beaconminX = beaconAndsensors.sort((bs, bs2) => bs[beaconx] - bs2[beaconx])[0][beaconx]
  // let beaconminY = beaconAndsensors.sort((bs, bs2) => bs[beacony] - bs2[beacony])[0][beacony]
  // let beaconmaxX = beaconAndsensors.sort((bs, bs2) => bs2[beaconx] - bs[beaconx])[0][beaconx]
  // let beaconmaxY = beaconAndsensors.sort((bs, bs2) => bs2[beacony] - bs[beacony])[0][beacony]

  // beaconminY = 2475 * 1000
  // beaconmaxY = 2477 * 1000
  // beaconminX = 5649 * 500
  // beaconmaxX = 5653 * 500

  // beaconminY = 2374 * 1000
  // beaconmaxY = 2598 * 1000
  // beaconminX = 5440 * 500
  // beaconmaxX = 6028 * 500
  let maxnumber = 4000000
  let interval = 1000
  //let interval = 1
  let verhouding = 4000

  // beaconminX = (1219 / 2) * verhouding  //0
  // beaconmaxX = (1222 / 2) * verhouding //4000000
  // beaconminY = 936 * verhouding
  // beaconmaxY = 938 * verhouding //4000000

  // 2328628 67000
  let ok = 54;
  let xindexFrom = 0
  let xindexTo = 1000

  let gridlines = ""

  //let arraylength = maxnumber / interval
  //let grid = [...Array(arraylength)].map(e => Array(arraylength));

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
        // printVal = numberofbeacon > 9 ? numberofbeacon-10 : numberofbeacon > 19 ? numberofbeacon-20 : numberofbeacon > 29 ? numberofbeacon-30 : numberofbeacon //String(numberofbeacon).padStart(2,"0") numberofbeacn
        //do nothing
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
    let gridline = ""
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
        // printVal = numberofbeacon > 9 ? numberofbeacon-10 : numberofbeacon > 19 ? numberofbeacon-20 : numberofbeacon > 29 ? numberofbeacon-30 : numberofbeacon //String(numberofbeacon).padStart(2,"0") numberofbeacn
        //do nothing
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
    for (let x = 0; x < rawgrid[0].length -2; x++) {
      const curx =  rawgrid[x][y]
      const nextx =  rawgrid[x + 1][y]
      const belowx =  rawgrid[x][y+ 1]
      const diagfromx =  rawgrid[x + 1][y + 1]

      if (curx != nextx || curx!= belowx || curx != diagfromx){
        intrestingCoords.push([x,y])
      }
    }
  }
  return intrestingCoords;
}
//answer1 4725496
//answer2 9313792067249 // to low!