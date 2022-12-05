import { readFileSync } from "fs";
const puzzlePath = "puzzleinput/day5.txt";
const puzzleString: string = readFileSync(puzzlePath).toString();
const puzzleInputStacks: string[] = puzzleString.substring(0, puzzleString.indexOf('move')).split("\n");
const puzzleInputProcedure: string[] = puzzleString.substring(puzzleString.indexOf('move')).split("\n");

async function day5() {
    let answer1 : number = 0;
    let answer2 : number = 0;

    let line = "";
    while (line == ""){
        line = puzzleInputStacks.pop().trim()
    }

    //let numbersOfStacks = line.split(/\s+/).length
    const stackGrid : string[][] = []
    puzzleInputStacks.reverse()
    
    let stackLine = puzzleInputStacks.pop();
    let rowNumber = 0;
    
    while (stackLine && stackLine != ""){
        stackLine += " "
        let linestak : string[] = []
        let lineStacks = Array.from(stackLine).reduce((total, x, i) => 
        {
            total += x
            if ((i+1) % 4 == 0){
                linestak[linestak.length] = total.trim().replace("[","").replace("]","")
                total = ""
            }
        return total;
        })
        
        stackGrid[rowNumber] = linestak
        rowNumber++;
        stackLine = puzzleInputStacks.pop();

        console.log(stackGrid.toString());
    }

}

day5();