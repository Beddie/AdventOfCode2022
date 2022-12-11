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
    const headMovements = []
    const tailMovements = []
    let head = [0,0];
    let tail = [0,0];
    
    let vector: Vector
    motions.forEach((motion) => 
        {
            const vector = motion.direction == Direction.up || motion.direction == Direction.right ? Vector.rightOrUp : Vector.leftOrDown;
            
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
                headMovements.push(newPosition);
                let distanceX = (head[0] < 0 ? head[0] * -1 : head[0]) - (tail[0] < 0 ? tail[0] * -1 : tail[0]);
                distanceX = distanceX < 0 ? distanceX * -1 : distanceX
                
                let distanceY = (head[1] < 0 ? head[1] * -1 : head[1]) - (tail[1] < 0 ? tail[1] * -1 : tail[1]);
                distanceY = distanceY < 0 ? distanceY * -1 : distanceY
                let diagonal1place = distanceX == 1 && distanceY == 1
                if (!diagonal1place && distanceX + distanceY > 1) {
                    let tailx = headMovements[headMovements.length - 2][0]
                    let taily = headMovements[headMovements.length - 2][1]
                    tail[0] = tailx
                    tail[1] = taily
                    if (!tailMovements.find((tailxy) => tailxy[0] == tailx && tailxy[1] == taily)) {
                        tailMovements.push([tailx,taily])
                    }
                } 
                
                drawGrid(head, tail, tailMovements)
                
                
            }
            //y = motion.direction == Direction.up ?? 
            //if head moves 2 positions from tail then tail moves to previous position from head
        }
    )
    return answer
}

Promise.all([day9(1, true),day9(2, true)]).then((answer) => console.log(answer.join(', ')))


function drawGrid(head: number[], tail: number[], tailMovements: any[]) {
    let size = 8
    let grid = ""
    for (let y = size; y > -size; y--) {
        
        for (let x = -size; x < size; x++) {
            let tailSpot = tailMovements.find(tailxy=> tailxy[0] == x && tailxy[1] == y)
            if (x == head[0] && y == head[1]){
                grid += tailSpot ? "h" : "H"
            }
            else if (x == tail[0] && y == tail[1]){
                grid += tailSpot ? "t" : "T"
            }
            else if (tailSpot) {
                grid += "*"
            }
            else {
                grid += "."
            }
        }
        grid += "\n"
    }
    console.log(grid);
    let breakje = head[0] == 1 && head[1] == 4    
    //console.log(`${motion.value} to ${Direction[motion.direction].toString()} \t:${head[0]}-${head[1]}/${index}`)
}
//answer1 
//answer2 