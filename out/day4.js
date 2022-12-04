"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const puzzlePath = "puzzleinput/day4.txt";
const puzzleString = (0, fs_1.readFileSync)(puzzlePath).toString();
const puzzleInputPrepare1 = puzzleString.split("\n");
var SectionIndex;
(function (SectionIndex) {
    SectionIndex[SectionIndex["Elf1Start"] = 0] = "Elf1Start";
    SectionIndex[SectionIndex["Elf1End"] = 1] = "Elf1End";
    SectionIndex[SectionIndex["Elf2Start"] = 2] = "Elf2Start";
    SectionIndex[SectionIndex["Elf2End"] = 3] = "Elf2End";
})(SectionIndex || (SectionIndex = {}));
async function day4() {
    let answer1 = 0;
    let answer2 = 0;
    const puzzleInput = puzzleInputPrepare1
        .map((sections) => sections.split(",")
        .flatMap((elfsection) => elfsection.split("-")
        .map((numberString) => Number(numberString))));
    puzzleInput.forEach(elfPair => {
        if ((elfPair[SectionIndex.Elf1Start] <= elfPair[SectionIndex.Elf2Start] && elfPair[SectionIndex.Elf1End] >= elfPair[SectionIndex.Elf2End])
            ||
                (elfPair[SectionIndex.Elf2Start] <= elfPair[SectionIndex.Elf1Start] && elfPair[SectionIndex.Elf2End] >= elfPair[SectionIndex.Elf1End])) {
            answer1 += 1;
        }
    });
    puzzleInput.forEach(elfPair => {
        if ((elfPair[SectionIndex.Elf1Start] >= elfPair[SectionIndex.Elf2Start] && elfPair[SectionIndex.Elf1Start] <= elfPair[SectionIndex.Elf2End])
            ||
                (elfPair[SectionIndex.Elf2Start] >= elfPair[SectionIndex.Elf1Start] && elfPair[SectionIndex.Elf2Start] <= elfPair[SectionIndex.Elf1End])) {
            answer2 += 1;
        }
    });
    console.log(answer1); //595
    console.log(answer2); //952
}
day4();
//# sourceMappingURL=day4.js.map