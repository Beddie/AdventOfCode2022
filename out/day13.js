"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const puzzlePath = "puzzleinput/day13.txt";
const puzzleOutputPath = "puzzleoutput/day13output.txt";
async function day13(part, print) {
    let answer = 0;
    const puzzlePrepare = (0, fs_1.readFileSync)(puzzlePath).toString().split('\n\n');
    const packetStringPairs = puzzlePrepare.map(lines => lines.split('\n'));
    let packetPairs = [];
    let findOrdering = true;
    function CompareArrays(leftValue, rigthValue) {
        let isOrdered = undefined;
        let keeplooking = true;
        if (leftValue === undefined || rigthValue === undefined) {
            isOrdered = leftValue === undefined;
            return isOrdered;
        }
        while (keeplooking) {
            let left = leftValue.shift();
            let right = rigthValue.shift();
            if (Array.isArray(left) && Number.isInteger(right)) {
                right = [right];
            }
            if (Array.isArray(right) && Number.isInteger(left)) {
                left = [left];
            }
            if (Array.isArray(left) && Array.isArray(right)) {
                isOrdered = CompareArrays(left, right);
            }
            if (Number.isInteger(left) && Number.isInteger(right)) {
                if (left != right) {
                    isOrdered = left < right;
                    return isOrdered;
                }
            }
            if (left == undefined && right != undefined) {
                isOrdered = true;
            }
            else if (left != undefined && right == undefined) {
                isOrdered = false;
            }
            if (left == undefined && right == undefined) {
                keeplooking = false;
            }
            else {
                keeplooking = isOrdered == undefined;
            }
        }
        return isOrdered;
    }
    let tyrr = packetStringPairs.forEach((x, i) => {
        let leftSide = x[0];
        let rightSide = x[1];
        let leftArray = JSON.parse(leftSide);
        let rightArray = JSON.parse(rightSide);
        let leuk = `${leftArray} vs ${rightArray} = `;
        let isOrdered = CompareArrays(leftArray, rightArray);
        answer += isOrdered ? (i + 1) : 0;
        console.log(`${leuk} = ${isOrdered} `);
    });
    //findOrdering = true;
    return answer;
}
Promise.all([day13(1, true)]).then((answer) => console.log(answer.join(', ')));
//answer1 
//answer2 
//# sourceMappingURL=day13.js.map