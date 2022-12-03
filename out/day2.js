"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const puzzlePath = "puzzleinput/day2.txt";
const puzzleString = (0, fs_1.readFileSync)(puzzlePath).toString();
const puzzleInputPrepare1 = puzzleString.split("\n");
var Hand;
(function (Hand) {
    Hand[Hand["Rock"] = 1] = "Rock";
    Hand[Hand["Paper"] = 2] = "Paper";
    Hand[Hand["Sciccors"] = 3] = "Sciccors";
})(Hand || (Hand = {}));
var Result;
(function (Result) {
    Result[Result["Lose"] = 0] = "Lose";
    Result[Result["Draw"] = 3] = "Draw";
    Result[Result["Win"] = 6] = "Win";
})(Result || (Result = {}));
class Match {
    constructor(puzzleArray) {
        this.elf = this.getHand(puzzleArray[0]);
        this.bes = this.getHand(puzzleArray[1]);
        this.score = this.bes + this.getResult(this.bes, this.elf);
        //partB
        const goal = this.getGoal(puzzleArray[1]);
        this.goalScore = goal + this.getGoalHand(goal, this.elf);
    }
    elf;
    bes;
    score;
    goalScore;
    matchScore() { return this.score; }
    ;
    matchGoalScore() { return this.goalScore; }
    ;
    getHand(char) {
        switch (char) {
            case 'X':
            case 'A':
                return Hand.Rock;
            case 'B':
            case 'Y':
                return Hand.Paper;
            case 'C':
            case 'Z':
                return Hand.Sciccors;
        }
    }
    getGoal(char) {
        switch (char) {
            case 'X':
                return Result.Lose;
            case 'Y':
                return Result.Draw;
            case 'Z':
                return Result.Win;
        }
    }
    getResult(home, out) {
        if (home === out) {
            return Result.Draw;
        }
        else if ((home === Hand.Rock && out === Hand.Paper)
            || (home === Hand.Paper && out === Hand.Sciccors)
            || (home === Hand.Sciccors && out === Hand.Rock)) {
            return Result.Lose;
        }
        return Result.Win;
    }
    getGoalHand(goal, out) {
        if (goal === Result.Draw) {
            return out;
        }
        else if (goal === Result.Lose) {
            switch (out) {
                case Hand.Rock:
                    return Hand.Sciccors;
                case Hand.Paper:
                    return Hand.Rock;
                case Hand.Sciccors:
                    return Hand.Paper;
            }
        }
        else if (goal === Result.Win) {
            switch (out) {
                case Hand.Rock:
                    return Hand.Paper;
                case Hand.Paper:
                    return Hand.Sciccors;
                case Hand.Sciccors:
                    return Hand.Rock;
            }
        }
    }
}
const puzzleInput = puzzleInputPrepare1.map((lines) => new Match(lines.split(" ")));
const answer1 = puzzleInput.reduce((sum, match) => sum + match.matchScore(), 0);
console.log(answer1);
const answer2 = puzzleInput.reduce((sum, match) => sum + match.matchGoalScore(), 0);
console.log(answer2);
//# sourceMappingURL=day2.js.map