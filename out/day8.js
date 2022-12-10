"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const puzzlePath = "puzzleinput/day8.txt";
var Vector;
(function (Vector) {
    Vector[Vector["leftOrDown"] = -1] = "leftOrDown";
    Vector[Vector["rightOrUp"] = 1] = "rightOrUp";
})(Vector || (Vector = {}));
class Tree {
    constructor(x, y, val) {
        this.x = x;
        this.y = y;
        this.height = parseInt(val);
    }
    x;
    y;
    visible;
    height;
    scenicViewNumber;
}
Array.prototype.reverseMe = function (vector, part) {
    var _self = this;
    return part == 1 ? vector == Vector.leftOrDown ? _self : _self.reverse() : vector == Vector.rightOrUp ? _self : _self.reverse();
};
async function day8(part, print) {
    let answer = 0;
    const trees = (0, fs_1.readFileSync)(puzzlePath).toString().split('\n').reverse().map((y, yindex) => y.split('').map((x, xindex) => new Tree(xindex, yindex, x)));
    function visibleHorizontal(trees, tree, vector) {
        if (!tree.visible) {
            const sliceXfrom = vector == Vector.leftOrDown ? 0 : tree.x + 1;
            const sliceXto = vector == Vector.leftOrDown ? tree.x : trees[0].length;
            if (sliceXfrom == sliceXto)
                return true;
            const allTrees = trees[tree.y].slice(sliceXfrom, sliceXto).reverseMe(vector, 1);
            return allTrees.every((n) => n.height < tree.height);
        }
        return tree.visible;
    }
    function visibleVertical(trees, tree, vector) {
        if (!tree.visible) {
            const sliceYfrom = vector == Vector.leftOrDown ? tree.y : 0;
            const sliceYto = vector == Vector.leftOrDown ? 0 : trees.length;
            if (sliceYfrom == sliceYto)
                return true;
            const allTrees = [...Array(trees.length).keys()].filter(i => vector == Vector.leftOrDown ? tree.y > i : tree.y < i).map((t) => trees[t][tree.x]).reverseMe(vector, 1);
            return allTrees.every((n) => n.height < tree.height);
        }
        return tree.visible;
    }
    function scenicHorizontal(trees, tree, vector) {
        const sliceXfrom = vector == Vector.leftOrDown ? 0 : tree.x + 1;
        const sliceXto = vector == Vector.leftOrDown ? tree.x : trees[0].length;
        if (sliceXfrom == sliceXto)
            return 0;
        const allTrees = trees[tree.y].slice(sliceXfrom, sliceXto).reverseMe(vector, 2);
        let scenicViews = 0;
        let keepLooking = true;
        allTrees.forEach((spottedTree, i) => {
            if (keepLooking)
                if (spottedTree.height < tree.height) {
                    scenicViews += 1;
                }
                else {
                    scenicViews += 1;
                    keepLooking = false;
                    return;
                }
        });
        return scenicViews;
    }
    function scenicVertical(trees, tree, vector) {
        const sliceXfrom = vector == Vector.leftOrDown ? 0 : tree.x + 1;
        const sliceXto = vector == Vector.leftOrDown ? tree.x : trees[0].length;
        if (sliceXfrom == sliceXto)
            return 0;
        const allTrees = [...Array(trees.length).keys()].filter(i => vector == Vector.leftOrDown ? tree.y > i : tree.y < i).map((t) => trees[t][tree.x]).reverseMe(vector, 2);
        let scenicViews = 0;
        let keepLooking = true;
        allTrees.forEach((spottedTree, i) => {
            if (keepLooking)
                if (spottedTree.height < tree.height) {
                    scenicViews += 1;
                }
                else {
                    scenicViews += 1;
                    keepLooking = false;
                    return;
                }
        });
        return scenicViews;
    }
    if (part == 1) {
        for (let y = 0; y < trees.length; y++) {
            for (let x = 0; x < trees[y].length; x++) {
                const tree = trees[y][x];
                if (tree.visible) {
                    return;
                }
                tree.visible = visibleHorizontal(trees, tree, Vector.leftOrDown);
                tree.visible = visibleHorizontal(trees, tree, Vector.rightOrUp);
                tree.visible = visibleVertical(trees, tree, Vector.leftOrDown);
                tree.visible = visibleVertical(trees, tree, Vector.rightOrUp);
            }
        }
    }
    else {
        let highestNumber = 0;
        for (let y = 0; y < trees.length; y++) {
            for (let x = 0; x < trees[y].length; x++) {
                const tree = trees[y][x];
                let scenicViewNumber = scenicHorizontal(trees, tree, Vector.leftOrDown);
                scenicViewNumber *= scenicHorizontal(trees, tree, Vector.rightOrUp);
                scenicViewNumber *= scenicVertical(trees, tree, Vector.leftOrDown);
                scenicViewNumber *= scenicVertical(trees, tree, Vector.rightOrUp);
                tree.scenicViewNumber = scenicViewNumber;
                highestNumber = scenicViewNumber > highestNumber ? scenicViewNumber : highestNumber;
            }
        }
        answer = highestNumber;
    }
    trees.reverse();
    if (print) {
        trees.reduce((treeRows, treeRow) => {
            let treesHorizontal = treeRow.reduce((trees, tree) => trees += tree.height, '');
            treeRows += treesHorizontal;
            console.log(`${treesHorizontal}`);
            return treeRows;
        }, '');
        console.log('');
    }
    if (part == 1) {
        if (print) {
            trees.reduce((treeRows, treeRow) => {
                let treesHorizontal = treeRow.reduce((trees, tree) => trees += (tree.visible ? 1 : 0), '');
                treeRows += treesHorizontal;
                console.log(`${treesHorizontal}`);
                return treeRows;
            }, '');
            trees.reduce((treeRows, treeRow) => {
                let treesHorizontal = treeRow.reduce((trees, tree) => trees += `${tree.x}-${tree.y}[${tree.height}]=${tree.visible ? "*" : " "}-`, '');
                treeRows += treesHorizontal;
                console.log(`${treesHorizontal}`);
                return treeRows;
            }, '');
        }
        answer = trees.reduce((treeRows, treeRow) => {
            let treesHorizontal = treeRow.reduce((trees, tree) => trees += (tree.visible ? 1 : 0), 0);
            treeRows += treesHorizontal;
            return treeRows;
        }, 0);
    }
    else {
        print ?? trees.reduce((treeRows, treeRow) => {
            let treesHorizontal = treeRow.reduce((trees, tree) => trees += `${tree.x}-${tree.y}[${tree.height}]=${tree.scenicViewNumber}/`, '');
            treeRows += treesHorizontal;
            console.log(`${treesHorizontal}`);
            return treeRows;
        }, '');
    }
    return answer;
}
Promise.all([day8(1, true), day8(2, true)]).then((answer) => console.log(answer.join(', ')));
//answer1 1693
//answer2 422059
//# sourceMappingURL=day8.js.map