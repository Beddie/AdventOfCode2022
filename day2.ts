import { readFileSync } from "fs";
const puzzlePath = "puzzleinput/day2.txt";
const puzzleString: string = readFileSync(puzzlePath).toString();
const puzzleInputPrepare1: string[] = puzzleString.split("\n");

enum Hand {
    Rock = 1
    ,Paper = 2
    ,Sciccors = 3
}

enum Result {
    Lose = 0
    ,Draw = 3
    ,Win = 6
}

class Match {
    constructor(puzzleArray: string[]) {
        this.elf = this.getHand(puzzleArray[0]);
        this.bes = this.getHand(puzzleArray[1]);
        this.score =  this.bes + this.getResult(this.bes, this.elf);
        
        //partB
        const goal = this.getGoal(puzzleArray[1]);
        this.goalScore =  goal + this.getGoalHand(goal, this.elf);

    }
    private elf: Hand;
    private bes: Hand;
    private score: number; 
    private goalScore: number; 
    
    public matchScore(): number { return this.score};
    public matchGoalScore(): number { return this.goalScore};
    
    private getHand(char): Hand{
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
        
    private getGoal(char): Result{
        switch (char) {
            case 'X':
                return Result.Lose;
            case 'Y':
                return Result.Draw;
            case 'Z':
                return Result.Win;
        }
    }

    private getResult(home:Hand, out:Hand) {
        if (home === out) {
            return Result.Draw;
        }
        else if (
                (home === Hand.Rock && out === Hand.Paper)
            ||  (home === Hand.Paper && out === Hand.Sciccors)
            ||  (home === Hand.Sciccors && out === Hand.Rock)
        ) {
            return Result.Lose;
        }
        return Result.Win;
    }

    private getGoalHand(goal:Result, out:Hand): Hand {
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

const puzzleInput: Match[] = puzzleInputPrepare1.map((lines) => new Match(lines.split(" ")));

const answer1 = puzzleInput.reduce((sum, match) => sum + match.matchScore(), 0);
console.log(answer1);
const answer2 = puzzleInput.reduce((sum, match) => sum + match.matchGoalScore(), 0);
console.log(answer2);