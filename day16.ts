import { fstat, readFileSync, writeFileSync } from "fs";
const puzzlePath = "puzzleinput/day16.txt";
const puzzleOutputPath = "puzzleoutput/day16output.txt";

class Valve {
  constructor(name: string, flowrate: number, tunnelsToValve) {
    this.Name = name;
    this.FlowRate = flowrate,
      this.TunnelToValve = tunnelsToValve;
  }

  public Name: string;
  public TunnelToValve: string[];
  public FlowRate: number;
  public GridPoint: any;
}

function GridPoint(valve: Valve, valves: Valve[]) {
  this.f = 0; //total cost function
  this.g = 0; //cost function from start to the current grid point
  this.h = 0; //heuristic estimated cost function from current grid point to the goal
  this.neighbors = []; // neighbors of the current grid point
  this.parent = undefined; // immediate source of the current grid point

  // update neighbors array for a given grid point
  this.updateNeighbors = function (valves: Valve[]) {
    //let currentHeight = hills[j][i]
    let neighbourvalves = valves.filter(v => valve.TunnelToValve.includes(v.Name) === true);
    neighbourvalves.forEach(nv => {
      this.neighbors.push(nv);
    })
  };
}

class Pathfinder {

  private endPosition = [];
  private startPositionPart1 = [];
  private startPositions = [];

  private openSet = []; //array containing unevaluated grid points
  private closedSet = []; //array containing completely evaluated grid points
  private path = [];

  constructor(valves: Valve[]) {
    this.init(valves);
  }
  //constructor function to create all the grid points as objects containind the data for the points


  //initializing the pipelines
  private init(valves: Valve[]) {
    valves.forEach(v => v.GridPoint = new GridPoint(v, valves));
    valves.forEach(v => v.GridPoint.updateNeighbors(valves));
    let start = valves.find(v => v.Name == "AA");
    this.openSet.push(start);
  }

  //A star search implementation
  public search(valves: Valve[]) {
    let maxMinutes = 30;
    while (this.openSet.length > 0) {
      //assumption lowest index is the first one to begin with
      let lowestIndex = 0;
      for (let i = 0; i < this.openSet.length; i++) {
        if (this.openSet[i].GridPoint.f < this.openSet[lowestIndex].GridPoint.f) {
          lowestIndex = i;
        }
      }
      let current = this.openSet[lowestIndex].GridPoint;

      if (this.closedSet.length === maxMinutes) {
        let temp = current;
        this.path.push(temp);
        while (temp.parent) {
          this.path.push(temp.parent);
          temp = temp.parent;
        }
        // return the traced path
        return this.path.reverse();
      }

      //remove current from openSet
      this.openSet.splice(lowestIndex, 1);
      //add current to closedSet
      this.closedSet.push(current);

      let neighbors = current.neighbors;

      for (let i = 0; i < neighbors.length; i++) {
        let neighbor = neighbors[i];

        if (!this.closedSet.includes(neighbor)) {
          let possibleG = current.g + 1;

          if (!this.openSet.includes(neighbor)) {
            this.openSet.push(neighbor);
          } else if (possibleG >= neighbor.g) {
            continue;
          }

          neighbor.g = possibleG;
          //neighbor.h = heuristic(neighbor, end);
          neighbor.f = neighbor.g + neighbor.h;
          neighbor.parent = current;
        }
      }
    }
    return undefined;
  }
}
// Valve AA has flow rate=0; tunnels lead to valves DD, II, BB


async function day16(part: number, print: boolean) {

  let scanOutput = readFileSync(puzzlePath).toString().split('\n').map(line => {
    let name = line.split(' ')[1]
    let flowrate = parseInt(line.substring(line.indexOf('=') + 1, line.indexOf(';')))
    let tunnelstovalve = line.substring(line.indexOf('valves') + 6).split(',').map(valve => valve.trim())
    return new Valve(name, flowrate, tunnelstovalve)
  })

  const pathfinder = new Pathfinder(scanOutput);
  pathfinder.search(scanOutput);
}

Promise.all([day16(1, true)]).then((answer) => console.log(answer.join(', ')))

//answer1 
//answer2 