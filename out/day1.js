"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var puzzlePath = "puzzleinput/day1_1.txt";
var puzzleString = (0, fs_1.readFileSync)(puzzlePath).toString();
var puzzleInput = puzzleString.split("/n");
var Elf = /** @class */ (function () {
    function Elf() {
    }
    return Elf;
}());
var elves = Elf[0];
//const Elves: string[] = puzzleInput.map((element) => element.);
console.log(puzzleInput);
var elf = new Elf;
elves.push(elf);
puzzleInput.forEach(function (line) {
    if (line.length != 0) {
        elf.calories.push(line);
    }
    else {
        elf = new Elf;
        elves.push(elf);
    }
});
