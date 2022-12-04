import { readFileSync } from "fs";
const puzzlePath = "puzzleinput/day4.txt";
const puzzleString: string = readFileSync(puzzlePath).toString();
const puzzleInputPrepare1: string[] = puzzleString.split("\n");

enum SectionIndex {
    Elf1Start = 0
    ,Elf1End = 1
    ,Elf2Start = 2
    ,Elf2End = 3
}

async function day4() {
    let answer1 : number = 0;
    let answer2 : number = 0;
    const puzzleInput: Number[][] = puzzleInputPrepare1
                                        .map((sections) => sections.split(",")
                                        .flatMap((elfsection)=> elfsection.split("-")
                                                                    .map((numberString)=>  Number(numberString))));    
    
    puzzleInput.forEach(elfPair => {
        if (
                (elfPair[SectionIndex.Elf1Start] <= elfPair[SectionIndex.Elf2Start] && elfPair[SectionIndex.Elf1End] >= elfPair[SectionIndex.Elf2End])
                ||
                (elfPair[SectionIndex.Elf2Start] <= elfPair[SectionIndex.Elf1Start] && elfPair[SectionIndex.Elf2End] >= elfPair[SectionIndex.Elf1End])
            ) { 
                answer1 += 1; 
            } 
    });

    puzzleInput.forEach(elfPair => {
        if  (
                (elfPair[SectionIndex.Elf1Start] >= elfPair[SectionIndex.Elf2Start] && elfPair[SectionIndex.Elf1Start] <= elfPair[SectionIndex.Elf2End])
                ||
                (elfPair[SectionIndex.Elf2Start] >= elfPair[SectionIndex.Elf1Start] && elfPair[SectionIndex.Elf2Start] <= elfPair[SectionIndex.Elf1End])
            ) { 
                answer2 += 1; 
            }
    });

    console.log(answer1); //595
    console.log(answer2); //952
}

day4();