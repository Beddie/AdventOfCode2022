import { readFileSync } from "fs";
const puzzlePath = "puzzleinput/day7.txt";

class File {
    constructor(name: string, size: number) {
        this.name = name.split('.')[0];
        this.type = name.split('.')[1];
        this.size = size;
    }

    private name: string
    public size: number
    private type: string
}

class Directory {
    constructor(name: string, parentDirectory: Directory) {
        this.name = name;
        this.parentDirectory = parentDirectory;
    }

    public name: string
    private directories: Directory[] = [];
    private parentDirectory?: Directory;
    private files: File[] = [];

    public DirSize(totalcount, part: number): number {
        let total = this.directories.length > 0 ? this.directories.reduce((totaldirsize, dir) => {
            {
                let totalSizeOfDir = dir.DirSize(totalcount, part);
                return totaldirsize += totalSizeOfDir;
            }
        }
        ,0
        ) : 0

        total += this.files.length > 0 ? this.files.reduce((totalFilessize, files) => {
            totalFilessize += files.size;
            return totalFilessize;
        }, 0
        ) : 0

        if (part == 1){
            if (totalcount != null && total <= 100000){
                totalcount.push(this);
            }
        }
        else if (part == 2)
        {
            if (totalcount != null) {
            totalcount.push(this);
            }
        }

        return total
    }

    public In(dirName: string) {
        return this.directories.find((dir) => dir.name == dirName)
    }
    
    public Out() {
        return this.parentDirectory;
    }

    public GoToOuterMost(){
        let dir: Directory;
        dir = this.parentDirectory
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

    public AddFile(file : File) {
        this.files.push(file);
    }

    public AddDirectory(dir : Directory) {
        this.directories.push(dir);
    }
}


async function day7(part:number) {
    const answer = ""
    const puzzleString: string = readFileSync(puzzlePath).toString();
    const puzzleInput: string[] = puzzleString.split("\n");
    let baseDir = new Directory("base", null);
    let currentDir : Directory = baseDir;
   
    puzzleInput.forEach(line => {
        console.log(line);
        if (line[0] == "$") {
            if (line == "$ ls") {
                // do nothing
            }
            else {
                switch (line.slice(-1)) {
                    case "/":
                        currentDir = currentDir.GoToOuterMost()
                        break;
                    case ".":
                        currentDir = currentDir.Out()
                        break;
                    default:
                        currentDir = currentDir.In(line.split(' ')[2])
                        break;
                }
            }
        }
        else if (line[0] == "d") {
            let newDir = new Directory(line.split(' ')[1], currentDir)
            currentDir.AddDirectory(newDir);
        }
        else {
            let newFile = new File(line.split(' ')[1], parseInt(line.split(' ')[0]))
            currentDir.AddFile(newFile);
        }
    });

    currentDir = currentDir.GoToOuterMost();
    
    let total = 0
    if (part == 1){
        let directoriesPart1: Directory[] = [];
        currentDir.DirSize(directoriesPart1, part)
        total = directoriesPart1.reduce((sum, d) => sum += d.DirSize(null, part),0)
    }
    else {
        let directoriesPart2: Directory[] = [];
        let freespace = 70000000 - currentDir.DirSize(directoriesPart2, part);
        let freeUpSpace = 30000000 - freespace
        let listDirs = directoriesPart2.map((dir) => ( { name: dir.name, space: dir.DirSize(null, part)}))
        let highestDir = listDirs.filter(x=> x.space > freeUpSpace).sort((a,b)=> a.space - b.space);
        total = highestDir[0].space;
    }
    return `answer${part} ${total}`
}

Promise.all([day7(1),day7(2)]).then((answer) => console.log(answer.join(', ')))

//answer1 2104783
//answer2 5883165