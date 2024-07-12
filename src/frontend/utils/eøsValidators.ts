import { addMonths, endOfMonth, isAfter } from 'date-fns';

import { feil, ok } from '@navikt/familie-skjema';
import type { Avhengigheter, FeltState } from '@navikt/familie-skjema';

import type { IIsoMånedPeriode, IsoMånedString } from './dato';
import { dagensDato, isoStringTilDate } from './dato';
import type { OptionType } from '../typer/common';

const isEmpty = (text?: string | number | boolean | Date | null) =>
    text === null || text === undefined || text.toString().trim().length === 0;

const valgtDatoErNesteMånedEllerSenere = (valgtDato: IsoMånedString) =>
    isAfter(isoStringTilDate(valgtDato), endOfMonth(dagensDato));
const valgtDatoErSenereEnnNesteMåned = (valgtDato: IsoMånedString) =>
    isAfter(isoStringTilDate(valgtDato), endOfMonth(addMonths(dagensDato, 1)));

const erEøsPeriodeGyldig = (
    felt: FeltState<IIsoMånedPeriode>,
    avhengigheter?: Avhengigheter
): FeltState<IIsoMånedPeriode> => {
    const fom = felt.verdi.fom;
    const tom = felt.verdi.tom;

    const initielFom = avhengigheter?.initielFom?.verdi || avhengigheter?.initielFom;

    if (!fom || isEmpty(fom)) {
        return feil(felt, 'Fra og med måned må være utfylt');
    }
    if (fom && valgtDatoErSenereEnnNesteMåned(fom)) {
        return feil(
            felt,
            'Du kan ikke sette fra og med (f.o.m.) til måneden etter neste måned eller senere'
        );
    }
    if (initielFom && !isAfter(isoStringTilDate(fom), isoStringTilDate(initielFom))) {
        return feil(
            felt,
            `Du kan ikke legge inn fra og med måned som er før: ${avhengigheter?.initielFom}`
        );
    }
    if (tom && valgtDatoErNesteMånedEllerSenere(tom)) {
        return feil(felt, 'Du kan ikke sette til og med (t.o.m.) til neste måned eller senere');
    }

    return ok(felt);
};

const erBarnGyldig = (felt: FeltState<OptionType[]>): FeltState<OptionType[]> =>
    felt.verdi.length > 0 ? ok(felt) : feil(felt, 'Minst ett barn må være valgt');

const erValutakodeGyldig = (felt: FeltState<string | undefined>): FeltState<string | undefined> =>
    !isEmpty(felt.verdi) ? ok(felt) : feil(felt, 'Valuta er påkrevd, men mangler input');

const tellAntallDesimaler = (verdi: string): number => verdi.split(/,|\./)[1]?.length ?? 0;

const isNumeric = (val: string): boolean => !isNaN(Number(val));

export {
    erEøsPeriodeGyldig,
    erBarnGyldig,
    erValutakodeGyldig,
    isEmpty,
    isNumeric,
    tellAntallDesimaler,
};
