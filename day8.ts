import { readFileSync } from "fs";
const puzzlePath = "puzzleinput/day8.txt";

enum Vector {
    fromLeft = -1,
    fromRight = 1
}

class Tree {
    constructor(xx,yy, val) {
        this.x = xx
        this.y = yy
        this.height = parseInt(val)
    }
        x: number;
        y: number;
        public visible?: boolean;
        public height: number;
}
declare global {
interface Array<T> {
    reverseMe(vector: Vector): Array<T>;
  }
}

Array.prototype.reverseMe = function (vector: Vector) {
    var _self = this as Array<Tree>;
    return vector == Vector.fromLeft ? _self : _self.reverse()
  };

async function day8(part:number) {
    const answer = ""
    const trees = readFileSync(puzzlePath).toString().split('\n').reverse().map((y, yindex) => y.split('').map((x,xindex) => new Tree(xindex, yindex, x)));
    const width = trees[0].length
    const height = trees[0].length

    function visibleHorizontal(trees: Tree[][], tree: Tree, vector: Vector ): boolean {
        if (!tree.visible){ 
            let sliceXfrom = vector  == Vector.fromLeft ? 0 : tree.x + 1
            let sliceXto = vector  == Vector.fromLeft ? tree.x  : trees[0].length 
            if (vector == Vector.fromLeft && sliceXfrom == sliceXto) return true 
            if (vector == Vector.fromRight && sliceXfrom == sliceXto) return true 

            let allTrees = trees[tree.y].slice(sliceXfrom, sliceXto).reverseMe(vector)
            return allTrees.every((n) => n.height < tree.height);
        }
        return tree.visible
    }

    for (let y = 0; y < trees.length; y++) {
        for (let x = 0; x < trees[y].length; x++) {
            const tree = trees[y][x];
            if (tree.visible) {
                return
            }
            let brake = x == 3 && y == 1
            tree.visible = visibleHorizontal(trees, tree, Vector.fromLeft)
            tree.visible = visibleHorizontal(trees, tree, Vector.fromRight)
            }
            
        }

        trees.reverse()
        trees.reduce((treeRows, treeRow) => {
            let treesHorizontal =  treeRow.reduce((trees,tree) => trees += tree.height,'');
            treeRows += treesHorizontal
            console.log(`${treesHorizontal}`);
            return treeRows;
            }
        ,'')

        console.log('')

        trees.reduce((treeRows, treeRow) => {
            let treesHorizontal =  treeRow.reduce((trees,tree) => trees += (tree.visible ? 1 : 0),'');
            treeRows += treesHorizontal
            console.log(`${treesHorizontal}`);
            return treeRows;
            }
        ,'')

        trees.reduce((treeRows, treeRow) => {
            let treesHorizontal =  treeRow.reduce((trees,tree) => trees += `${tree.x}-${tree.y}[${tree.height}]=${tree.visible ? "*" : " "}-`,'');
            treeRows += treesHorizontal
             //console.log();
            console.log(`${treesHorizontal}`);
            return treeRows;
            }
        ,'')

        console.log('')
    return ``
}

Promise.all([day8(1)]).then((answer) => console.log(answer.join(', ')))

//answer1 
//answer2