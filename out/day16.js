"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const puzzlePath = "puzzleinput/day16.txt";
class Valve {
    constructor(name, flowrate, tunnelsToValve) {
        this.Name = name;
        this.FlowRate = flowrate,
            this.TunnelToValve = tunnelsToValve;
    }
    Name;
    TunnelToValve;
    FlowRate;
    GridPoint;
}
class Step {
    constructor(valveName, minute, flowrate, openValves, previousValve, openValveMinute) {
        this.ValveName = valveName;
        this.Minute = minute;
        this.TotalFlowRate = flowrate;
        this.OpenValves = openValves;
        this.PreviousValve = previousValve;
        this.OpenValvesMinute = openValveMinute;
    }
    ValveName;
    TotalFlowRate;
    Minute;
    OpenValves;
    OpenValvesMinute;
    PreviousValve;
    TotalPressure(flowToMinutes) {
        let sum = 0;
        if (!this.OpenValvesMinute)
            return 0;
        for (let index = 0; index < this.OpenValvesMinute.length; index++) {
            const minute = this.OpenValvesMinute[index][0];
            const flowrate = this.OpenValvesMinute[index][1];
            sum += (flowToMinutes - minute) * flowrate;
        }
        return sum;
    }
}
async function day16(part, print) {
    let scanOutput = (0, fs_1.readFileSync)(puzzlePath).toString().split('\n').map(line => {
        let name = line.split(' ')[1];
        let flowrate = parseInt(line.substring(line.indexOf('=') + 1, line.indexOf(';')));
        let tunnelstovalve = line.substring(line.indexOf('valves') + 6).split(',').map(valve => valve.trim());
        return new Valve(name, flowrate, tunnelstovalve);
    });
    let minute = 0;
    let newPaths = [new Step("AA", 0)];
    while (minute <= 30) {
        if (minute == 24) {
            newPaths = newPaths.filter(np => np.OpenValves != undefined && np.OpenValves.length > 2);
            newPaths.sort((a, b) => b.TotalPressure(30) - a.TotalPressure(30));
            newPaths.splice(1000);
            //let recurrentpaths= newPaths.filter(np => np.)
        }
        let oldPaths = newPaths.filter(np => np.Minute == minute);
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
                newPaths.push(new Step(valve.Name, minute, currentFlow, openValves, currentValve.Name, openValvesMinute));
            });
            if (currentValve.FlowRate > 0 && (!openValves || !openValves.find(o => o === currentValve.Name))) {
                let openValvesMinute = oldPath.OpenValvesMinute ? [...oldPath.OpenValvesMinute] : null; //oldPath.OpenValvesMinute;
                let newOpenValves = [...openValves];
                // if (openValvesMinute?.length > 6) {
                //   let b = 1;
                // }
                newOpenValves.push(currentValve.Name);
                newOpenValves = newOpenValves.sort();
                let minuteWithFlowrate = [minute, currentValve.FlowRate];
                if (!openValvesMinute) {
                    openValvesMinute = [minuteWithFlowrate];
                }
                else {
                    openValvesMinute.push(minuteWithFlowrate);
                }
                let newFlow = currentFlow + currentValve.FlowRate;
                newPaths.push(new Step(currentValve.Name, minute, newFlow, newOpenValves, currentValve.Name, openValvesMinute));
            }
        });
    }
    //let steps = newPaths.filter(np => np.Minute == minute)
    let highPath = newPaths.sort((o1, o2) => o2.TotalPressure(30) - o1.TotalPressure(30))[0];
    // let hp = newPaths.filter(a => a.TotalFlowRate == highPath.TotalFlowRate)[0];
    let totalPressure = highPath.TotalPressure(30);
    // let answer = 0;
    // allHighPaths.forEach(ahp => {
    //   let totalPressure = ahp.TotalPressure(30);
    //   answer = totalPressure > answer ? totalPressure : answer;
    // })
    //return answer;
}
function logPath(oldPaths, minute) {
    let highPath = oldPaths.sort((o1, o2) => o2.TotalFlowRate - o1.TotalFlowRate)[0];
    console.log(`minute:${minute} totalflow:${highPath.TotalFlowRate} openValves: ${highPath.OpenValves?.join(' ,')}`);
}
Promise.all([day16(1, true)]).then((answer) => console.log(answer.join(', ')));
//answer1 2054
//answer2 
//# sourceMappingURL=day16.js.map