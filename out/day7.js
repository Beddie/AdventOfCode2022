"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const puzzlePath = "puzzleinput/day7.txt";
class File {
    constructor(name, size) {
        this.name = name.split('.')[0];
        this.type = name.split('.')[1];
        this.size = size;
    }
    name;
    size;
    type;
}
class Directory {
    constructor(name, parentDirectory) {
        this.name = name;
        this.parentDirectory = parentDirectory;
    }
    name;
    directories = [];
    parentDirectory;
    files = [];
    DirSize(totalcount, part) {
        let total = this.directories.length > 0 ? this.directories.reduce((totaldirsize, dir) => {
            {
                let totalSizeOfDir = dir.DirSize(totalcount, part);
                return totaldirsize += totalSizeOfDir;
            }
        }, 0) : 0;
        total += this.files.length > 0 ? this.files.reduce((totalFilessize, files) => {
            totalFilessize += files.size;
            return totalFilessize;
        }, 0) : 0;
        if (part == 1) {
            if (totalcount != null && total <= 100000) {
                totalcount.push(this);
            }
        }
        else if (part == 2) {
            if (totalcount != null) {
                totalcount.push(this);
            }
        }
        return total;
    }
    In(dirName) {
        return this.directories.find((dir) => dir.name == dirName);
    }
    Out() {
        return this.parentDirectory;
    }
    GoToOuterMost() {
        let dir;
        dir = this.parentDirectory;
        if (dir == null) {
            dir = this;
        }
        else {
            let findtopdir = dir;
            while (findtopdir.parentDirectory) {
                findtopdir = findtopdir.parentDirectory;
            }
            dir = findtopdir;
        }
        return dir;
    }
    AddFile(file) {
        this.files.push(file);
    }
    AddDirectory(dir) {
        this.directories.push(dir);
    }
}
async function day7(part) {
    const answer = "";
    const puzzleString = (0, fs_1.readFileSync)(puzzlePath).toString();
    const puzzleInput = puzzleString.split("\n");
    let baseDir = new Directory("base", null);
    let currentDir = baseDir;
    puzzleInput.forEach(line => {
        console.log(line);
        if (line[0] == "$") {
            if (line == "$ ls") {
            }
            else {
                switch (line.slice(-1)) {
                    case "/":
                        currentDir = currentDir.GoToOuterMost();
                        break;
                    case ".":
                        currentDir = currentDir.Out();
                        break;
                    default:
                        currentDir = currentDir.In(line.split(' ')[2]);
                        break;
                }
            }
        }
        else if (line[0] == "d") {
            let newDir = new Directory(line.split(' ')[1], currentDir);
            currentDir.AddDirectory(newDir);
        }
        else {
            let newFile = new File(line.split(' ')[1], parseInt(line.split(' ')[0]));
            currentDir.AddFile(newFile);
        }
    });
    currentDir = currentDir.GoToOuterMost();
    let total = 0;
    if (part == 1) {
        let directoriesPart1 = [];
        currentDir.DirSize(directoriesPart1, part);
        total = directoriesPart1.reduce((sum, d) => sum += d.DirSize(null, part), 0);
    }
    else {
        let directoriesPart2 = [];
        let freespace = 70000000 - currentDir.DirSize(directoriesPart2, part);
        let freeUpSpace = 30000000 - freespace;
        let listDirs = directoriesPart2.map((dir) => ({ name: dir.name, space: dir.DirSize(null, part) }));
        let highestDir = listDirs.filter(x => x.space > freeUpSpace).sort((a, b) => a.space - b.space);
        total = highestDir[0].space;
    }
    return `answer${part} ${total}`;
}
Promise.all([day7(1), day7(2)]).then((answer) => console.log(answer.join(', ')));
//answer1 2104783
//answer2 5883165
//# sourceMappingURL=day7.js.map