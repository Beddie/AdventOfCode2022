import { fstat, readFileSync, writeFileSync } from "fs";
const puzzlePath = "puzzleinput/day14.txt";
const puzzleOutputPath = "puzzleoutput/day14output.txt";

async function day14(part: number, print: boolean) {
  let answer = 0;
  const puzzlePrepare = readFileSync(puzzlePath).toString().split('\n\n')
  const packetStringPairs = puzzlePrepare.map(lines => lines.split('\n'))

  return answer
}

Promise.all([day14(1, true)]).then((answer) => console.log(answer.join(', ')))

//answer1 
//answer2 