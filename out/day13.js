"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const puzzlePath = "puzzleinput/day13.txt";
const puzzleOutputPath = "puzzleoutput/day13output.txt";
async function day13(part, print) {
    let answer = 0;
    const puzzlePrepare = (0, fs_1.readFileSync)(puzzlePath).toString().split('\n\n');
    const packetStringPairs = puzzlePrepare.map(lines => lines.split('\n'));
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
    if (part == 1) {
        let tyrr = packetStringPairs.forEach((x, i) => {
            let leftSide = x[0];
            let rightSide = x[1];
            let leftArray = JSON.parse(leftSide);
            let rightArray = JSON.parse(rightSide);
            let leuk = `${leftArray} vs ${rightArray} = `;
            let isOrdered = CompareArrays(leftArray, rightArray);
            answer += isOrdered ? (i + 1) : 0;
            if (print) {
                console.log(`${leuk} = ${isOrdered} `);
            }
        });
    }
    else {
        let ordering = true;
        packetStringPairs.push(["[[2]]", "[[6]]"]);
        let listOfSignals = packetStringPairs.flatMap(x => x);
        let runlength = ((listOfSignals.length - 1) % 2 == 0) ? ((listOfSignals.length - 1)) : (listOfSignals.length);
        while (ordering) {
            let haschange = false;
            for (let index = 0; index < runlength; index = index + 2) {
                let leftSide = listOfSignals[index];
                let rightSide = listOfSignals[index + 1];
                if (leftSide && rightSide) {
                    let leftArray = JSON.parse(leftSide);
                    let rightArray = JSON.parse(rightSide);
                    let isOrdered = CompareArrays(leftArray, rightArray);
                    if (!isOrdered) {
                        let temp = listOfSignals[index];
                        listOfSignals[index] = listOfSignals[index + 1];
                        listOfSignals[index + 1] = temp;
                        haschange = true;
                    }
                }
            }
            for (let index = 1; index < runlength; index = index + 2) {
                let leftSide = listOfSignals[index];
                let rightSide = listOfSignals[index + 1];
                if (leftSide && rightSide) {
                    let leftArray = JSON.parse(leftSide);
                    let rightArray = JSON.parse(rightSide);
                    let isOrdered = CompareArrays(leftArray, rightArray);
                    if (!isOrdered) {
                        let temp = listOfSignals[index];
                        listOfSignals[index] = listOfSignals[index + 1];
                        listOfSignals[index + 1] = temp;
                        haschange = true;
                    }
                }
            }
            ordering = haschange;
        }
        let indexOf2 = listOfSignals.indexOf('[[2]]', 0) + 1;
        let indexOf6 = listOfSignals.indexOf('[[6]]', 0) + 1;
        answer = indexOf2 * indexOf6;
        if (print) {
            let list = listOfSignals.join('\n');
            console.log(list);
        }
    }
    return answer;
}
Promise.all([day13(1, false), day13(2, false)]).then((answer) => console.log(answer.join(', ')));
//answer1 6369
//answer2 25800
//# sourceMappingURL=day13.js.map