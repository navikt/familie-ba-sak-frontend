import React, { useEffect } from 'react';

import createUseContext from 'constate';

import type { Avhengigheter, FeltState } from '@navikt/familie-skjema';
import { feil, ok, useFelt, useSkjema, Valideringsstatus } from '@navikt/familie-skjema';
import { hentDataFraRessurs } from '@navikt/familie-typer';

import { useBehandling } from './behandlingContext/BehandlingContext';
import { useFagsakContext } from './Fagsak/FagsakContext';
import type { ISelectOptionMedBrevtekst } from '../komponenter/Felleskomponenter/Hendelsesoversikt/BrevModul/typer';
import { Brevmal } from '../komponenter/Felleskomponenter/Hendelsesoversikt/BrevModul/typer';
import type { IBehandling } from '../typer/behandling';
import { BehandlingKategori } from '../typer/behandlingstema';
import type { IManueltBrevRequestPåBehandling } from '../typer/dokument';
import { FagsakType } from '../typer/fagsak';
import type { IGrunnlagPerson } from '../typer/person';
import { PersonType } from '../typer/person';
import type { IBarnMedOpplysninger, Målform } from '../typer/søknad';
import {
    hentMuligeBrevmalerImplementering,
    mottakersMålformImplementering,
} from '../utils/brevmal';
import type { IsoDatoString } from '../utils/dato';
import { dateTilIsoDatoStringEllerUndefined, validerGyldigDato } from '../utils/dato';
import { useDeltBostedFelter } from '../utils/deltBostedSkjemaFelter';
import type { IFritekstFelt } from '../utils/fritekstfelter';
import {
    genererIdBasertPåAndreFritekstKulepunkter,
    lagInitiellFritekst,
} from '../utils/fritekstfelter';

