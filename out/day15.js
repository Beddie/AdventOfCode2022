"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const puzzlePath = "puzzleinput/day15.txt";
const puzzleOutputPath = "puzzleoutput/day15output.txt";
async function day15(part, print) {
    const beaconAndSignals = (0, fs_1.readFileSync)(puzzlePath).toString().split('\n').map(line => {
        let values = line.split('=');
        let sensorx = values[1].substring(0, values[1].indexOf(','));
        let sensory = values[2].substring(0, values[2].indexOf(':'));
        let beaconx = values[3].substring(0, values[3].indexOf(','));
        let beacony = values[4];
        return [parseInt(sensorx), parseInt(sensory), parseInt(beaconx), parseInt(beacony)];
    });
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
    let uniquelistofbeacons = [];
    beaconAndSignals.forEach((bs) => {
        if (bs[3] == y && !uniquelistofbeacons.find(ul => ul[0] == bs[2] && ul[1] == bs[3])) {
            uniquelistofbeacons.push([bs[2], bs[3]]);
        }
    });
    let amountOfBeacons = uniquelistofbeacons.length;
    for (let index = 0; index < beaconAndSignals.length - 1; index++) {
        let signalBeaconDistance = heuristic(beaconAndSignals[index][0], beaconAndSignals[index][1], beaconAndSignals[index][2], beaconAndSignals[index][3]);
        beaconAndSignals[index].push(signalBeaconDistance);
    }
    if (print) {
        drawGrid(beaconAndSignals);
    }
    if (part == 1) {
        for (let index = -4000000; index < 4000000; index++) {
            let inRadar = false;
            beaconAndSignals.forEach(p => {
                let pointToSensorDistance = heuristic(p[0], p[1], index, y);
                if (pointToSensorDistance <= p[4]) {
                    inRadar = true;
                }
                else {
                    //
                    let test = 0;
                }
                //let logline = `Sensor x:${p[0]} y:${p[1]}, Beacon x:${p[2]} y:${p[3]} = distance ${heuristic(p[0], p[1], p[2], p[3])}`
                //console.log(logline)
            });
            if (inRadar) {
                counter += 1;
            }
        }
        answer = counter - amountOfBeacons;
    }
    if (part == 2) {
        //between all beacons
        let beaconminX = 0;
        let beaconminY = 0;
        let beaconmaxX = 0;
        let beaconmaxY = 0;
        beaconminY = 67249;
        beaconmaxY = 67250;
        beaconminX = 2328400;
        beaconmaxX = 2328500;
        // beaconminX = beaconAndSignals.sort((bs, bs2) => bs[0] - bs2[0])[0][0]
        // beaconminY = beaconAndSignals.sort((bs, bs2) => bs[1] - bs2[1])[0][1]
        // beaconmaxX = beaconAndSignals.sort((bs, bs2) => bs2[0] - bs[0])[0][0]
        // beaconmaxY = beaconAndSignals.sort((bs, bs2) => bs2[1] - bs[1])[0][1]
        let interval = 1;
        for (let indexy = beaconminY; indexy < beaconmaxY; indexy = indexy + interval) {
            console.log(indexy);
            for (let indexx = beaconminX; indexx < beaconmaxX; indexx++) {
                let inRadar = false;
                beaconAndSignals.forEach((p) => {
                    if (!inRadar) {
                        const pointToSensorDistance = heuristic(p[0], p[1], indexx, indexy);
                        if (pointToSensorDistance <= p[4]) {
                            inRadar = true;
                            return;
                        }
                    }
                });
                //let logline = `Sensor x:${p[0]} y:${p[1]}, Beacon x:${p[2]} y:${p[3]} = distance ${heuristic(p[0], p[1], p[2], p[3])}`
                //console.log(logline)
                if (!inRadar) {
                    let countinradar = 0;
                    for (let x = -1; x < 2; x = x + 2) {
                        let isInradar = false;
                        beaconAndSignals.forEach((p) => {
                            if (!isInradar) {
                                const pointToSensorDistance = heuristic(p[0], p[1], indexx + x, indexy);
                                if (pointToSensorDistance <= p[4]) {
                                    isInradar = true;
                                    return;
                                }
                            }
                        });
                        if (isInradar) {
                            countinradar += 1;
                        }
                    }
                    if (countinradar == 2) {
                        let logline = `Sensor x:${indexx} y:${indexy}.`;
                        answer = (4000000 * indexx) + indexy;
                        console.log(logline);
                        for (let y = -1; y < 2; y = y + 2) {
                            let isInradar = false;
                            beaconAndSignals.forEach((p, i) => {
                                let pointToSensorDistance = heuristic(p[0], p[1], indexx, indexy + y);
                                if (pointToSensorDistance <= p[4]) {
                                    isInradar = true;
                                    return;
                                }
                            });
                            if (isInradar) {
                                countinradar += 1;
                            }
                        }
                        if (countinradar == 4) {
                            let logline = `Sensor x:${indexx} y:${indexy}`;
                            answer = (4000000 * indexx) + indexy;
                            console.log(logline);
                        }
                    }
                }
            }
        }
    }
    return answer;
}
Promise.all([day15(2, true)]).then((answer) => console.log(answer.join(', ')));
function drawGrid(beaconAndSignals) {
    const sensorx = 0;
    const sensory = 1;
    const beaconx = 2;
    const beacony = 3;
    const manhattandistance = 4;
    function heuristic(position0x, position0y, position1x, position1y) {
        let d1 = Math.abs(position1x - position0x);
        let d2 = Math.abs(position1y - position0y);
        return d1 + d2;
    }
    let beaconminX = beaconAndSignals.sort((bs, bs2) => bs[sensorx] - bs2[sensorx])[0][sensorx];
    let beaconminY = beaconAndSignals.sort((bs, bs2) => bs[sensory] - bs2[sensory])[0][sensory];
    let beaconmaxX = beaconAndSignals.sort((bs, bs2) => bs2[sensorx] - bs[sensorx])[0][sensorx];
    let beaconmaxY = beaconAndSignals.sort((bs, bs2) => bs2[sensory] - bs[sensory])[0][sensory];
    beaconminY = 67249;
    beaconmaxY = 67250;
    beaconminX = 2328400;
    beaconmaxX = 2328500;
    // 2328628 67000
    let ok = 54;
    let maxnumber = 4000000;
    let xindexFrom = 0;
    let xindexTo = 1000;
    let interval = 1;
    let gridlines = "";
    let arraylength = (beaconmaxX - beaconminX) / interval;
    let grid = [...Array(arraylength)].map(e => Array(arraylength));
    for (let yindex = beaconminY; yindex < beaconmaxY; yindex = yindex + interval) {
        let gridline = "";
        for (let xindex = beaconminX; xindex < beaconmaxX; xindex = xindex + interval) {
            let inRadar = false;
            beaconAndSignals.forEach((p) => {
                if (!inRadar) {
                    const pointToSensorDistance = heuristic(p[0], p[1], xindex, yindex);
                    if (pointToSensorDistance <= p[4]) {
                        inRadar = true;
                        return;
                    }
                }
            });
            let printVal;
            if (inRadar) {
                printVal = '#';
            }
            else {
                console.log(xindex, yindex);
                printVal = '.';
            }
            gridline += printVal;
        }
        gridline += "\n";
        gridlines += gridline;
    }
    console.log(gridlines);
    (0, fs_1.writeFileSync)(puzzleOutputPath, gridlines);
}
//answer1 4725496
//answer2 
//# sourceMappingURL=day15.js.map