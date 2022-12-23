import { readFileSync } from "fs";
const puzzlePath = "puzzleinput/day16.txt";

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

class Step {
  constructor(valveName: string, minute: number, flowrate?: number, openValves?: string[], previousValve?: string, openValveMinute?: number[][]) {
    this.ValveName = valveName;
    this.Minute = minute
    this.TotalFlowRate = flowrate;
    this.OpenValves = openValves;
    this.PreviousValve = previousValve;
    this.OpenValvesMinute = openValveMinute
  }

  public ValveName: string;
  public TotalFlowRate?: number;
  public Minute: number;
  public OpenValves: string[];
  public OpenValvesMinute: number[][];
  public PreviousValve: string;

  public TotalPressure(flowToMinutes: number): number {
    let sum = 0;

    if (!this.OpenValvesMinute) return 0;
    for (let index = 0; index < this.OpenValvesMinute.length; index++) {
      const minute = this.OpenValvesMinute[index][0];
      const flowrate = this.OpenValvesMinute[index][1];
      sum += (flowToMinutes - minute) * flowrate
    }
    return sum;
  }
}

async function day16(part: number, print: boolean) {

  let scanOutput = readFileSync(puzzlePath).toString().split('\n').map(line => {
    let name = line.split(' ')[1]
    let flowrate = parseInt(line.substring(line.indexOf('=') + 1, line.indexOf(';')))
    let tunnelstovalve = line.substring(line.indexOf('valves') + 6).split(',').map(valve => valve.trim())
    return new Valve(name, flowrate, tunnelstovalve)
  })
  let totalValves = scanOutput.filter(so => so.FlowRate != undefined && so.FlowRate > 0).length
  let minute = 0;
  let newPaths: Step[] = [new Step("AA", 0)]

  if (part == 1) {

    while (minute <= 30) {

      if (minute == 24) {
        newPaths = newPaths.filter(np => np.OpenValves != undefined && np.OpenValves.length > 2);

        newPaths.sort((a, b) => b.TotalPressure(30) - a.TotalPressure(30))
        newPaths.splice(1000);
      }

      let oldPaths = newPaths.filter(np => np.Minute == minute)
      minute++;

      console.log(minute);
      //logPath(oldPaths, minute);
      newPaths = [];
      oldPaths.forEach(oldPath => {
        let openValves = oldPath.OpenValves ? oldPath.OpenValves : []; //oldPath.OpenValves;
        let currentValve = scanOutput.find(v => v.Name == oldPath.ValveName);
        let valves = scanOutput.filter(v => currentValve.TunnelToValve.includes(v.Name));
        let currentFlow = oldPath.TotalFlowRate ?? 0;
        valves.filter(v => v.Name != oldPath.PreviousValve).forEach(valve => {
          let openValvesMinute = oldPath.OpenValvesMinute ? oldPath.OpenValvesMinute : null;
          newPaths.push(new Step(valve.Name, minute, currentFlow, openValves, currentValve.Name, openValvesMinute))
        })


        if (currentValve.FlowRate > 0 && (!openValves || !openValves.find(o => o === currentValve.Name))) {
          let openValvesMinute = oldPath.OpenValvesMinute ? [...oldPath.OpenValvesMinute] : null; //oldPath.OpenValvesMinute;
          let newOpenValves = [...openValves]
          // if (openValvesMinute?.length > 6) {
          //   let b = 1;
          // }

          newOpenValves.push(currentValve.Name)
          newOpenValves = newOpenValves.sort()
          let minuteWithFlowrate = [minute, currentValve.FlowRate];

          if (!openValvesMinute) {
            openValvesMinute = [minuteWithFlowrate];
          }
          else {
            openValvesMinute.push(minuteWithFlowrate);
          }

          let newFlow = currentFlow + currentValve.FlowRate
          newPaths.push(new Step(currentValve.Name, minute, newFlow, newOpenValves, currentValve.Name, openValvesMinute))
        }

      })
    }

    //let steps = newPaths.filter(np => np.Minute == minute)
    let highPath = newPaths.sort((o1, o2) => o2.TotalPressure(30) - o1.TotalPressure(30))[0];

    // let hp = newPaths.filter(a => a.TotalFlowRate == highPath.TotalFlowRate)[0];
    let totalPressure = highPath.TotalPressure(30);
    return totalPressure;
  }
  else {
    //part 2

    const stopMinute = 26;
    let maxVal = 0;
    while (minute <= stopMinute) {
      if (minute >10) {
        newPaths = newPaths.filter(np => np.OpenValves != undefined && np.OpenValves.length > 0);
        
        newPaths.forEach(newpath => {
          let openvalves = newpath.OpenValves;
          let openvalvesLength = openvalves.length
          let flowNumber = newpath.TotalPressure(stopMinute + 1)
          let differentPath = (newPaths.filter(np => np.OpenValves.length == totalValves - openvalvesLength && np.OpenValves.every(n=> !openvalves.includes(n)))).map(x=> x.TotalPressure(stopMinute+ 1)).sort()[0];
          maxVal = differentPath + flowNumber > maxVal ? differentPath + flowNumber : maxVal
        })

        //newPaths = newPaths.filter(np => np.OpenValves != undefined && np.OpenValves.length > 2);
        //newPaths.sort((a, b) => b.TotalPressure(26) - a.TotalPressure(26))
        //newPaths.splice(1000);
      }
      
      console.log(maxVal)

      let oldPaths = newPaths.filter(np => np.Minute == minute)
      minute++;

      console.log(minute);
      //logPath(oldPaths, minute);
      newPaths = [];
      oldPaths.forEach(oldPath => {
        let openValves = oldPath.OpenValves ? oldPath.OpenValves : []; //oldPath.OpenValves;
        let currentValve = scanOutput.find(v => v.Name == oldPath.ValveName);
        let valves = scanOutput.filter(v => currentValve.TunnelToValve.includes(v.Name));
        let currentFlow = oldPath.TotalFlowRate ?? 0;
        valves.filter(v => v.Name != oldPath.PreviousValve).forEach(valve => {
          let openValvesMinute = oldPath.OpenValvesMinute ? oldPath.OpenValvesMinute : null;
          newPaths.push(new Step(valve.Name, minute, currentFlow, openValves, currentValve.Name, openValvesMinute))
        })

        if (currentValve.FlowRate > 0 && (!openValves || !openValves.find(o => o === currentValve.Name))) {
          let openValvesMinute = oldPath.OpenValvesMinute ? [...oldPath.OpenValvesMinute] : null; //oldPath.OpenValvesMinute;
          let newOpenValves = [...openValves]
          // if (openValvesMinute?.length > 6) {
          //   let b = 1;
          // }

          newOpenValves.push(currentValve.Name)
          newOpenValves = newOpenValves.sort()
          let minuteWithFlowrate = [minute, currentValve.FlowRate];

          if (!openValvesMinute) {
            openValvesMinute = [minuteWithFlowrate];
          }
          else {
            openValvesMinute.push(minuteWithFlowrate);
          }

          let newFlow = currentFlow + currentValve.FlowRate
          newPaths.push(new Step(currentValve.Name, minute, newFlow, newOpenValves, currentValve.Name, openValvesMinute))
        }

      });
    }

    // newPaths = newPaths.filter(np => np.OpenValves != undefined && np.OpenValves.length > 0);
    // let maxVal = 0 
    // newPaths.forEach(newpath => {
    //   let openvalves = newpath.OpenValves;
    //   let flowNumber = newpath.TotalPressure(stopMinute + 1)
    //   let differentPath = (newPaths.filter(np =>np.OpenValves.every(n=> !openvalves.includes(n)))).map(x=> x.TotalPressure(stopMinute+ 1)).sort()[0];
    //   let t = 5;
    //  maxVal = differentPath + flowNumber > maxVal ? differentPath + flowNumber : maxVal
    // })
    //let steps = newPaths.filter(np => np.Minute == minute)
    let typ = maxVal;
    let highPath = newPaths.sort((o1, o2) => o2.TotalPressure(stopMinute) - o1.TotalPressure(stopMinute))[0];

    // let hp = newPaths.filter(a => a.TotalFlowRate == highPath.TotalFlowRate)[0];
    let totalPressure = highPath.TotalPressure(30);
    return totalPressure;
  }
}



function logPath(oldPaths: Step[], minute: number) {
  let highPath = oldPaths.sort((o1, o2) => o2.TotalFlowRate - o1.TotalFlowRate)[0]
  console.log(`minute:${minute} totalflow:${highPath.TotalFlowRate} openValves: ${highPath.OpenValves?.join(' ,')}`)
}

Promise.all([day16(2, true)]).then((answer) => console.log(answer.join(', ')))

//answer1 2077
//answer2 