import { readFileSync } from "fs";
const puzzlePath = "puzzleinput/day3.txt";
const puzzleString: string = readFileSync(puzzlePath).toString();
const puzzleInputPrepare1: string[] = puzzleString.split("\n");

async function day3() {

    const puzzleInput: string[][] = puzzleInputPrepare1.map((line) => [line.substring(0,line.length/2),line.substring(line.length/2,line.length)])
    let answer1 : number = 0;

    puzzleInput.forEach(rucksack => {
            let string1 = rucksack[0];
            let string2 = rucksack[1];
            let doubleItems =[...[...string1].reduce((double, char)=> [...string2].includes(char) ? [...double].includes(char) ? double : double + char : double,"")]
            let sumOfDoubleItems = doubleItems.map((c)=> c.toUpperCase() === c ?  c.charCodeAt(0) - 38 :  c.charCodeAt(0) - 96);
            sumOfDoubleItems.forEach((unicode) => answer1 += unicode);
    });

    console.log(answer1); //7848
}

// A = 65
// Z = 90
// a = 97
// z = 122

// const answer1 = puzzleInput.reduce((sum, match) => sum + match.matchScore(), 0);
// console.log(answer1);
// const answer2 = puzzleInput.reduce((sum, match) => sum + match.matchGoalScore(), 0);
// console.log(answer2);
//}

day3();