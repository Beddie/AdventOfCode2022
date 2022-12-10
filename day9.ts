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
                this.direction = Direction.up
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
    let Hx = 0;
    let Hy = 0;
    let Tx = 0;
    let Ty = 0;
    let vector: Vector
    motions.forEach((motion) => 
        {
          
            const vector = motion.direction == Direction.up || motion.direction == Direction.right ? Vector.rightOrUp : Vector.leftOrDown;

            for (let index = 0; vector == Vector.leftOrDown ? index > (motion.value * vector): index < (motion.value * vector); index+= vector) {
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

                console.log(`${motion.value} to ${Direction[motion.direction].toString()} \t:${Hx}-${Hy}/${index}`)
                
            }
        
            //y = motion.direction == Direction.up ?? 
            
            //if head moves 2 positions from tail then tail moves to previous position from head
        }
    )

    
    return answer
}

Promise.all([day9(1, true),day9(2, true)]).then((answer) => console.log(answer.join(', ')))

//answer1 
//answer2 