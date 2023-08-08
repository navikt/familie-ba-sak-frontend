import React, { useEffect } from 'react';

import createUseContext from 'constate';

import type { ISODateString } from '@navikt/familie-datovelger';
import type { Avhengigheter, FeltState } from '@navikt/familie-skjema';
import { feil, ok, useFelt, useSkjema, Valideringsstatus } from '@navikt/familie-skjema';
import { hentDataFraRessurs } from '@navikt/familie-typer';

import type { ISelectOptionMedBrevtekst } from '../komponenter/Felleskomponenter/Hendelsesoversikt/BrevModul/typer';
import { Brevmal } from '../komponenter/Felleskomponenter/Hendelsesoversikt/BrevModul/typer';
import type { IBehandling } from '../typer/behandling';
import { BehandlingKategori } from '../typer/behandlingstema';
import type { IManueltBrevRequestPåBehandling } from '../typer/dokument';
import { FagsakType } from '../typer/fagsak';
import type { IGrunnlagPerson } from '../typer/person';
import { PersonType } from '../typer/person';
import type { IBarnMedOpplysninger } from '../typer/søknad';
import type { Målform } from '../typer/søknad';
import {
    hentMuligeBrevmalerImplementering,
    mottakersMålformImplementering,
} from '../utils/brevmal';
import { useDeltBostedFelter } from '../utils/deltBostedSkjemaFelter';
import type { IFritekstFelt } from '../utils/fritekstfelter';
import { genererIdBasertPåAndreFritekster, lagInitiellFritekst } from '../utils/fritekstfelter';
import { erIsoStringGyldig } from '../utils/kalender';
import { useBehandling } from './behandlingContext/BehandlingContext';
import { useFagsakContext } from './fagsak/FagsakContext';

const [BrevModulProvider, useBrevModul] = createUseContext(() => {
    const { åpenBehandling: åpenBehandlingRessurs } = useBehandling();
    const { minimalFagsak: minimalFagsakRessurs } = useFagsakContext();

    const maksAntallKulepunkter = 20;
    const makslengdeFritekst = 220;

    const åpenBehandling = hentDataFraRessurs(åpenBehandlingRessurs);
    const minimalFagsak = hentDataFraRessurs(minimalFagsakRessurs);

    const behandlingKategori = åpenBehandling?.kategori;

    const personer = åpenBehandling?.personer ?? [];
    const brevmottakere = åpenBehandling?.brevmottakere ?? [];
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

    const fritekster = useFelt<FeltState<IFritekstFelt>[]>({
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

    const datoAvtale = useFelt<ISODateString | undefined>({
        verdi: '',
        valideringsfunksjon: (felt: FeltState<string | undefined>) =>
            felt.verdi && erIsoStringGyldig(felt.verdi)
                ? ok(felt)
                : feil(felt, 'Du må velge en gyldig dato.'),
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
            if (felt.verdi.length === 0 && avhengigheter?.fritekster.verdi.length === 0) {
                return feil(
                    felt,
                    'Brevmalen krever at du enten velger dokumenter fra listen over, eller legger til et kulepunkt med fritekst'
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
                    Brevmal.VARSEL_OM_ÅRLIG_REVURDERING_EØS_MED_INNHENTING_AV_OPPLYSNINGER,
                ].includes(avhengigheter?.brevmal.verdi)
            );
        },
        avhengigheter: { brevmal, fritekster },
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
                Brevmal.VARSEL_OM_VEDTAK_ETTER_SØKNAD_I_SED,
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
            fritekster: FeltState<IFritekstFelt>[];
            barnMedDeltBosted: IBarnMedOpplysninger[];
            barnBrevetGjelder: IBarnMedOpplysninger[];
            avtalerOmDeltBostedPerBarn: Record<string, ISODateString[]>;
            datoAvtale: ISODateString | undefined;
            antallUkerSvarfrist: number | '';
            mottakerlandSed: string[];
        },
        IBehandling
    >({
        felter: {
            mottakerIdent,
            brevmal,
            dokumenter,
            fritekster,
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
    }, [åpenBehandling]);

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
        hentMuligeBrevmalerImplementering(åpenBehandlingRessurs, !!institusjon);

    const leggTilFritekst = (valideringsmelding?: string) => {
        skjema.felter.fritekster.validerOgSettFelt([
            ...skjema.felter.fritekster.verdi,
            lagInitiellFritekst(
                '',
                genererIdBasertPåAndreFritekster(fritekster),
                valideringsmelding
            ),
        ]);
    };

    const erBrevmalMedObligatoriskFritekst = (brevmal: Brevmal) =>
        [
            Brevmal.VARSEL_OM_REVURDERING,
            Brevmal.VARSEL_OM_REVURDERING_INSTITUSJON,
            Brevmal.VARSEL_OM_REVURDERING_FRA_NASJONAL_TIL_EØS,
            Brevmal.VARSEL_OM_VEDTAK_ETTER_SØKNAD_I_SED,
            Brevmal.FORLENGET_SVARTIDSBREV,
            Brevmal.FORLENGET_SVARTIDSBREV_INSTITUSJON,
        ].includes(brevmal);

    /**
     * Legger til initielt fritekstpunkt for brevmaler med obligatorisk fritekst
     */
    useEffect(() => {
        if (
            fritekster.verdi.length === 0 &&
            erBrevmalMedObligatoriskFritekst(brevmal.verdi as Brevmal)
        ) {
            const valideringsmelding =
                'Dette kulepunktet er obligatorisk. Du må skrive tekst i feltet.';
            leggTilFritekst(valideringsmelding);
        }
    }, [brevmal, fritekster]);

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
                ...skjema.felter.fritekster.verdi.map(f => f.verdi.tekst),
            ];

            const barnBrevetGjelder = skjema.felter.barnBrevetGjelder.verdi.filter(
                barn => barn.merket
            );

            return {
                mottakerIdent: skjema.felter.mottakerIdent.verdi,
                multiselectVerdier: multiselectVerdier,
                brevmal: skjema.felter.brevmal.verdi as Brevmal,
                barnIBrev: [],
                barnasFødselsdager: barnBrevetGjelder.map(barn => barn.fødselsdato || ''),
                datoAvtale: skjema.felter.datoAvtale.verdi,
                behandlingKategori,
                antallUkerSvarfrist: Number(skjema.felter.antallUkerSvarfrist.verdi),
                mottakerMålform: mottakersMålform(),
                mottakerNavn:
                    mottakerIdent.verdi === institusjon?.orgNummer
                        ? institusjon.navn
                        : personer.find(person => person.personIdent === mottakerIdent.verdi)?.navn,
                mottakerlandSed: mottakerlandSed.verdi,
            };
        }
    };

    const hentVarselOmRevurderingDeltBostedSkjemaData = (): IManueltBrevRequestPåBehandling => {
        const merkedeBarn = skjema.felter.barnMedDeltBosted.verdi.filter(barn => barn.merket);

        return {
            mottakerIdent: skjema.felter.mottakerIdent.verdi,
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
        leggTilFritekst,
        makslengdeFritekst,
        maksAntallKulepunkter,
        settVisfeilmeldinger,
        erBrevmalMedObligatoriskFritekst,
        institusjon,
        brevmottakere,
        fagsakType,
    };
});

export { BrevModulProvider, useBrevModul };
