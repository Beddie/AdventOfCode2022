import { readFileSync } from "fs";
const puzzlePath = "puzzleinput/day1_1.txt"
const puzzleString: string = readFileSync(puzzlePath).toString();
const puzzleInput: string[] = puzzleString.split("/n");

class Elf {
    calories: string[]
}

let elves: Elf[] = Elf[0];

//const Elves: string[] = puzzleInput.map((element) => element.);
console.log(puzzleInput);
let elf = new Elf;
elves.push(elf);
puzzleInput.forEach(line => {
    if (line.length != 0){
        elf.calories.push(line);
    }
    else {
        elf = new Elf;
        elves.push(elf);
    }
});

