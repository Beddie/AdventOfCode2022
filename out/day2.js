"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var puzzlePath = "puzzleinput/day2.txt";
var puzzleString = (0, fs_1.readFileSync)(puzzlePath).toString();
var puzzleInputPrepare1 = puzzleString.split("\n");
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
var Match = /** @class */ (function () {
    function Match(puzzleArray) {
        this.elf = this.getHand(puzzleArray[0]);
        this.bes = this.getHand(puzzleArray[1]);
        this.score = this.bes + this.getResult(this.bes, this.elf);
        //partB
        var goal = this.getGoal(puzzleArray[1]);
        this.goalScore = goal + this.getGoalHand(goal, this.elf);
    }
    Match.prototype.matchScore = function () { return this.score; };
    ;
    Match.prototype.matchGoalScore = function () { return this.goalScore; };
    ;
    Match.prototype.getHand = function (char) {
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
    };
    Match.prototype.getGoal = function (char) {
        switch (char) {
            case 'X':
                return Result.Lose;
            case 'Y':
                return Result.Draw;
            case 'Z':
                return Result.Win;
        }
    };
    Match.prototype.getResult = function (home, out) {
        if (home === out) {
            return Result.Draw;
        }
        else if ((home === Hand.Rock && out === Hand.Paper)
            || (home === Hand.Paper && out === Hand.Sciccors)
            || (home === Hand.Sciccors && out === Hand.Rock)) {
            return Result.Lose;
        }
        return Result.Win;
    };
    Match.prototype.getGoalHand = function (goal, out) {
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
    };
    return Match;
}());
var puzzleInput = puzzleInputPrepare1.map(function (lines) { return new Match(lines.split(" ")); });
var answer1 = puzzleInput.reduce(function (sum, match) { return sum + match.matchScore(); }, 0);
console.log(answer1);
var answer2 = puzzleInput.reduce(function (sum, match) { return sum + match.matchGoalScore(); }, 0);
console.log(answer2);
//# sourceMappingURL=day2.js.map