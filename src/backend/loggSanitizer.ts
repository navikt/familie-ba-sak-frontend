interface LoggGrenser {
    message: number;
    name: number;
    stack: number;
}

const STANDARD_GRENSER: LoggGrenser = {
    message: 1000,
    name: 200,
    stack: 400,
};

/**
 * Saniterer og avkorter tekst før den logges. Fjerner kontrolltegn for å hindre logg-injection
 * og ødelagte logglinjer, og kapper lengden per felt etter konfigurerte grenser.
 */
export class LoggSanitizer {
    private readonly grenser: LoggGrenser;

    constructor(grenser: LoggGrenser = STANDARD_GRENSER) {
        this.grenser = grenser;
    }

    saniterMelding(tekst: string): string {
        return this.avkort(this.saniterTekst(tekst), this.grenser.message);
    }

    saniterNavn(tekst: string): string {
        return this.avkort(this.saniterTekst(tekst), this.grenser.name);
    }

    saniterStack(tekst: string): string {
        return this.avkort(this.saniterTekst(tekst), this.grenser.stack);
    }

    // Fjerner kontrolltegn (beholder \n og \t) for å hindre logg-injection og ødelagte logglinjer.
    private saniterTekst(tekst: string): string {
        return tekst.replace(/\r/g, '\\r').replace(/[^\P{C}\n\t]/gu, '');
    }

    private avkort(tekst: string, maksLengde: number): string {
        return tekst.length <= maksLengde
            ? tekst
            : `${tekst.slice(0, maksLengde)}…(avkortet ${tekst.length - maksLengde} tegn)`;
    }
}
