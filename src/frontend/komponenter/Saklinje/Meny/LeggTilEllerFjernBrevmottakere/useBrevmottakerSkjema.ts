import type { FieldDictionary } from '@navikt/familie-skjema';
import { feil, ok, useFelt, useSkjema } from '@navikt/familie-skjema';
import type { Avhengigheter, UseSkjemaVerdi } from '@navikt/familie-skjema/dist/typer';
import { useBrukerContext } from '@sider/Fagsak/BrukerContext';
import type { IBehandling } from '@typer/behandling';
import type { Brevmottaker } from '@typer/brevmottaker';
import { Brevmottakertype, brevmottakertypeVisningsnavn } from '@typer/brevmottaker';
import { useEffect, useState } from 'react';

export type BrevmottakerUseSkjema = UseSkjemaVerdi<ILeggTilFjernBrevmottakerSkjemaFelter, IBehandling>;

interface Props {
    eksisterendeMottakere: Brevmottaker[];
}

interface ILeggTilFjernBrevmottakerSkjemaFelter {
    mottaker: Brevmottakertype | '';
    navn: string;
    adresselinje1: string;
    adresselinje2: string;
    postnummer: string;
    poststed: string;
    land: string;
}

const preutfyltNavnFixed = (mottaker: Brevmottakertype | '', land: string, navn: string) => {
    if (mottaker === Brevmottakertype.DØDSBO) {
        return !land || land === 'NO' ? `${navn} v/dødsbo` : `Estate of ${navn}`;
    }
    return navn;
};

