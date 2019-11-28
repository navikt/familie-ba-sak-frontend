const harFyltInnFødselsnummer = (filled: String): boolean => {
    return /^\d{11}$/.test(filled.replace(' ', ''));
};

const fødselsnummerPassererMod10ogMod11Sjekk = (fn: String): boolean => {
    const vektSifreMod10 = [3, 7, 6, 1, 8, 9, 4, 5, 2, 1];
    const vektSifreMod11 = [5, 4, 3, 2, 7, 6, 5, 4, 3, 2, 1];

    let sumMod10 = 0;
    for (let i = 0; i < 10; i++) {
        sumMod10 += Number.parseInt(fn.charAt(i), 10) * vektSifreMod10[i];
    }

    let sumMod11 = 0;
    for (let i = 0; i < 11; i++) {
        sumMod11 += Number.parseInt(fn.charAt(i), 10) * vektSifreMod11[i];
    }

    return sumMod10 % 11 === 0 && sumMod11 % 11 === 0;
};

enum ErrorId {
    Ok,
    TømmeFødselsnummer,
    UgyldigFødselsnummer,
}

const sjekkeFødselsnummer = (fn: String): ErrorId => {
    return fn.length == 0
        ? ErrorId.TømmeFødselsnummer
        : harFyltInnFødselsnummer(fn) && fødselsnummerPassererMod10ogMod11Sjekk(fn)
        ? ErrorId.Ok
        : ErrorId.UgyldigFødselsnummer;
};

export { sjekkeFødselsnummer, ErrorId };