const [BrevModulProvider, useBrevModul] = createUseContext(() => {
    const { behandling } = useBehandling();
    const { minimalFagsak: minimalFagsakRessurs } = useFagsakContext();

    const maksAntallKulepunkter = 20;
    const makslengdeFritekstHvertKulepunkt = 220;
    const maksLengdeFritekstAvsnitt = 1000;

    const [visFritekstAvsnittTekstboks, settVisFritekstAvsnittTekstboks] = React.useState(false);

    const minimalFagsak = hentDataFraRessurs(minimalFagsakRessurs);

    const behandlingKategori = behandling?.kategori;

    const personer = behandling?.personer ?? [];
    const brevmottakere = behandling?.brevmottakere ?? [];
    const institusjon = minimalFagsak?.institusjon;
    const fagsakType = minimalFagsak?.fagsakType;

    const velgMottaker = (): string | undefined => {
        if (minimalFagsak?.fagsakType === FagsakType.INSTITUSJON && institusjon) {
            return institusjon.orgNummer;
        }
        if (minimalFagsak?.fagsakType === FagsakType.BARN_ENSLIG_MINDREÅRIG) {
            return personer[0].personIdent;
        }
        return personer.find(person => person.type === PersonType.SØKER)?.personIdent;
    };

    const mottakerIdent = useFelt({
        verdi: velgMottaker() || '',
        valideringsfunksjon: (felt: FeltState<string>) =>
            felt.verdi.length >= 1 ? ok(felt) : feil(felt, 'Du må velge en mottaker'),
    });
    const brevmal = useFelt({
        verdi: '',
        valideringsfunksjon: (felt: FeltState<Brevmal | ''>) =>
            felt.verdi ? ok(felt) : feil(felt, 'Du må velge en brevmal'),
    });

    const fritekstKulepunkter = useFelt<FeltState<IFritekstFelt>[]>({
        verdi: [],
        valideringsfunksjon: (felt: FeltState<FeltState<IFritekstFelt>[]>) => {
            return felt.verdi.some(
                fritekst =>
                    fritekst.valideringsstatus === Valideringsstatus.FEIL ||
                    fritekst.verdi.tekst.length === 0
            )
                ? feil(felt, '')
                : ok(felt);
        },
        skalFeltetVises: (avhengigheter: Avhengigheter) => {
            return (
                avhengigheter?.brevmal.valideringsstatus === Valideringsstatus.OK &&
                ![
                    Brevmal.SVARTIDSBREV,
                    Brevmal.VARSEL_OM_REVURDERING_DELT_BOSTED_PARAGRAF_14,
                    Brevmal.VARSEL_OM_REVURDERING_SAMBOER,
                    Brevmal.SVARTIDSBREV_INSTITUSJON,
                    Brevmal.VARSEL_OM_ÅRLIG_REVURDERING_EØS,
                ].includes(avhengigheter.brevmal.verdi)
            );
        },
        avhengigheter: { brevmal },
    });

    const fritekstAvsnitt = useFelt<string | undefined>({
        verdi: undefined,
        valideringsfunksjon: fritekst => {
            if (fritekst.verdi === undefined) {
                return ok(fritekst);
            }

            if (fritekst.verdi.trim() === '') {
                return feil(
                    fritekst,
                    'Du må skrive tekst i feltet, eller fjerne det om du ikke skal ha fritekst.'
                );
            }

            if (fritekst.verdi.length > maksLengdeFritekstAvsnitt) {
                return feil(fritekst, `Du har nådd maks antall tegn: ${maksLengdeFritekstAvsnitt}`);
            }

            return ok(fritekst);
        },
        skalFeltetVises: (avhengigheter: Avhengigheter) => {
            return (
                avhengigheter?.brevmal.valideringsstatus === Valideringsstatus.OK &&
                [
                    Brevmal.INNHENTE_OPPLYSNINGER_ETTER_SØKNAD_I_SED,
                    Brevmal.INNHENTE_OPPLYSNINGER,
                    Brevmal.INNHENTE_OPPLYSNINGER_INSTITUSJON,
                ].includes(avhengigheter.brevmal.verdi)
            );
        },
        avhengigheter: { brevmal },
    });

    const antallUkerSvarfrist = useFelt({
        verdi: behandlingKategori === BehandlingKategori.EØS ? 8 : 3,
        valideringsfunksjon: (felt: FeltState<number | ''>) => {
            if (felt.verdi === '') return feil(felt, 'Antall uker svarfrist er ikke satt');

            if (isNaN(felt.verdi) || felt.verdi < 1) {
                return feil(felt, 'Antall uker svarfrist må være et positivt tall');
            }

            // Maksimal saksbehandlingstid er 5 måneder. Svarfristen må derfor være mindre enn dette.
            const maksSvarfristUker = 4 * 5;
            if (felt.verdi > maksSvarfristUker) {
                return feil(
                    felt,
                    `Du kan ikke sette antall uker svartid til mer enn ${maksSvarfristUker} uker (5 måneder)`
                );
            }

            return ok(felt);
        },
        skalFeltetVises: (avhengigheter: Avhengigheter) => {
            return (
                avhengigheter?.brevmal.valideringsstatus === Valideringsstatus.OK &&
                [
                    Brevmal.FORLENGET_SVARTIDSBREV,
                    Brevmal.FORLENGET_SVARTIDSBREV_INSTITUSJON,
                ].includes(avhengigheter.brevmal.verdi)
            );
        },
        avhengigheter: { brevmal },
    });

    const datoAvtale = useFelt<Date | undefined>({
        verdi: undefined,
        valideringsfunksjon: validerGyldigDato,
        skalFeltetVises: avhengigheter => {
            return (
                avhengigheter?.brevmal.valideringsstatus === Valideringsstatus.OK &&
                avhengigheter.brevmal.verdi === Brevmal.VARSEL_OM_REVURDERING_SAMBOER
            );
        },
        avhengigheter: { brevmal },
    });

    const dokumenter = useFelt({
        verdi: [],
        valideringsfunksjon: (
            felt: FeltState<ISelectOptionMedBrevtekst[]>,
            avhengigheter?: Avhengigheter
        ) => {
            if (
                felt.verdi.length === 0 &&
                avhengigheter?.fritekstKulepunkter.verdi.length === 0 &&
                avhengigheter?.fritekstAvsnitt.verdi === undefined
            ) {
                return feil(
                    felt,
                    'Brevmalen krever at du enten velger dokumenter fra listen over, eller legger til et kulepunkt eller avsnitt med fritekst'
                );
            }

            return ok(felt);
        },
        skalFeltetVises: (avhengigheter: Avhengigheter) => {
            return (
                avhengigheter?.brevmal.valideringsstatus === Valideringsstatus.OK &&
                [
                    Brevmal.INNHENTE_OPPLYSNINGER,
                    Brevmal.INNHENTE_OPPLYSNINGER_ETTER_SØKNAD_I_SED,
                    Brevmal.INNHENTE_OPPLYSNINGER_INSTITUSJON,
                    Brevmal.INNHENTE_OPPLYSNINGER_OG_INFORMASJON_OM_AT_ANNEN_FORELDER_MED_SELVSTENDIG_RETT_HAR_SØKT,
                    Brevmal.VARSEL_OM_ÅRLIG_REVURDERING_EØS_MED_INNHENTING_AV_OPPLYSNINGER,
                ].includes(avhengigheter?.brevmal.verdi)
            );
        },
        avhengigheter: { brevmal, fritekstKulepunkter, fritekstAvsnitt },
        nullstillVedAvhengighetEndring: false,
    });

    const barnBrevetGjelder = useFelt<IBarnMedOpplysninger[]>({
        verdi: [],
        valideringsfunksjon: (felt: FeltState<IBarnMedOpplysninger[]>) => {
            return felt.verdi.some((barn: IBarnMedOpplysninger) => barn.merket)
                ? ok(felt)
                : feil(felt, 'Du må velge hvilke barn brevet gjelder');
        },
        skalFeltetVises: (avhengigheter: Avhengigheter) => {
            return [
                Brevmal.INNHENTE_OPPLYSNINGER_ETTER_SØKNAD_I_SED,
                Brevmal.INNHENTE_OPPLYSNINGER_OG_INFORMASJON_OM_AT_ANNEN_FORELDER_MED_SELVSTENDIG_RETT_HAR_SØKT,
                Brevmal.VARSEL_OM_VEDTAK_ETTER_SØKNAD_I_SED,
                Brevmal.VARSEL_ANNEN_FORELDER_MED_SELVSTENDIG_RETT_SØKT,
            ].includes(avhengigheter?.brevmal.verdi);
        },
        avhengigheter: { brevmal },
        nullstillVedAvhengighetEndring: false,
    });

    const mottakerlandSed = useFelt<string[]>({
        verdi: [],
        valideringsfunksjon: (felt: FeltState<string[]>) => {
            return felt.verdi.length
                ? ok(felt)
                : feil(felt, 'Velg land SED er sendt/skal sendes til');
        },
        skalFeltetVises: (avhengigheter: Avhengigheter) => {
            return [
                Brevmal.VARSEL_OM_ÅRLIG_REVURDERING_EØS,
                Brevmal.VARSEL_OM_ÅRLIG_REVURDERING_EØS_MED_INNHENTING_AV_OPPLYSNINGER,
            ].includes(avhengigheter?.brevmal.verdi);
        },
        avhengigheter: { brevmal },
    });

    const {
        barnMedDeltBosted,
        avtalerOmDeltBostedPerBarn,
        nullstillDeltBosted,
        hentDeltBostedMulitiselectVerdierForBarn,
    } = useDeltBostedFelter({
        avhengigheter: { brevmal: brevmal },
        skalFeltetVises: avhengigheter =>
            avhengigheter.brevmal.verdi === Brevmal.VARSEL_OM_REVURDERING_DELT_BOSTED_PARAGRAF_14,
    });

    const { kanSendeSkjema, onSubmit, skjema, settVisfeilmeldinger } = useSkjema<
        {
            mottakerIdent: string;
            brevmal: Brevmal | '';
            dokumenter: ISelectOptionMedBrevtekst[];
            fritekstKulepunkter: FeltState<IFritekstFelt>[];
            fritekstAvsnitt: string | undefined;
            barnMedDeltBosted: IBarnMedOpplysninger[];
            barnBrevetGjelder: IBarnMedOpplysninger[];
            avtalerOmDeltBostedPerBarn: Record<string, IsoDatoString[]>;
            datoAvtale: Date | undefined;
            antallUkerSvarfrist: number | '';
            mottakerlandSed: string[];
        },
        IBehandling
    >({
        felter: {
            mottakerIdent,
            brevmal,
            dokumenter,
            fritekstKulepunkter,
            fritekstAvsnitt,
            barnMedDeltBosted,
            barnBrevetGjelder,
            avtalerOmDeltBostedPerBarn,
            datoAvtale,
            antallUkerSvarfrist,
            mottakerlandSed,
        },
        skjemanavn: 'brevmodul',
    });

    const [navigerTilOpplysningsplikt, settNavigerTilOpplysningsplikt] =
        React.useState<boolean>(false);

    const nullstillBarnBrevetGjelder = () => {
        const barn = personer
            .filter(person => person.type === PersonType.BARN)
            .map(
                (person: IGrunnlagPerson): IBarnMedOpplysninger => ({
                    ident: person.personIdent,
                    fødselsdato: person.fødselsdato,
                    navn: person.navn,
                    merket: false,
                    manueltRegistrert: false,
                    erFolkeregistrert: true,
                })
            );
        skjema.felter.barnBrevetGjelder.validerOgSettFelt(barn);
    };

    /**
     * Nullstill enkelte felter i skjemaet ved oppdatering av åpenbehandling i staten.
     * Dette fordi at man kan ha gjort endring på målform
     */
    useEffect(() => {
        skjema.felter.dokumenter.nullstill();
        nullstillDeltBosted();
        nullstillBarnBrevetGjelder();
    }, [behandling]);

    useEffect(() => {
        nullstillDeltBosted();
        skjema.felter.mottakerlandSed.nullstill();
        nullstillBarnBrevetGjelder();
    }, [skjema.felter.brevmal.verdi]);

    const mottakersMålform = (): Målform =>
        mottakersMålformImplementering(
            personer,
            skjema.felter.mottakerIdent.valideringsstatus,
            skjema.felter.mottakerIdent.verdi
        );

    const hentMuligeBrevMaler = (): Brevmal[] =>
        hentMuligeBrevmalerImplementering(behandling, !!institusjon);

    const leggTilFritekstKulepunkt = (valideringsmelding?: string) => {
        skjema.felter.fritekstKulepunkter.validerOgSettFelt([
            ...skjema.felter.fritekstKulepunkter.verdi,
            lagInitiellFritekst(
                '',
                genererIdBasertPåAndreFritekstKulepunkter(fritekstKulepunkter),
                makslengdeFritekstHvertKulepunkt,
                valideringsmelding
            ),
        ]);
    };

    const erBrevmalMedObligatoriskFritekstKulepunkt = (brevmal: Brevmal) =>
        [
            Brevmal.VARSEL_OM_REVURDERING,
            Brevmal.VARSEL_OM_REVURDERING_INSTITUSJON,
            Brevmal.VARSEL_OM_REVURDERING_FRA_NASJONAL_TIL_EØS,
            Brevmal.VARSEL_OM_VEDTAK_ETTER_SØKNAD_I_SED,
            Brevmal.FORLENGET_SVARTIDSBREV,
            Brevmal.FORLENGET_SVARTIDSBREV_INSTITUSJON,
            Brevmal.VARSEL_ANNEN_FORELDER_MED_SELVSTENDIG_RETT_SØKT,
        ].includes(brevmal);

    /**
     * Legger til initielt fritekstpunkt for brevmaler med obligatorisk fritekst
     */
    useEffect(() => {
        if (
            fritekstKulepunkter.verdi.length === 0 &&
            erBrevmalMedObligatoriskFritekstKulepunkt(brevmal.verdi as Brevmal)
        ) {
            const valideringsmelding =
                'Dette kulepunktet er obligatorisk. Du må skrive tekst i feltet.';
            leggTilFritekstKulepunkt(valideringsmelding);
        }
    }, [brevmal, fritekstKulepunkter]);

    const hentSkjemaData = (): IManueltBrevRequestPåBehandling => {
        const erVarselOmRevurderingDeltBosted =
            skjema.felter.brevmal.verdi === Brevmal.VARSEL_OM_REVURDERING_DELT_BOSTED_PARAGRAF_14;

        if (erVarselOmRevurderingDeltBosted) {
            return hentVarselOmRevurderingDeltBostedSkjemaData();
        } else {
            const multiselectVerdier = [
                ...skjema.felter.dokumenter.verdi.map((selectOption: ISelectOptionMedBrevtekst) => {
                    if (selectOption.brevtekst) {
                        return selectOption.brevtekst[mottakersMålform()];
                    } else {
                        return selectOption.value;
                    }
                }),
                ...skjema.felter.fritekstKulepunkter.verdi.map(f => f.verdi.tekst),
            ];

            const barnBrevetGjelder = skjema.felter.barnBrevetGjelder.verdi.filter(
                barn => barn.merket
            );

            return {
                multiselectVerdier: multiselectVerdier,
                brevmal: skjema.felter.brevmal.verdi as Brevmal,
                barnIBrev: [],
                barnasFødselsdager: barnBrevetGjelder.map(barn => barn.fødselsdato || ''),
                datoAvtale: dateTilIsoDatoStringEllerUndefined(skjema.felter.datoAvtale.verdi),
                behandlingKategori,
                antallUkerSvarfrist: Number(skjema.felter.antallUkerSvarfrist.verdi),
                mottakerMålform: mottakersMålform(),
                mottakerlandSed: mottakerlandSed.verdi,
                fritekstAvsnitt: skjema.felter.fritekstAvsnitt.verdi,
            };
        }
    };

    const hentVarselOmRevurderingDeltBostedSkjemaData = (): IManueltBrevRequestPåBehandling => {
        const merkedeBarn = skjema.felter.barnMedDeltBosted.verdi.filter(barn => barn.merket);

        return {
            multiselectVerdier: merkedeBarn.flatMap(hentDeltBostedMulitiselectVerdierForBarn),
            barnIBrev: merkedeBarn.map(barn => barn.ident),
            brevmal: Brevmal.VARSEL_OM_REVURDERING_DELT_BOSTED_PARAGRAF_14,
            behandlingKategori,
            antallUkerSvarfrist: Number(skjema.felter.antallUkerSvarfrist.verdi),
        };
    };

    return {
        skjema,
        hentMuligeBrevMaler,
        hentSkjemaData,
        kanSendeSkjema,
        mottakersMålform,
        navigerTilOpplysningsplikt,
        onSubmit,
        personer,
        settNavigerTilOpplysningsplikt,
        leggTilFritekstKulepunkt,
        makslengdeFritekstHvertKulepunkt,
        maksLengdeFritekstAvsnitt,
        maksAntallKulepunkter,
        settVisfeilmeldinger,
        erBrevmalMedObligatoriskFritekstKulepunkt,
        institusjon,
        brevmottakere,
        fagsakType,
        visFritekstAvsnittTekstboks,
        settVisFritekstAvsnittTekstboks,
    };
});

export { BrevModulProvider, useBrevModul };
