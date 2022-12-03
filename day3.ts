import { readFileSync } from "fs";
const puzzlePath = "puzzleinput/day3.txt";
const puzzleString: string = readFileSync(puzzlePath).toString();
const puzzleInputPrepare1: string[] = puzzleString.split("\n");

async function day3() {



const puzzleInput: string[][] = puzzleInputPrepare1.map((line) => [line.substring(0,line.length/2),line.substring(line.length/2,line.length)])
console.log(puzzleInput[0]);

// const answer1 = puzzleInput.reduce((sum, match) => sum + match.matchScore(), 0);
// console.log(answer1);
// const answer2 = puzzleInput.reduce((sum, match) => sum + match.matchGoalScore(), 0);
// console.log(answer2);
}

day3();