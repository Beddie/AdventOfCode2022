import { fstat, readFileSync, writeFileSync } from "fs";
const puzzlePath = "puzzleinput/day15.txt";
const puzzleOutputPath = "puzzleoutput/day15output.txt";

async function day15(part: number, print: boolean) {
  const puzzlePrepare = readFileSync(puzzlePath).toString().split('\n')
  const rocks = puzzlePrepare.map(lines => lines.replaceAll(' ', '').split('->').map(x => x.split(',').map(y => parseInt(y))))

  return 0
}

Promise.all([day15(1, false)]).then((answer) => console.log(answer.join(', ')))

//answer1 
//answer2 