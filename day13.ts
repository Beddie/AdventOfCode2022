import { fstat, readFileSync, writeFileSync } from "fs";
import { type } from "os";
const puzzlePath = "puzzleinput/day13.txt";
const puzzleOutputPath = "puzzleoutput/day13output.txt";

async function day13(part:number, print: boolean) {
    let answer = 0;
    let endPosition = [];
    let startPositionPart1 = [];
    let startPositions = [];
    
    const puzzlePrepare = readFileSync(puzzlePath).toString().split('\n\n')
    const packetStringPairs = puzzlePrepare.map(lines => lines.split('\n'))
    let packetPairs = []
    let tyrr = packetStringPairs.forEach(x=> 
      { 
        let leftArray = JSON.parse(x[0])
        let rightArray = JSON.parse(x[1])
        let isOrdered = false;
        packetPairs.push([leftArray, rightArray])

        leftArray.forEach((left, leftIndex) => {
          let right = rightArray[leftIndex]

          //convert to array if only one!
          if (Number(left)){
            left = [left]
          }
          if (Number(right)){
            right = [right]
          }

          if (Array.isArray(left) && Array.isArray(right)) {
            //compare arrays
            left.forEach((l,i) => {
              isOrdered = l < right[i] 
            })
          }
          console.log(`${left} vs ${right} = ${isOrdered} `)
        })

        
      })
    return answer
}

Promise.all([day13(1,true)]).then((answer) => console.log(answer.join(', ')))

//answer1 
//answer2 