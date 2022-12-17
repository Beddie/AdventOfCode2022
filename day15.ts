import { fstat, readFileSync, writeFileSync } from "fs";
const puzzlePath = "puzzleinput/day15.txt";

async function day15(part: number, print: boolean) {
  const beaconAndSignals = readFileSync(puzzlePath).toString().split('\n').map(line => {
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
  let counter = 0
  let y = 2000000;
  let uniquelistofbeacons: number[][] = []
  beaconAndSignals.forEach((bs) => {
    if (bs[3] == y && !uniquelistofbeacons.find(ul => ul[0] == bs[2] && ul[1] == bs[3])) {
      uniquelistofbeacons.push([bs[2], bs[3]])
    }
  });
  let amountOfBeacons = uniquelistofbeacons.length;

  for (let index = 0; index < beaconAndSignals.length - 1; index++) {
    let signalBeaconDistance = heuristic(beaconAndSignals[index][0], beaconAndSignals[index][1], beaconAndSignals[index][2], beaconAndSignals[index][3]);
    beaconAndSignals[index].push(signalBeaconDistance)
    
  }
  for (let index = -10000000; index < 10000000; index++) {
    let inRadar = false;
    beaconAndSignals.forEach(p => {
      let pointToSensorDistance = heuristic(p[0], p[1], index, y);
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
  return counter - amountOfBeacons
}

Promise.all([day15(2, false)]).then((answer) => console.log(answer.join(', ')))

//answer1 4725496
//answer2 