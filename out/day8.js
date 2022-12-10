"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const puzzlePath = "puzzleinput/day8.txt";
var Vector;
(function (Vector) {
    Vector[Vector["fromLeft"] = -1] = "fromLeft";
    Vector[Vector["fromRight"] = 1] = "fromRight";
})(Vector || (Vector = {}));
class Tree {
    constructor(xx, yy, val) {
        this.x = xx;
        this.y = yy;
        this.height = parseInt(val);
    }
    x;
    y;
    visible;
    height;
}
Array.prototype.reverseMe = function (vector) {
    var _self = this;
    //console.log('p',_self)
    return vector == Vector.fromLeft ? _self : _self.reverse();
};
async function day8(part) {
    const answer = "";
    const trees = (0, fs_1.readFileSync)(puzzlePath).toString().split('\n').reverse().map((y, yindex) => y.split('').map((x, xindex) => new Tree(xindex, yindex, x)));
    const width = trees[0].length;
    const height = trees[0].length;
    //let visibleFromLeft =(xx,yy): boolean => { return !trees[yy][xx-1] || trees[yy][xx] > trees[yy][xx-1]  }
    //let visibleFromRight = (xx,yy): boolean => { return  !trees[yy][xx+1]  || trees[yy][xx] > trees[yy][xx+1] }
    //let visibleFromUp = (xx,yy): boolean => { return !trees[yy-1] || trees[yy][xx] > trees[yy-1][xx]  }
    //let visibleFromDown = (xx,yy): boolean => { return !trees[yy+1]  || trees[yy][xx] > trees[yy+1][xx] }
    function visibleHorizontal(trees, tree, vector) {
        if (!tree.visible) {
            let sliceXfrom = vector == Vector.fromLeft ? 0 : tree.x + 1;
            let sliceXto = vector == Vector.fromLeft ? tree.x : trees[0].length;
            if (vector == Vector.fromLeft && sliceXfrom == sliceXto)
                return true;
            if (vector == Vector.fromRight && sliceXfrom == sliceXto)
                return true;
            //if (tree.x == 0 || tree.x == trees[0].length - 1) return true
            let allTrees = trees[tree.y].slice(sliceXfrom, sliceXto).reverseMe(vector);
            return allTrees.every((n) => n.height < tree.height);
        }
        return tree.visible;
    }
    for (let y = 0; y < trees.length; y++) {
        for (let x = 0; x < trees[y].length; x++) {
            const tree = trees[y][x];
            if (tree.visible) {
                return;
            }
            let brake = x == 3 && y == 1;
            tree.visible = visibleHorizontal(trees, tree, Vector.fromLeft);
            tree.visible = visibleHorizontal(trees, tree, Vector.fromRight);
        }
    }
    // for (let y = 0; y < trees.length; y++) {
    //     for (let x = 0; x < trees[y].length; x++) {
    //         const tree = trees[y][x];
    //         if (tree.visible) {
    //             return
    //         }
    //         tree.visible = !tree.visible ? trees[y].slice(0,x).every((n) => n.height < tree.height): tree.visible
    //         //console.log(`${x}-${y}=${tree.height} left=${tree.visible}`);
    //         }
    //     }
    trees.reverse();
    trees.reduce((treeRows, treeRow) => {
        let treesHorizontal = treeRow.reduce((trees, tree) => trees += tree.height, '');
        treeRows += treesHorizontal;
        console.log(`${treesHorizontal}`);
        return treeRows;
    }, '');
    console.log('');
    trees.reduce((treeRows, treeRow) => {
        let treesHorizontal = treeRow.reduce((trees, tree) => trees += (tree.visible ? 1 : 0), '');
        treeRows += treesHorizontal;
        console.log(`${treesHorizontal}`);
        return treeRows;
    }, '');
    trees.reduce((treeRows, treeRow) => {
        let treesHorizontal = treeRow.reduce((trees, tree) => trees += `${tree.x}-${tree.y}[${tree.height}]=${tree.visible ? "*" : " "}-`, '');
        treeRows += treesHorizontal;
        //console.log();
        console.log(`${treesHorizontal}`);
        return treeRows;
    }, '');
    console.log('');
    return ``;
}
Promise.all([day8(1)]).then((answer) => console.log(answer.join(', ')));
//answer1 2104783
//answer2 5883165
//# sourceMappingURL=day8.js.map