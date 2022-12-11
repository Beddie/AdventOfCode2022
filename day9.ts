import { readFileSync } from "fs";
const puzzlePath = "puzzleinput/day9.txt";

enum Direction {
    left = -1,
    right = 1,
    up = 2,
    down = -2
}

enum Vector {
    leftOrDown = -1,
    rightOrUp = 1
}

class Motion {
    constructor(direction, val) {
        switch (direction) {
            case 'U':
                this.direction = Direction.up
                break;
            case 'D':
                this.direction = Direction.down
                break;
            case 'L':
                this.direction = Direction.left
                break;
            case 'R':
                this.direction = Direction.right
                break;
            default:
                break;

        }
        this.value = parseInt(val)
    }    
    public direction: Direction;
    public value: number;
}

async function day9(part:number, print: boolean) {
    let answer = 0
    const puzzleInput = readFileSync(puzzlePath).toString().split('\n')
    const motions = puzzleInput.map(u => u.split(' ')).map((x,xindex) => new Motion(x[0],x[1]));
    const knotMovements = []
    const knots = []
    let partIndex = part == 1 ? 1 : 9;
    for (let index = 0; index < (part == 1 ? partIndex + 1 : partIndex + 1); index++) {
        knots.push([0,0])
        knotMovements.push([[0,0]]);
    }
    
    motions.forEach((motion) => 
        {
            const vector = motion.direction == Direction.up || motion.direction == Direction.right ? Vector.rightOrUp : Vector.leftOrDown;
            let head = knots[0];
            for (let index = 0; vector == Vector.leftOrDown ? index > (motion.value * vector): index < (motion.value * vector); index+= vector) {
                switch (motion.direction) {
                    case Direction.up:
                    case Direction.down:
                        head[1] += vector;
                        break;
                    case Direction.right:
                    case Direction.left:
                        head[0] += vector;
                        break;
                    default:
                        break;
                    }
                let newPosition = [head[0], head[1]];
                knotMovements[0].push(newPosition);
                for (let i = 1; i < knots.length; i++) {
                    
                    let distanceX = Math.abs(knots[i-1][0] - knots[i][0]);
                    let distanceY = Math.abs(knots[i-1][1] - knots[i][1]);
                    
                    let istouching = distanceX <= 1 && distanceY <= 1;
                    if (!istouching) {
                        //straight
                        if (distanceX == 2 && distanceY == 0){
                            knots[i][0] += (knots[i-1][0] - knots[i][0]) / 2
                        }
                        else if (distanceY == 2 && distanceX == 0) {
                            knots[i][1] += (knots[i-1][1] - knots[i][1]) / 2
                        }
                        //diagnoal
                        else if (distanceX == 2)
                        {
                            knots[i][0] += (knots[i-1][0] - knots[i][0]) / 2
                            //move y towards head knot
                            knots[i][1] += (knots[i-1][1] - knots[i][1]) > 0 ? 1 : -1
                        }
                        else if (distanceY == 2)
                        {
                            knots[i][1] += (knots[i-1][1] - knots[i][1]) / 2
                            //move x towards head knot
                            knots[i][0] += (knots[i-1][0] - knots[i][0]) > 0 ? 1 : -1
                        }
                        
                       
                        if (!knotMovements[partIndex].find((tailxy) => tailxy[0] == knots[partIndex][0] && tailxy[1] == knots[partIndex][1])) {
                            knotMovements[partIndex].push([knots[partIndex][0],knots[partIndex][1]])
                        }
                    } 
                }
                print ? drawGrid(knots, knotMovements) : null  
            }
        }
    )
    answer = knotMovements[partIndex].length
    print ? drawGrid(knots, knotMovements) : null  
    return answer
}

Promise.all([day9(1,false),day9(2, false)]).then((answer) => console.log(answer.join(', ')))


function drawGrid(knots: any[], tailMovements: any[]) {
    let knotMovements = knots.map((x, i) => [i, x])
    let size = 12
    let grid = ""
    let head = knots[0]
    for (let y = size; y > -size; y--) {
        
        for (let x = -size; x < size; x++) {
            let tailSpot = knotMovements.find(tailxy=> tailxy.find(t => t[0] == x && t[1] == y))
            if (0 == y && 0 == x) {
                grid += tailSpot ? tailSpot[0] : "S"
            }
            else if (x == head[0] && y == head[1]){
                grid += tailSpot ? tailSpot[0] : "H"
            }
            else if (tailSpot && x == tailSpot[1][0] && y == tailSpot[1][1]){
                grid += tailSpot[0]
            }
            else if (tailSpot) {
                grid += "*"
            }
            else if (tailSpot && x == tailSpot[1][0] && y == tailSpot[1][1]){
                grid += tailSpot[0]
            }
            else {
                grid += "."
            }
        }
        grid += "\n"
    }
    console.log(grid);
}
//answer1 5907
//answer2 2303