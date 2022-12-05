import { readFileSync } from "fs";
const puzzlePath = "puzzleinput/day5.txt";

enum ProcedureIndex {
     Move = 0
    ,From = 1
    ,To = 2
}

async function day5(part:number) {
    const puzzleString: string = readFileSync(puzzlePath).toString();
    const puzzleInputStacks: string[] = puzzleString.substring(0, puzzleString.indexOf('move')).split("\n");
    const puzzleInputProcedure: string[] = puzzleString.substring(puzzleString.indexOf('move')).split("\n");

    let answer : string = "";

    let line = "";
    while (line == ""){
        line = puzzleInputStacks.pop().trim()
    }

    //initialize grid
    const stackGrid : string[][] = line.split(/\s+/).map((x) => [x])

    //get first line
    let stackLine = puzzleInputStacks.pop();

    //fill stackGrid
    while (stackLine && stackLine != "") {
        stackLine += " ";
        [...stackLine].reduce((crateLine, stackLineLetter, i) => {
            i++
            crateLine += stackLineLetter
            if ((i) % 4 == 0){
                let letter = crateLine.trim().replace("[","").replace("]","")
                letter.length > 0 ? stackGrid[((i)/4) -1].push(letter): null;
                crateLine = ""
            }
            return crateLine;
        })
        stackLine = puzzleInputStacks.pop();
    }
    
    //create procedures
    const procedureLines = puzzleInputProcedure
                            .map((line)=> line.split(" "))
                            .map<number[]>((words)=> [parseInt(words[1]), parseInt(words[3])-1, parseInt(words[5])-1])

    //execute procedures
    procedureLines.forEach((procedure)=> {
        let moveCrates = []
        for (let index = 0; index < procedure[ProcedureIndex.Move]; index++) {
            moveCrates.push(stackGrid[procedure[ProcedureIndex.From]].pop());
        }

        let crates = part == 2 ? moveCrates.reverse() : moveCrates
        stackGrid[procedure[ProcedureIndex.To]].push(...crates)
    })

    answer = stackGrid.map((crateStack) => { return crateStack.pop() }).join('')
    return `answer${part} ${answer}`
}

Promise.all([day5(1),day5(2)]).then((answer) => console.log(answer.join(', ')))

//answer1 JCMHLVGMG
//answer2 LVMRWSSPZ