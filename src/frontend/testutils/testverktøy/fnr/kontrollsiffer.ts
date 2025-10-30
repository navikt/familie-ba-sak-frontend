export default function beregnKontrollsiffer(fodselsnummer: string, multiplikatorTabell: number[]) {
    let sum = 0;
    for (let i = 0; i < multiplikatorTabell.length; i++) {
        sum += parseInt(fodselsnummer[i], 10) * multiplikatorTabell[i];
    }
    const rest = sum % 11;

    if (rest === 0) return 0;
    return 11 - rest;
}
