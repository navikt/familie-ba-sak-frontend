import type { Felt, FeltState } from '@navikt/familie-skjema';
import { feil, ok, Valideringsstatus } from '@navikt/familie-skjema';

export interface IFritekstFelt {
    tekst: string;
    id: number;
}

export const genererIdBasertPåAndreFritekster = (fritekster?: Felt<FeltState<IFritekstFelt>[]>) => {
    if (fritekster && fritekster.verdi.length > 0) {
        return Math.max(...fritekster.verdi.map(fritekst => fritekst.verdi.id, 10)) + 1;
    } else {
        return 1;
    }
};

export const lagInitiellFritekst = (
    initiellVerdi: string,
    id: number,
    makslengde: number,
    valideringsmelding?: string
): FeltState<IFritekstFelt> => ({
    feilmelding: initiellVerdi === '' ? 'Fritekstfeltet er tomt.' : '',
    verdi: {
        tekst: initiellVerdi,
        id: id,
    },
    valider: (felt: FeltState<IFritekstFelt>) => {
        if (felt.verdi.tekst.length > makslengde) {
            return feil(felt, `Du har nådd maks antall tegn: ${makslengde}.`);
        } else if (felt.verdi.tekst.trim().length === 0) {
            return feil(
                felt,
                valideringsmelding ||
                    'Du må skrive tekst i feltet, eller fjerne det om du ikke skal ha fritekst.'
            );
        } else {
            return ok(felt);
        }
    },
    valideringsstatus:
        initiellVerdi === '' ? Valideringsstatus.IKKE_VALIDERT : Valideringsstatus.OK,
});
