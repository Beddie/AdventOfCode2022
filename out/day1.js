"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const puzzlePath = "puzzleinput/day1.txt";
const puzzleString = (0, fs_1.readFileSync)(puzzlePath).toString();
const puzzleInputPrepare1 = puzzleString.split("\n\n");
class Elf {
    constructor(puzzleArray) {
        const calories = puzzleArray.map(cal => parseInt(cal));
        this.totalCalories = calories.reduce((sum, current) => sum + current, 0);
    }
    totalCalories;
}
const puzzleInput = puzzleInputPrepare1.map((lines) => new Elf(lines.split("\n")));
const answer1 = Math.max(...puzzleInput.map(elf => elf.totalCalories));
console.log(answer1);
const answer2 = puzzleInput
    .sort((elf1, elf2) => elf2.totalCalories - elf1.totalCalories)
    .slice(0, 3)
    .reduce((sum, elf) => sum + elf.totalCalories, 0);
console.log(answer2);
//# sourceMappingURL=day1.js.map