import beregnKontrollsiffer from './kontrollsiffer';

/**
 * Beregner kontrollsiffer 1 i fødselsnummeret.
 */
export function beregnKontrollsiffer1(fodselsnummer: string) {
    const kontrollSiffer1Multiplikatorer = [3, 7, 6, 1, 8, 9, 4, 5, 2];
    return beregnKontrollsiffer(fodselsnummer, kontrollSiffer1Multiplikatorer);
}

/**
 * Beregner kontrollsiffer 2 i fødselsnummeret.
 */
export function beregnKontrollsiffer2(fodselsnummer: string) {
    const kontrollSiffer2Multiplikatorer = [5, 4, 3, 2, 7, 6, 5, 4, 3, 2];
    return beregnKontrollsiffer(fodselsnummer, kontrollSiffer2Multiplikatorer);
}
