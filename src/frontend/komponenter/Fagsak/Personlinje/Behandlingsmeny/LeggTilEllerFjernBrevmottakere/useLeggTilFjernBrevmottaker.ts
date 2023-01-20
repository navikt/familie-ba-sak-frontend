import { useSkjema, useFelt } from '@navikt/familie-skjema';

import type { IBehandling } from '../../../../../typer/behandling';

export enum Mottaker {
    BRUKER_MED_UTENLANDSK_ADRESSE = 'BRUKER_MED_UTENLANDSK_ADRESSE',
    FULLMEKTIG = 'FULLMEKTIG',
    VERGE = 'VERGE',
    DØDSBO = 'DØDSBO',
}

export const mottakerVisningsnavn: Record<Mottaker, string> = {
    BRUKER_MED_UTENLANDSK_ADRESSE: 'Bruker med utenlandsk adresse',
    FULLMEKTIG: 'Fullmektig',
    VERGE: 'Verge',
    DØDSBO: 'Dødsbo',
};

export interface ILeggTilFjernBrevmottakerSkjemaFelter {
    mottaker: Mottaker | '';
    navn: string;
    adresselinje1: string;
    adresselinje2: string;
    postnummer: string;
    poststed: string;
    land: string;
}

const useLeggTilFjernBrevmottaker = () => {
    const mottaker = useFelt<Mottaker | ''>({
        verdi: '',
    });
    const navn = useFelt<string>({
        verdi: '',
    });
    const adresselinje1 = useFelt<string>({
        verdi: '',
    });
    const adresselinje2 = useFelt<string>({
        verdi: '',
    });
    const postnummer = useFelt<string>({
        verdi: '',
    });
    const poststed = useFelt<string>({
        verdi: '',
    });
    const land = useFelt<string>({
        verdi: '',
    });

    const { skjema } = useSkjema<ILeggTilFjernBrevmottakerSkjemaFelter, IBehandling>({
        felter: {
            mottaker,
            navn,
            adresselinje1,
            adresselinje2,
            postnummer,
            poststed,
            land,
        },
        skjemanavn: 'Legg til eller fjern brevmottaker',
    });

    return {
        skjema,
    };
};

export default useLeggTilFjernBrevmottaker;
