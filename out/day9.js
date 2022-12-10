"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const puzzlePath = "puzzleinput/day9.txt";
var Direction;
(function (Direction) {
    Direction[Direction["left"] = -1] = "left";
    Direction[Direction["right"] = 1] = "right";
    Direction[Direction["up"] = 2] = "up";
    Direction[Direction["down"] = -2] = "down";
})(Direction || (Direction = {}));
var Vector;
(function (Vector) {
    Vector[Vector["leftOrDown"] = -1] = "leftOrDown";
    Vector[Vector["rightOrUp"] = 1] = "rightOrUp";
})(Vector || (Vector = {}));
class Motion {
    constructor(direction, val) {
        switch (direction) {
            case 'U':
                this.direction = Direction.up;
                break;
            case 'D':
                this.direction = Direction.up;
                break;
            case 'L':
                this.direction = Direction.left;
                break;
            case 'R':
                this.direction = Direction.right;
                break;
            default:
                break;
        }
        this.value = parseInt(val);
    }
    direction;
    value;
}
async function day9(part, print) {
    let answer = 0;
    const puzzleInput = (0, fs_1.readFileSync)(puzzlePath).toString().split('\n');
    const motions = puzzleInput.map(u => u.split(' ')).map((x, xindex) => new Motion(x[0], x[1]));
    let Hx = 0;
    let Hy = 0;
    let Tx = 0;
    let Ty = 0;
    let vector;
    motions.forEach((motion) => {
        const vector = motion.direction == Direction.up || motion.direction == Direction.right ? Vector.rightOrUp : Vector.leftOrDown;
        for (let index = 0; vector == Vector.leftOrDown ? index > (motion.value * vector) : index < (motion.value * vector); index += vector) {
            switch (motion.direction) {
                case Direction.up:
                case Direction.down:
                    Hy += vector;
                    break;
                case Direction.right:
                case Direction.left:
                    Hx += vector;
                    break;
                default:
                    break;
            }
            console.log(`${motion.value} to ${Direction[motion.direction].toString()} \t:${Hx}-${Hy}/${index}`);
        }
        //y = motion.direction == Direction.up ?? 
        //if head moves 2 positions from tail then tail moves to previous position from head
    });
    return answer;
}
Promise.all([day9(1, true), day9(2, true)]).then((answer) => console.log(answer.join(', ')));
//answer1 
//answer2 
//# sourceMappingURL=day9.js.map