"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var puzzlePath = "puzzleinput/day1.txt";
var puzzleString = (0, fs_1.readFileSync)(puzzlePath).toString();
var puzzleInputPrepare1 = puzzleString.split("\n\n");
var Elf = /** @class */ (function () {
    function Elf(puzzleArray) {
        var calories = puzzleArray.map(function (cal) { return parseInt(cal); });
        this.totalCalories = calories.reduce(function (sum, current) { return sum + current; }, 0);
    }
    return Elf;
}());
var puzzleInput = puzzleInputPrepare1.map(function (lines) { return new Elf(lines.split("\n")); });
var answer1 = Math.max.apply(Math, puzzleInput.map(function (elf) { return elf.totalCalories; }));
console.log(answer1);
var answer2 = puzzleInput
    .sort(function (elf1, elf2) { return elf2.totalCalories - elf1.totalCalories; })
    .slice(0, 3)
    .reduce(function (sum, elf) { return sum + elf.totalCalories; }, 0);
console.log(answer2);
//# sourceMappingURL=day1.js.map