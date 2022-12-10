"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("crypto");
const fs_1 = require("fs");
const process_1 = require("process");
const puzzlePath = "puzzleinput/day7.txt";
async function day7(part) {
    const answer = "";
    const puzzleInput = (0, fs_1.readFileSync)(puzzlePath).toString().split('\n');
    let alleLeerlingen = puzzleInput.map((line) => line);
    let totaalAantalLeerlingen = alleLeerlingen.length;
    let willekeurigGetal = (0, crypto_1.randomInt)(totaalAantalLeerlingen);
    let lijstLotingen = [];
    while (alleLeerlingen.length > 0) {
        let totaalAantalLeerlingen = alleLeerlingen.length - 1;
        let willekeurigGetal = (0, crypto_1.randomInt)(totaalAantalLeerlingen);
        const leerling1 = alleLeerlingen[willekeurigGetal];
        alleLeerlingen.splice(willekeurigGetal, 1);
        totaalAantalLeerlingen = alleLeerlingen.length - 1;
        let willekeurigGetal2 = totaalAantalLeerlingen != 0 ? (0, crypto_1.randomInt)(totaalAantalLeerlingen) : 0;
        const leerling2 = alleLeerlingen[willekeurigGetal2];
        alleLeerlingen.splice(willekeurigGetal2, 1);
        let loting = [leerling1, leerling2];
        lijstLotingen.push(loting);
        console.log(`${loting[0]} heeft ${loting[1]} geloot`);
    }
    let alIngelote = lijstLotingen.map((x) => x[0]);
    let nognietIngelote = lijstLotingen.map((x) => x[1]);
    nognietIngelote.forEach((loting) => {
        let totaalAantalLeerlingen = alIngelote.length - 1;
        let willekeurigGetal = totaalAantalLeerlingen != 0 ? (0, crypto_1.randomInt)(totaalAantalLeerlingen) : 0;
        let leerling2 = alIngelote[willekeurigGetal];
        //while (leerling2 != )
        while (lijstLotingen.filter((loting) => loting[1] == loting)[0] == leerling2) {
            willekeurigGetal = totaalAantalLeerlingen != 0 ? (0, crypto_1.randomInt)(totaalAantalLeerlingen) : 0;
            leerling2 = alIngelote[willekeurigGetal];
        }
        alIngelote.splice(willekeurigGetal, 1);
        let nieuweloting = [loting, leerling2];
        lijstLotingen.push(nieuweloting);
        console.log(`${nieuweloting[0]} heeft ${nieuweloting[1]} geloot`);
        if (alIngelote.length == 0) {
            process_1.exit;
        }
    });
    return ``;
}
Promise.all([day7(1)]).then((answer) => console.log(answer.join(', ')));
//answer1 2104783
//answer2 5883165
//# sourceMappingURL=loting.js.map