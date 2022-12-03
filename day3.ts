import { readFileSync } from "fs";
const puzzlePath = "puzzleinput/day3.txt";
const puzzleString: string = readFileSync(puzzlePath).toString();
const puzzleInputPrepare1: string[] = puzzleString.split("\n");
const puzzleInput: string[][] = puzzleInputPrepare1.map((line) => [line.substring(0,line.length/2),line.substring(line.length/2,line.length)])

function getFirstCharCodeFromString(content: string) {
    // A = 65
    // Z = 90
    // a = 97   
    // z = 122
    return content.toUpperCase() === content ? content.charCodeAt(0) - 38 : content.charCodeAt(0) - 96;
}

function getDoubleChars(string1: string, string2: string) {
    return [...string1].reduce((double, char) => [...string2].includes(char) ? [...double].includes(char) ? double : double + char : double, "");
}

async function day3() {
    let answer1 : number = 0;
    let answer2 : number = 0;
    
    let elfGroups: [{}];
    let threeElves: string[] = [];

    puzzleInput.forEach(rucksack => {
        let doubleItems =[...getDoubleChars(rucksack[0], rucksack[1])]
        let sumOfDoubleItems = doubleItems.map((doubleItem)=> getFirstCharCodeFromString(doubleItem));
        answer1 += sumOfDoubleItems[0];
    });
    
    console.log(answer1); //7848

    puzzleInputPrepare1.forEach((line, index) => {
        threeElves.push(line);
        if ((index + 1) % 3 == 0) {
            elfGroups ? elfGroups.push(threeElves) : elfGroups = [threeElves];
            threeElves = [];
        }
    }); 

    elfGroups.forEach(elfGroup => {
        let doubleItems = getDoubleChars(getDoubleChars(elfGroup[0], elfGroup[1]), elfGroup[2])
        answer2 += getFirstCharCodeFromString(doubleItems)
    });

    console.log(answer2); //2616
}

day3();