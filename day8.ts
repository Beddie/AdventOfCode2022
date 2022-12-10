import { readFileSync } from "fs";
const puzzlePath = "puzzleinput/day8.txt";

enum Vector {
    leftOrDown = -1,
    rightOrUp = 1
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
    return vector == Vector.leftOrDown ? _self : _self.reverse()
};

async function day8(part:number) {
    let answer = 0
    const trees = readFileSync(puzzlePath).toString().split('\n').reverse().map((y, yindex) => y.split('').map((x,xindex) => new Tree(xindex, yindex, x)));
    const width = trees[0].length
    const height = trees[0].length

    function visibleHorizontal(trees: Tree[][], tree: Tree, vector: Vector ): boolean {
        if (!tree.visible){ 
            let sliceXfrom = vector  == Vector.leftOrDown ? 0 : tree.x + 1
            let sliceXto = vector  == Vector.leftOrDown ? tree.x  : trees[0].length 
            if (vector == Vector.leftOrDown && sliceXfrom == sliceXto) return true 
            if (vector == Vector.rightOrUp && sliceXfrom == sliceXto) return true 

            let allTrees = trees[tree.y].slice(sliceXfrom, sliceXto).reverseMe(vector)
            return allTrees.every((n) => n.height < tree.height);
        }
        return tree.visible
    }

    function visibleVertical(trees: Tree[][], tree: Tree, vector: Vector ): boolean {
        if (!tree.visible){ 
            let sliceYfrom = vector  == Vector.leftOrDown ? tree.y : 0
            let sliceYto = vector  == Vector.leftOrDown ? 0 : trees.length;
            if (vector == Vector.leftOrDown && sliceYfrom == sliceYto) return true; 
            if (vector == Vector.rightOrUp && sliceYfrom == sliceYto) return true;

            let allTrees = [...Array(trees.length).keys() ].filter(i => vector == Vector.leftOrDown ? tree.y > i : tree.y < i).map((t) => trees[t][tree.x]).reverseMe(vector)

            //let allTrees = Array.from((x) => )
            //trees.reduce((traas,traa,y) => traas.push(traa[tree.x]))
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
            tree.visible = visibleHorizontal(trees, tree, Vector.leftOrDown)
            tree.visible = visibleHorizontal(trees, tree, Vector.rightOrUp)
            tree.visible = visibleVertical(trees, tree, Vector.leftOrDown)
            tree.visible = visibleVertical(trees, tree, Vector.rightOrUp)
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

        answer = trees.reduce((treeRows, treeRow) => {
            let treesHorizontal =  treeRow.reduce((trees,tree) => trees += (tree.visible ? 1 : 0),0);
            treeRows += treesHorizontal
             //console.log();
            //console.log(`${treesHorizontal}`);
            return treeRows;
            }
        ,0)

    return answer
}

Promise.all([day8(1)]).then((answer) => console.log(answer.join(', ')))

//answer1 1693
//answer2