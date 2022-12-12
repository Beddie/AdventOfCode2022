"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const puzzlePath = "puzzleinput/day10.txt";
const puzzleOutputPath = "puzzleinput/day10output.txt";
var Instruction;
(function (Instruction) {
    Instruction[Instruction["noop"] = 1] = "noop";
    Instruction[Instruction["addx"] = 2] = "addx";
})(Instruction || (Instruction = {}));
async function day10(part, print) {
    let answer = 0;
    let X = 1;
    const puzzlePrepare = (0, fs_1.readFileSync)(puzzlePath).toString().split('\n');
    const puzzleInput = puzzlePrepare.map((line) => [line.split(' ')[0] == "noop" ? Instruction.noop : Instruction.addx, parseInt(line.split(' ')[1])]);
    let cycles = 0;
    let line = "";
    let lines = "";
    puzzleInput.forEach((instruction) => {
        let numberOfcycles = instruction[0];
        let value = instruction[1];
        for (let index = 0; index < numberOfcycles; index++) {
            cycles += 1;
            let lineLength = line.length;
            let spritePositions = [X - 1, X, X + 1];
            let isSprite = spritePositions.includes(lineLength);
            line += isSprite ? "#" : ".";
            let brake = part == 1 ? cycles % 20 == 0 && cycles % 40 != 0 : cycles % 40 == 0;
            if (brake) {
                if (part == 1) {
                    let signalStrength = X * cycles;
                    answer += signalStrength;
                }
                line += "\n";
                lines += line;
                line = "";
            }
        }
        if (instruction[0] == Instruction.addx) {
            X += value;
        }
    });
    part == 2 ? (0, fs_1.writeFileSync)(puzzleOutputPath, lines) : null;
    return answer;
}
Promise.all([day10(1, true), day10(2, true)]).then((answer) => console.log(answer.join(', ')));
//answer1 14160
//answer2  RJERPEFC
// ###....##.####.###..###..####.####..##..
// #..#....#.#....#..#.#..#.#....#....#..#.
// #..#....#.###..#..#.#..#.###..###..#....
// ###.....#.#....###..###..#....#....#....
// #.#..#..#.#....#.#..#....#....#....#..#.
// #..#..##..####.#..#.#....####.#.....##..
//# sourceMappingURL=day10.js.map