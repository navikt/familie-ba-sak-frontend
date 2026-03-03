import { useEffect, useState } from 'react';
import { feil, ok, useFelt, useSkjema } from '@navikt/familie-skjema';
import { useBrukerContext } from '../../../../sider/Fagsak/BrukerContext';
export var Mottaker;
(function (Mottaker) {
    Mottaker["BRUKER_MED_UTENLANDSK_ADRESSE"] = "BRUKER_MED_UTENLANDSK_ADRESSE";
    Mottaker["FULLMEKTIG"] = "FULLMEKTIG";
    Mottaker["VERGE"] = "VERGE";
    Mottaker["D\u00D8DSBO"] = "D\u00D8DSBO";
})(Mottaker || (Mottaker = {}));
export const mottakerVisningsnavn = {
    BRUKER_MED_UTENLANDSK_ADRESSE: 'Bruker med utenlandsk adresse',
    FULLMEKTIG: 'Fullmektig',
    VERGE: 'Verge',
    DØDSBO: 'Dødsbo',
};
const preutfyltNavnFixed = (mottaker, land, navn) => {
    if (mottaker === Mottaker.DØDSBO) {
        return !land || land === 'NO' ? `${navn} v/dødsbo` : `Estate of ${navn}`;
    }
    return navn;
};
export const useBrevmottakerSkjema = ({ eksisterendeMottakere }) => {
    const { bruker: søker } = useBrukerContext();
    const mottaker = useFelt({
        verdi: '',
        avhengigheter: { eksisterendeMottakere },
        valideringsfunksjon: (felt, avhengigheter) => {
            const eksisterendeMottakere = avhengigheter === null || avhengigheter === void 0 ? void 0 : avhengigheter.eksisterendeMottakere;
            if (felt.verdi === '') {
                return feil(felt, 'Feltet er påkrevd');
            }
            if (eksisterendeMottakere.length) {
                const eksisterendeBrevmottakerType = eksisterendeMottakere[0].type;
                if (felt.verdi === eksisterendeBrevmottakerType) {
                    return feil(felt, `${mottakerVisningsnavn[felt.verdi]} er allerede lagt til`);
                }
                if (felt.verdi === Mottaker.DØDSBO || eksisterendeBrevmottakerType === Mottaker.DØDSBO) {
                    return feil(felt, 'Dødsbo kan ikke kombineres med andre brevmottakere');
                }
                if (felt.verdi === Mottaker.BRUKER_MED_UTENLANDSK_ADRESSE ||
                    eksisterendeBrevmottakerType === Mottaker.BRUKER_MED_UTENLANDSK_ADRESSE) {
                    return ok(felt);
                }
                return feil(felt, `${mottakerVisningsnavn[eksisterendeBrevmottakerType]} kan ikke kombineres med ${mottakerVisningsnavn[felt.verdi].toLowerCase()}.`);
            }
            return ok(felt);
        },
    });
    const navn = useFelt({
        verdi: '',
        valideringsfunksjon: felt => {
            if (felt.verdi === '') {
                return feil(felt, 'Navn på person eller organisasjon er påkrevd');
            }
            return felt.verdi.length <= 80 ? ok(felt) : feil(felt, 'Feltet kan ikke inneholde mer enn 80 tegn');
        },
    });
    const land = useFelt({
        verdi: '',
        valideringsfunksjon: (felt, avhengigheter) => {
            const norgeErUlovligValgt = (avhengigheter === null || avhengigheter === void 0 ? void 0 : avhengigheter.mottaker.verdi) === Mottaker.BRUKER_MED_UTENLANDSK_ADRESSE && felt.verdi === 'NO';
            if (norgeErUlovligValgt) {
                return feil(felt, 'Norge kan ikke være satt for bruker med utenlandsk adresse');
            }
            return felt.verdi !== ''
                ? ok(felt)
                : feil(felt, 'Feltet er påkrevd. Velg Norge dersom brevet skal sendes innenlands.');
        },
        avhengigheter: { mottaker },
    });
    const adresselinje1 = useFelt({
        verdi: '',
        valideringsfunksjon: felt => {
            if (felt.verdi === '') {
                return feil(felt, 'Feltet er påkrevd');
            }
            return felt.verdi.length <= 80 ? ok(felt) : feil(felt, 'Feltet kan ikke inneholde mer enn 80 tegn');
        },
    });
    const adresselinje2 = useFelt({
        verdi: '',
        valideringsfunksjon: felt => felt.verdi.length <= 80 ? ok(felt) : feil(felt, 'Feltet kan ikke inneholde mer enn 80 tegn'),
    });
    const postnummer = useFelt({
        verdi: '',
        valideringsfunksjon: (felt, avhengigheter) => {
            if ((avhengigheter === null || avhengigheter === void 0 ? void 0 : avhengigheter.land.verdi) !== 'NO' && felt.verdi === '') {
                return ok(felt);
            }
            else if (felt.verdi === '') {
                return feil(felt, 'Feltet er påkrevd');
            }
            //Sjekker at felter er 4 karakterer langt og er numerisk
            return /^\d{4}$/.test(felt.verdi) ? ok(felt) : feil(felt, 'Feltet må bestå av 4 siffer');
        },
        skalFeltetVises: (avhengigheter) => {
            return (avhengigheter === null || avhengigheter === void 0 ? void 0 : avhengigheter.land.verdi) === 'NO';
        },
        avhengigheter: { land },
    });
    const poststed = useFelt({
        verdi: '',
        valideringsfunksjon: (felt, avhengigheter) => {
            if ((avhengigheter === null || avhengigheter === void 0 ? void 0 : avhengigheter.land.verdi) !== 'NO' && felt.verdi === '') {
                return ok(felt);
            }
            else if (felt.verdi === '') {
                return feil(felt, 'Feltet er påkrevd');
            }
            return felt.verdi.length <= 50 ? ok(felt) : feil(felt, 'Feltet kan ikke inneholde mer enn 50 tegn');
        },
        skalFeltetVises: (avhengigheter) => {
            return (avhengigheter === null || avhengigheter === void 0 ? void 0 : avhengigheter.land.verdi) === 'NO';
        },
        avhengigheter: { land },
    });
    const [navnErPreutfylt, settNavnErPreutfylt] = useState(false);
    const skalNavnVærePreutfylt = mottaker.verdi === Mottaker.DØDSBO || mottaker.verdi === Mottaker.BRUKER_MED_UTENLANDSK_ADRESSE;
    useEffect(() => {
        if (skalNavnVærePreutfylt || skalNavnVærePreutfylt !== navnErPreutfylt) {
            navn.validerOgSettFelt(skalNavnVærePreutfylt && (søker === null || søker === void 0 ? void 0 : søker.navn) ? preutfyltNavnFixed(mottaker.verdi, land.verdi, søker.navn) : '');
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
    const verdierFraUseSkjema = useSkjema({
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
export const felterTilSkjemaBrevmottaker = (felter) => {
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
    }
    else {
        throw new Error('Mottaker ikke satt');
    }
};
