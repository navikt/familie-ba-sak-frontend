import { useEffect, useState } from 'react';

import type { FieldDictionary } from '@navikt/familie-skjema';
import { feil, ok, useFelt, useSkjema } from '@navikt/familie-skjema';
import type { UseSkjemaVerdi } from '@navikt/familie-skjema/dist/typer';
import { hentDataFraRessurs } from '@navikt/familie-typer';

import { useFagsakContext } from '../../../../../context/fagsak/FagsakContext';
import type { IBehandling } from '../../../../../typer/behandling';

export type BrevmottakerUseSkjema = UseSkjemaVerdi<
    ILeggTilFjernBrevmottakerSkjemaFelter,
    IBehandling
>;

interface Props {
    eksisterendeMottakere: SkjemaBrevmottaker[];
}

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

export interface SkjemaBrevmottaker {
    type: Mottaker;
    navn: string;
    adresselinje1: string;
    adresselinje2?: string;
    postnummer: string;
    poststed: string;
    landkode: string;
}

export interface IRestBrevmottaker extends SkjemaBrevmottaker {
    id: number;
}

const preutfyltNavnFixed = (mottaker: Mottaker | '', land: string, navn: string) => {
    if (mottaker === Mottaker.DØDSBO) {
        return !land || land === 'NO' ? `${navn} v/dødsbo` : `Estate of ${navn}`;
    }
    return navn;
};

export const useBrevmottakerSkjema = ({ eksisterendeMottakere }: Props) => {
    const { bruker } = useFagsakContext();
    const søker = hentDataFraRessurs(bruker);

    const mottaker = useFelt<Mottaker | ''>({
        verdi: '',
        avhengigheter: { eksisterendeMottakere },
        valideringsfunksjon: (felt, avhengigheter) => {
            const eksisterendeMottakere: IRestBrevmottaker[] = avhengigheter?.eksisterendeMottakere;
            if (felt.verdi === '') {
                return feil(felt, 'Feltet er påkrevd');
            }
            if (eksisterendeMottakere.length) {
                const eksisterendeBrevmottakerType = eksisterendeMottakere[0].type;
                if (felt.verdi === eksisterendeBrevmottakerType) {
                    return feil(felt, `${mottakerVisningsnavn[felt.verdi]} er allerede lagt til`);
                }
                if (
                    felt.verdi === Mottaker.DØDSBO ||
                    eksisterendeBrevmottakerType === Mottaker.DØDSBO
                ) {
                    return feil(felt, 'Dødsbo kan ikke kombineres med andre brevmottakere');
                }
                if (
                    felt.verdi === Mottaker.BRUKER_MED_UTENLANDSK_ADRESSE ||
                    eksisterendeBrevmottakerType === Mottaker.BRUKER_MED_UTENLANDSK_ADRESSE
                ) {
                    return ok(felt);
                }
                return feil(
                    felt,
                    `${
                        mottakerVisningsnavn[eksisterendeBrevmottakerType]
                    } kan ikke kombineres med ${mottakerVisningsnavn[felt.verdi].toLowerCase()}.`
                );
            }
            return ok(felt);
        },
    });
    const navn = useFelt<string>({
        verdi: '',
        valideringsfunksjon: felt => {
            if (felt.verdi === '') {
                return feil(felt, 'Navn på person eller organisasjon er påkrevd');
            }
            return felt.verdi.length <= 80
                ? ok(felt)
                : feil(felt, 'Feltet kan ikke inneholde mer enn 80 tegn');
        },
    });
    const adresselinje1 = useFelt<string>({
        verdi: '',
        valideringsfunksjon: felt => {
            if (felt.verdi === '') {
                return feil(felt, 'Feltet er påkrevd');
            }
            return felt.verdi.length <= 80
                ? ok(felt)
                : feil(felt, 'Feltet kan ikke inneholde mer enn 80 tegn');
        },
    });
    const adresselinje2 = useFelt<string>({
        verdi: '',
        valideringsfunksjon: felt =>
            felt.verdi.length <= 80
                ? ok(felt)
                : feil(felt, 'Feltet kan ikke inneholde mer enn 80 tegn'),
    });
    const postnummer = useFelt<string>({
        verdi: '',
        valideringsfunksjon: felt => {
            if (felt.verdi === '') {
                return feil(felt, 'Feltet er påkrevd');
            }
            return felt.verdi.length <= 10
                ? ok(felt)
                : feil(felt, 'Feltet kan ikke inneholde mer enn 10 tegn');
        },
    });
    const poststed = useFelt<string>({
        verdi: '',
        valideringsfunksjon: felt => {
            if (felt.verdi === '') {
                return feil(felt, 'Feltet er påkrevd');
            }
            return felt.verdi.length <= 50
                ? ok(felt)
                : feil(felt, 'Feltet kan ikke inneholde mer enn 50 tegn');
        },
    });
    const land = useFelt<string>({
        verdi: '',
        valideringsfunksjon: (felt, avhengigheter) => {
            const norgeErUlovligValgt =
                avhengigheter?.mottaker.verdi === Mottaker.BRUKER_MED_UTENLANDSK_ADRESSE &&
                felt.verdi === 'NO';
            if (norgeErUlovligValgt) {
                return feil(felt, 'Norge kan ikke være satt for bruker med utenlandsk adresse');
            }
            return felt.verdi !== ''
                ? ok(felt)
                : feil(felt, 'Feltet er påkrevd. Velg Norge dersom brevet skal sendes innenlands.');
        },
        avhengigheter: { mottaker },
    });

    const [navnErPreutfylt, settNavnErPreutfylt] = useState(false);

    const skalNavnVærePreutfylt =
        mottaker.verdi === Mottaker.DØDSBO ||
        mottaker.verdi === Mottaker.BRUKER_MED_UTENLANDSK_ADRESSE;

    useEffect(() => {
        if (skalNavnVærePreutfylt || skalNavnVærePreutfylt !== navnErPreutfylt) {
            navn.validerOgSettFelt(
                skalNavnVærePreutfylt && søker?.navn
                    ? preutfyltNavnFixed(mottaker.verdi, land.verdi, søker.navn)
                    : ''
            );
        }
        settNavnErPreutfylt(skalNavnVærePreutfylt);
    }, [mottaker.verdi, land.verdi]);

    const verdierFraUseSkjema: BrevmottakerUseSkjema = useSkjema<
        ILeggTilFjernBrevmottakerSkjemaFelter,
        IBehandling
    >({
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

    return { verdierFraBrevmottakerUseSkjema: verdierFraUseSkjema, navnErPreutfylt };
};

export const felterTilSkjemaBrevmottaker = (
    felter: FieldDictionary<ILeggTilFjernBrevmottakerSkjemaFelter>
): SkjemaBrevmottaker => {
    if (felter.mottaker.verdi !== '') {
        return {
            type: felter.mottaker.verdi,
            navn: felter.navn.verdi,
            adresselinje1: felter.adresselinje1.verdi,
            adresselinje2:
                felter.adresselinje2.verdi !== '' ? felter.adresselinje2.verdi : undefined,
            postnummer: felter.postnummer.verdi,
            poststed: felter.poststed.verdi,
            landkode: felter.land.verdi,
        };
    } else {
        throw new Error('Mottaker ikke satt');
    }
};
