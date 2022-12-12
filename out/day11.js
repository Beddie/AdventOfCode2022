"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const puzzlePath = "puzzleinput/day11.txt";
const puzzleOutputPath = "puzzleinput/day11output.txt";
// Monkey 0:
// Starting items: 79, 98
// Operation: new = old * 19
// Test: divisible by 23
//   If true: throw to monkey 2
//   If false: throw to monkey 3
class Monkey {
    constructor(puzzleArray) {
        this.key = parseInt(puzzleArray[0].trim().split(' ')[1][0]);
        let itemLine = puzzleArray[1].replaceAll(' ', '').split(':')[1].split(',');
        this.items = itemLine.map((l) => parseInt(l));
        let operationPrepare = puzzleArray[2].trim().split('=')[1];
        //operationPrepare = "(old) => " + operationPrepare
        operationPrepare = "return " + operationPrepare;
        this.operation = new Function("old", operationPrepare);
        this.divisible = parseInt(puzzleArray[3].trim().split(' ').reverse()[0]);
        this.trueThrow = parseInt(puzzleArray[4].trim().split(' ').reverse()[0]);
        this.falseThrow = parseInt(puzzleArray[5].trim().split(' ').reverse()[0]);
    }
    key;
    items;
    operation;
    divisible;
    trueThrow;
    falseThrow;
    countInspection = 0;
}
async function day11(part, print) {
    let answer = 0;
    const puzzlePrepare = (0, fs_1.readFileSync)(puzzlePath).toString().split('\n\n');
    const monkeys = puzzlePrepare.map((line) => new Monkey(line.split('\n')));
    let keepThrowingStuff = true;
    let rounds = 0;
    while (keepThrowingStuff) {
        rounds += 1;
        monkeys.forEach(monkey => {
            while (monkey.items.length > 0) {
                let item = monkey.items.pop();
                monkey.countInspection += 1;
                let worryLevel = monkey.operation(item);
                if (part == 1) {
                    worryLevel = Math.floor(worryLevel / 3);
                }
                if (worryLevel % monkey.divisible == 0) {
                    monkeys[monkey.trueThrow].items.push(worryLevel);
                }
                else {
                    monkeys[monkey.falseThrow].items.push(worryLevel);
                }
            }
        });
        if (part == 1 && rounds == 20) {
            drawGrid(monkeys);
            let twoActiveMockeys = monkeys.sort((x, y) => y.countInspection - x.countInspection).slice(0, 2);
            //let twoActiveMockeys = monkeys.sort().slice(0,2)
            answer = twoActiveMockeys[0].countInspection * twoActiveMockeys[1].countInspection;
            keepThrowingStuff = false;
        }
        else if (print && part == 2 && (rounds == 20 || rounds % 1000 == 0)) {
            drawGrid(monkeys);
        }
        else if (part == 2 && rounds == 10000) {
            //   let twoActiveMockeys = monkeys.sort((x,y)=> y.countInspection - x.countInspection).slice(0,2)
            let twoActiveMockeys = monkeys.sort().slice(0, 2);
            answer = twoActiveMockeys[0].countInspection * twoActiveMockeys[1].countInspection;
            keepThrowingStuff = false;
        }
    }
    return answer;
}
Promise.all([day11(1, true)]).then((answer) => console.log(answer.join(', ')));
function drawGrid(monkeys) {
    monkeys.forEach((monkey) => {
        let line = `Monkey ${monkey.key}: ${monkey.items.join(', ')} counted total= ${monkey.countInspection}`;
        console.log(line);
    });
}
//answer1 56120
//answer2 14463068816 to low
//# sourceMappingURL=day11.js.map