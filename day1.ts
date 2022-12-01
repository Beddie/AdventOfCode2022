import { readFileSync } from "fs";
const puzzlePath = "puzzleinput/day1.txt";
const puzzleString: string = readFileSync(puzzlePath).toString();
const puzzleInputPrepare1: string[] = puzzleString.split("\n\n");

class Elf {
    constructor(puzzleArray: string[]) {
        const calories = puzzleArray.map(cal => parseInt(cal));
        this.totalCalories = calories.reduce((sum, current) => sum + current, 0);
    }
    public totalCalories: number;
}

const puzzleInput: Elf[] = puzzleInputPrepare1.map((lines) => new Elf(lines.split("\n")));

const answer1 = Math.max(...puzzleInput.map(elf => elf.totalCalories));
console.log(answer1);

const answer2 = puzzleInput
                    .sort((elf1,elf2) => elf2.totalCalories - elf1.totalCalories)
                    .slice(0,3)
                    .reduce((sum, elf) => sum + elf.totalCalories, 0);
console.log(answer2);
