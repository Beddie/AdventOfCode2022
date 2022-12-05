"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const puzzlePath = "puzzleinput/day5.txt";
const puzzleString = (0, fs_1.readFileSync)(puzzlePath).toString();
const puzzleInputStacks = puzzleString.substring(0, puzzleString.indexOf('move')).split("\n");
const puzzleInputProcedure = puzzleString.substring(puzzleString.indexOf('move')).split("\n");
//const puzzleInputPrepare2: string[] = puzzleInputPrepare1[0].split('move',2);
//const puzzleInputPrepare3: string[] = puzzleInputPrepare1[1].split('move',2);
var SectionIndex;
(function (SectionIndex) {
    SectionIndex[SectionIndex["Elf1Start"] = 0] = "Elf1Start";
    SectionIndex[SectionIndex["Elf1End"] = 1] = "Elf1End";
    SectionIndex[SectionIndex["Elf2Start"] = 2] = "Elf2Start";
    SectionIndex[SectionIndex["Elf2End"] = 3] = "Elf2End";
})(SectionIndex || (SectionIndex = {}));
async function day5() {
    let answer1 = 0;
    let answer2 = 0;
    let test = puzzleInputStacks;
    let test2 = puzzleInputProcedure;
    let line = "";
    while (line == "") {
        line = puzzleInputStacks.pop().trim();
    }
    //let numbersOfStacks = line.split(/\s+/).length
    const stackGrid = [];
    puzzleInputStacks.reverse();
    let stackLine = puzzleInputStacks.pop();
    let rowNumber = 0;
    while (stackLine && stackLine != "") {
        stackLine += " ";
        let linestak = [];
        let lineStacks = Array.from(stackLine).reduce((total, x, i) => {
            total += x;
            if ((i + 1) % 4 == 0) {
                linestak[linestak.length] = total.trim().replace("[", "").replace("]", "");
                total = "";
            }
            return total;
        });
        stackGrid[rowNumber] = linestak;
        rowNumber++;
        stackLine = puzzleInputStacks.pop();
        console.log(stackGrid.toString());
    }
}
day5();
// const puzzleInput: Number[][] = puzzleInputPrepare1
//                                     .map((sections) => sections.split(",")
//                                     .flatMap((elfsection)=> elfsection.split("-")
//                                                                 .map((numberString)=>  Number(numberString))));    
// puzzleInput.forEach(elfPair => {
//     if (
//             (elfPair[SectionIndex.Elf1Start] <= elfPair[SectionIndex.Elf2Start] && elfPair[SectionIndex.Elf1End] >= elfPair[SectionIndex.Elf2End])
//             ||
//             (elfPair[SectionIndex.Elf2Start] <= elfPair[SectionIndex.Elf1Start] && elfPair[SectionIndex.Elf2End] >= elfPair[SectionIndex.Elf1End])
//         ) { 
//             answer1 += 1; 
//         } 
// });
// puzzleInput.forEach(elfPair => {
//     if  (
//             (elfPair[SectionIndex.Elf1Start] >= elfPair[SectionIndex.Elf2Start] && elfPair[SectionIndex.Elf1Start] <= elfPair[SectionIndex.Elf2End])
//             ||
//             (elfPair[SectionIndex.Elf2Start] >= elfPair[SectionIndex.Elf1Start] && elfPair[SectionIndex.Elf2Start] <= elfPair[SectionIndex.Elf1End])
//         ) { 
//             answer2 += 1; 
//         }
// });
// console.log(answer1); //595
// console.log(answer2); //952
//# sourceMappingURL=day5.js.map