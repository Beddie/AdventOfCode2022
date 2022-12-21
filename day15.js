"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var fs_1 = require("fs");
var puzzlePath = "puzzleinput/day15.txt";
var puzzleOutputPath = "puzzleoutput/day15output.txt";
function day15(part, print) {
    return __awaiter(this, void 0, void 0, function () {
        function heuristic(position0x, position0y, position1x, position1y) {
            var d1 = Math.abs(position1x - position0x);
            var d2 = Math.abs(position1y - position0y);
            return d1 + d2;
        }
        var sensorx, sensory, beaconx, beacony, manhattandistance, beaconAndsensors, counter, answer, y, uniquelistofbeacons, amountOfBeacons, index, sensorBeaconDistance, verhouding, beaconminX, beaconmaxX, beaconminY, beaconmaxY, _loop_1, index, rawgrid, grid, interval;
        return __generator(this, function (_a) {
            sensorx = 0;
            sensory = 1;
            beaconx = 2;
            beacony = 3;
            manhattandistance = 4;
            beaconAndsensors = (0, fs_1.readFileSync)(puzzlePath).toString().split('\n').map(function (line) {
                var values = line.split('=');
                var sensorx = values[1].substring(0, values[1].indexOf(','));
                var sensory = values[2].substring(0, values[2].indexOf(':'));
                var beaconx = values[3].substring(0, values[3].indexOf(','));
                var beacony = values[4];
                return [parseInt(sensorx), parseInt(sensory), parseInt(beaconx), parseInt(beacony)];
            });
            counter = 0;
            answer = 0;
            y = 2000000;
            uniquelistofbeacons = [];
            beaconAndsensors.forEach(function (bs) {
                if (bs[3] == y && !uniquelistofbeacons.find(function (ul) { return ul[0] == bs[2] && ul[1] == bs[3]; })) {
                    uniquelistofbeacons.push([bs[2], bs[3]]);
                }
            });
            amountOfBeacons = uniquelistofbeacons.length;
            for (index = 0; index < beaconAndsensors.length; index++) {
                sensorBeaconDistance = heuristic(beaconAndsensors[index][0], beaconAndsensors[index][1], beaconAndsensors[index][2], beaconAndsensors[index][3]);
                beaconAndsensors[index].push(sensorBeaconDistance);
            }
            verhouding = 4000;
            beaconminX = (846 / 2) * verhouding //0
            ;
            beaconmaxX = (1050 / 2) * verhouding //4000000
            ;
            beaconminY = 0 * verhouding;
            beaconmaxY = 42 * verhouding //4000000
            ;
            if (print) {
                //drawGrid(beaconAndsensors, beaconminX, beaconmaxX, beaconminY, beaconmaxY);
            }
            if (part == 1) {
                _loop_1 = function (index) {
                    var inRadar = false;
                    beaconAndsensors.forEach(function (p) {
                        var pointToSensorDistance = heuristic(p[beaconx], p[beacony], index, y);
                        if (pointToSensorDistance <= p[4]) {
                            inRadar = true;
                        }
                        else {
                            //
                            var test = 0;
                        }
                        //let logline = `Sensor x:${p[0]} y:${p[1]}, Beacon x:${p[2]} y:${p[3]} = distance ${heuristic(p[0], p[1], p[2], p[3])}`
                        //console.log(logline)
                    });
                    if (inRadar) {
                        counter += 1;
                    }
                };
                for (index = -4000000; index < 4000000; index++) {
                    _loop_1(index);
                }
                answer = counter - amountOfBeacons;
            }
            if (part == 2) {
                console.log("start part 2");
                rawgrid = scanAndGetRawGrid(beaconAndsensors);
                grid = getIntrestingCoords(rawgrid);
                grid.forEach(function (coord) {
                    var x = coord[0] * 100;
                    var y = coord[1] * 100;
                    var beaconminX = 0;
                    var beaconminY = 0;
                    var beaconmaxX = 4000000;
                    var beaconmaxY = 4000000;
                    var _loop_2 = function (indexy) {
                        var _loop_3 = function (indexx) {
                            //let breaky = indexy == 1 && indexx == 19;
                            var inRadar = false;
                            beaconAndsensors.forEach(function (p) {
                                if (!inRadar) {
                                    if (heuristic(p[sensorx], p[sensory], indexx, indexy) <= p[manhattandistance]) {
                                        inRadar = true;
                                        return;
                                    }
                                }
                            });
                            if (!inRadar) {
                                var logline = "Sensor x:".concat(indexx, " y:").concat(indexy, "..");
                                console.log(logline);
                            }
                        };
                        //console.log(indexy);
                        for (var indexx = x; indexx < x + 102 && x < beaconmaxX + 102; indexx++) {
                            _loop_3(indexx);
                        }
                    };
                    for (var indexy = y; indexy < y + 102 && y < beaconmaxY + 102; indexy++) {
                        _loop_2(indexy);
                    }
                });
                interval = 1;
            }
            return [2 /*return*/, answer];
        });
    });
}
Promise.all([day15(2, true)]).then(function (answer) { return console.log(answer.join(', ')); });
function drawGrid(beaconAndsensors, beaconminX, beaconmaxX, beaconminY, beaconmaxY) {
    var sensorx = 0;
    var sensory = 1;
    var beaconx = 2;
    var beacony = 3;
    var manhattandistance = 4;
    function heuristic(position0x, position0y, position1x, position1y) {
        var d1 = Math.abs(position1x - position0x);
        var d2 = Math.abs(position1y - position0y);
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
    var maxnumber = 4000000;
    var interval = 1000;
    //let interval = 1
    var verhouding = 4000;
    // beaconminX = (1219 / 2) * verhouding  //0
    // beaconmaxX = (1222 / 2) * verhouding //4000000
    // beaconminY = 936 * verhouding
    // beaconmaxY = 938 * verhouding //4000000
    // 2328628 67000
    var ok = 54;
    var xindexFrom = 0;
    var xindexTo = 1000;
    var gridlines = "";
    var _loop_4 = function (yindex) {
        var gridline = "";
        var _loop_5 = function (xindex) {
            var numberofbeacon;
            var inRadar = false;
            beaconAndsensors.forEach(function (p, i) {
                if (!inRadar) {
                    var pointToSensorDistance = heuristic(p[sensorx], p[sensory], xindex, yindex);
                    if (pointToSensorDistance <= p[4]) {
                        inRadar = true;
                        numberofbeacon = String(i);
                        return;
                    }
                }
            });
            var printVal = void 0;
            if (inRadar) {
                // printVal = numberofbeacon > 9 ? numberofbeacon-10 : numberofbeacon > 19 ? numberofbeacon-20 : numberofbeacon > 29 ? numberofbeacon-30 : numberofbeacon //String(numberofbeacon).padStart(2,"0") numberofbeacn
                //do nothing
                printVal = numberofbeacon.padStart(2, "0");
            }
            else {
                console.log(xindex, yindex);
                printVal = 'XX';
            }
            gridline += printVal;
        };
        for (var xindex = beaconminX; xindex < beaconmaxX; xindex = xindex + interval) {
            _loop_5(xindex);
        }
        gridline += "\n";
        gridlines += gridline;
    };
    //let arraylength = maxnumber / interval
    //let grid = [...Array(arraylength)].map(e => Array(arraylength));
    for (var yindex = beaconminY; yindex < beaconmaxY; yindex = yindex + interval) {
        _loop_4(yindex);
    }
    console.log(gridlines);
    (0, fs_1.writeFileSync)(puzzleOutputPath, gridlines);
    console.log("done");
}
function scanAndGetRawGrid(beaconAndsensors) {
    var sensorx = 0;
    var sensory = 1;
    var beaconx = 2;
    var beacony = 3;
    var manhattandistance = 4;
    function heuristic(position0x, position0y, position1x, position1y) {
        var d1 = Math.abs(position1x - position0x);
        var d2 = Math.abs(position1y - position0y);
        return d1 + d2;
    }
    var beaconminX = 0;
    var beaconminY = 0;
    var beaconmaxX = 4000000;
    var beaconmaxY = 4000000;
    var interval = 100;
    var verhouding = 40000;
    var intrestingGrid = Array.from(Array(verhouding), function () { return new Array(verhouding); });
    var _loop_6 = function (yindex) {
        var gridline = "";
        var _loop_7 = function (xindex) {
            var numberofbeacon;
            var inRadar = false;
            beaconAndsensors.forEach(function (p, i) {
                if (!inRadar) {
                    var pointToSensorDistance = heuristic(p[sensorx], p[sensory], xindex, yindex);
                    if (pointToSensorDistance <= p[4]) {
                        inRadar = true;
                        numberofbeacon = i;
                        return;
                    }
                }
            });
            if (inRadar) {
                // printVal = numberofbeacon > 9 ? numberofbeacon-10 : numberofbeacon > 19 ? numberofbeacon-20 : numberofbeacon > 29 ? numberofbeacon-30 : numberofbeacon //String(numberofbeacon).padStart(2,"0") numberofbeacn
                //do nothing
                intrestingGrid[xindex / interval][yindex / interval] = numberofbeacon;
            }
        };
        for (var xindex = beaconminX; xindex < beaconmaxX; xindex = xindex + interval) {
            _loop_7(xindex);
        }
    };
    for (var yindex = beaconminY; yindex < beaconmaxY; yindex = yindex + interval) {
        _loop_6(yindex);
    }
    //drawIntrestingGrid(intrestingGrid);
    return intrestingGrid;
}
function drawIntrestingGrid(intrestingGrid) {
    var gridlines = "";
    for (var yindex = 0; yindex < intrestingGrid.length - 1; yindex++) {
        var gridline = "";
        for (var xindex = 0; xindex < intrestingGrid[0].length - 1; xindex++) {
            gridline += String(intrestingGrid[xindex][yindex]).padStart(2, "0");
        }
        gridline += "\n";
        gridlines += gridline;
    }
    console.log(gridlines);
    (0, fs_1.writeFileSync)(puzzleOutputPath, gridlines);
    console.log("done intresting grid");
}
function getIntrestingCoords(rawgrid) {
    var intrestingCoords = [];
    for (var y = 0; y < rawgrid.length - 2; y++) {
        for (var x = 0; x < rawgrid[0].length - 2; x++) {
            var curx = rawgrid[x][y];
            var nextx = rawgrid[x + 1][y];
            var belowx = rawgrid[x][y + 1];
            var diagfromx = rawgrid[x + 1][y + 1];
            if (curx != nextx || curx != belowx || curx != diagfromx) {
                intrestingCoords.push([x, y]);
            }
        }
    }
    return intrestingCoords;
}
//answer1 4725496
//answer2 9313792067249 // to low!