export const useBrevmottakerSkjema = ({ eksisterendeMottakere }: Props) => {
    const { bruker: søker } = useBrukerContext();

    const mottaker = useFelt<Brevmottakertype | ''>({
        verdi: '',
        avhengigheter: { eksisterendeMottakere },
        valideringsfunksjon: (felt, avhengigheter) => {
            const eksisterendeMottakere: Brevmottaker[] = avhengigheter?.eksisterendeMottakere;
            if (felt.verdi === '') {
                return feil(felt, 'Feltet er påkrevd');
            }
            if (eksisterendeMottakere.length) {
                const eksisterendeBrevmottakerType = eksisterendeMottakere[0].type;
                if (felt.verdi === eksisterendeBrevmottakerType) {
                    return feil(felt, `${brevmottakertypeVisningsnavn[felt.verdi]} er allerede lagt til`);
                }
                if (
                    felt.verdi === Brevmottakertype.DØDSBO ||
                    eksisterendeBrevmottakerType === Brevmottakertype.DØDSBO
                ) {
                    return feil(felt, 'Dødsbo kan ikke kombineres med andre brevmottakere');
                }
                if (
                    felt.verdi === Brevmottakertype.BRUKER_MED_UTENLANDSK_ADRESSE ||
                    eksisterendeBrevmottakerType === Brevmottakertype.BRUKER_MED_UTENLANDSK_ADRESSE
                ) {
                    return ok(felt);
                }
                return feil(
                    felt,
                    `${
                        brevmottakertypeVisningsnavn[eksisterendeBrevmottakerType]
                    } kan ikke kombineres med ${brevmottakertypeVisningsnavn[felt.verdi].toLowerCase()}.`
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
            return felt.verdi.length <= 80 ? ok(felt) : feil(felt, 'Feltet kan ikke inneholde mer enn 80 tegn');
        },
    });
    const land = useFelt<string>({
        verdi: '',
        valideringsfunksjon: (felt, avhengigheter) => {
            const norgeErUlovligValgt =
                avhengigheter?.mottaker.verdi === Brevmottakertype.BRUKER_MED_UTENLANDSK_ADRESSE && felt.verdi === 'NO';
            if (norgeErUlovligValgt) {
                return feil(felt, 'Norge kan ikke være satt for bruker med utenlandsk adresse');
            }
            return felt.verdi !== ''
                ? ok(felt)
                : feil(felt, 'Feltet er påkrevd. Velg Norge dersom brevet skal sendes innenlands.');
        },
        avhengigheter: { mottaker },
    });
    const adresselinje1 = useFelt<string>({
        verdi: '',
        valideringsfunksjon: felt => {
            if (felt.verdi === '') {
                return feil(felt, 'Feltet er påkrevd');
            }
            return felt.verdi.length <= 80 ? ok(felt) : feil(felt, 'Feltet kan ikke inneholde mer enn 80 tegn');
        },
    });
    const adresselinje2 = useFelt<string>({
        verdi: '',
        valideringsfunksjon: felt =>
            felt.verdi.length <= 80 ? ok(felt) : feil(felt, 'Feltet kan ikke inneholde mer enn 80 tegn'),
    });
    const postnummer = useFelt<string>({
        verdi: '',
        valideringsfunksjon: (felt, avhengigheter) => {
            if (avhengigheter?.land.verdi !== 'NO' && felt.verdi === '') {
                return ok(felt);
            } else if (felt.verdi === '') {
                return feil(felt, 'Feltet er påkrevd');
            }
            //Sjekker at felter er 4 karakterer langt og er numerisk
            return /^\d{4}$/.test(felt.verdi) ? ok(felt) : feil(felt, 'Feltet må bestå av 4 siffer');
        },
        skalFeltetVises: (avhengigheter: Avhengigheter) => {
            return avhengigheter?.land.verdi === 'NO';
        },
        avhengigheter: { land },
    });
    const poststed = useFelt<string>({
        verdi: '',
        valideringsfunksjon: (felt, avhengigheter) => {
            if (avhengigheter?.land.verdi !== 'NO' && felt.verdi === '') {
                return ok(felt);
            } else if (felt.verdi === '') {
                return feil(felt, 'Feltet er påkrevd');
            }
            return felt.verdi.length <= 50 ? ok(felt) : feil(felt, 'Feltet kan ikke inneholde mer enn 50 tegn');
        },
        skalFeltetVises: (avhengigheter: Avhengigheter) => {
            return avhengigheter?.land.verdi === 'NO';
        },
        avhengigheter: { land },
    });

    const [navnErPreutfylt, settNavnErPreutfylt] = useState(false);

    const skalNavnVærePreutfylt =
        mottaker.verdi === Brevmottakertype.DØDSBO || mottaker.verdi === Brevmottakertype.BRUKER_MED_UTENLANDSK_ADRESSE;

    useEffect(() => {
        if (skalNavnVærePreutfylt || skalNavnVærePreutfylt !== navnErPreutfylt) {
            navn.validerOgSettFelt(
                skalNavnVærePreutfylt && søker?.navn ? preutfyltNavnFixed(mottaker.verdi, land.verdi, søker.navn) : ''
            );
        }
        settNavnErPreutfylt(skalNavnVærePreutfylt);
    }, [mottaker.verdi, land.verdi]);

    // Postnummer og poststed disables og skal sendes med som tom streng når landet ikke er Norge
    if (land.verdi !== 'NO' && postnummer.verdi !== '') {
        postnummer.nullstill();
    }

    if (land.verdi !== 'NO' && poststed.verdi !== '') {
        poststed.nullstill();
    }

    const verdierFraUseSkjema: BrevmottakerUseSkjema = useSkjema<ILeggTilFjernBrevmottakerSkjemaFelter, IBehandling>({
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
): Brevmottaker => {
    if (felter.mottaker.verdi !== '') {
        return {
            type: felter.mottaker.verdi,
            navn: felter.navn.verdi,
            adresselinje1: felter.adresselinje1.verdi,
            adresselinje2: felter.adresselinje2.verdi !== '' ? felter.adresselinje2.verdi : undefined,
            postnummer: felter.postnummer.verdi,
            poststed: felter.poststed.verdi,
            landkode: felter.land.verdi,
        };
    } else {
        throw new Error('Mottaker ikke satt');
    }
};
