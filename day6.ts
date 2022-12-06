import { readFileSync } from "fs";
const puzzlePath = "puzzleinput/day6.txt";

async function day6(part:number) {
    const puzzleString: string = readFileSync(puzzlePath).toString();
    let found = false;
    let numbers = part == 1 ? 4 : 14
    let answer = [...puzzleString].reduce((packets, letter, i) => { 

        if (found) { return packets}

        packets += letter;         
        if (packets.length >= numbers) {
            let lastpackets = packets.substring(i-(numbers-1))
            let lastpacket = [...lastpackets].reduce((packet, letter) => { return packet.includes(letter) ? packet : packet += letter })
            if (lastpacket.length == numbers) {
                found = true;
                return (i + 1).toString();
            }
        }
        return packets;
    })
    
    return `answer${part} ${answer}`
}

Promise.all([day6(1),day6(2)]).then((answer) => console.log(answer.join(', ')))

//answer1 1855
//answer2 3256