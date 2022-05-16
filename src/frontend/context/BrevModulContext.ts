import React, { useEffect } from 'react';

import createUseContext from 'constate';

import type { ISODateString } from '@navikt/familie-form-elements';
import type { Avhengigheter, FeltState } from '@navikt/familie-skjema';
import { feil, ok, useFelt, useSkjema, Valideringsstatus } from '@navikt/familie-skjema';
import type { Ressurs } from '@navikt/familie-typer';
import { RessursStatus } from '@navikt/familie-typer';

import type { ISelectOptionMedBrevtekst } from '../komponenter/Felleskomponenter/Hendelsesoversikt/BrevModul/typer';
import { Brevmal } from '../komponenter/Felleskomponenter/Hendelsesoversikt/BrevModul/typer';
import type { IBehandling } from '../typer/behandling';
import { Behandlingstype, BehandlingÅrsak } from '../typer/behandling';
import type { IManueltBrevRequestPåBehandling } from '../typer/dokument';
import type { IGrunnlagPerson } from '../typer/person';
import { PersonType } from '../typer/person';
import type { IBarnMedOpplysninger } from '../typer/søknad';
import { Målform } from '../typer/søknad';
import { useDeltBostedFelter } from '../utils/deltBostedSkjemaFelter';
import type { IFritekstFelt } from '../utils/fritekstfelter';
import { genererIdBasertPåAndreFritekster, lagInitiellFritekst } from '../utils/fritekstfelter';
import { erIsoStringGyldig } from '../utils/kalender';
import { useBehandling } from './behandlingContext/BehandlingContext';

export const hentMuligeBrevmalerImplementering = (
    åpenBehandling: Ressurs<IBehandling>
): Brevmal[] => {
    if (åpenBehandling.status !== RessursStatus.SUKSESS) {
        return [];
    }

    const brevmaler: Brevmal[] = Object.keys(Brevmal) as Brevmal[];
    return brevmaler.filter(brevmal => brevmalKanVelgesForBehandling(brevmal, åpenBehandling.data));
};

const brevmalKanVelgesForBehandling = (brevmal: Brevmal, åpenBehandling: IBehandling): boolean => {
    switch (brevmal) {
        case Brevmal.INNHENTE_OPPLYSNINGER:
            return åpenBehandling.årsak === BehandlingÅrsak.SØKNAD;
        case Brevmal.VARSEL_OM_REVURDERING:
            return (
                åpenBehandling.type === Behandlingstype.REVURDERING &&
                åpenBehandling.årsak !== BehandlingÅrsak.SØKNAD
            );
        case Brevmal.VARSEL_OM_REVURDERING_DELT_BOSTED_PARAGRAF_14:
            return (
                åpenBehandling.type === Behandlingstype.REVURDERING &&
                [
                    BehandlingÅrsak.NYE_OPPLYSNINGER,
                    BehandlingÅrsak.SØKNAD,
                    BehandlingÅrsak.ÅRLIG_KONTROLL,
                ].includes(åpenBehandling.årsak)
            );
        case Brevmal.VARSEL_OM_REVURDERING_SAMBOER:
            return åpenBehandling.type === Behandlingstype.REVURDERING;
        case Brevmal.SVARTIDSBREV:
            return åpenBehandling.årsak === BehandlingÅrsak.SØKNAD;
        case Brevmal.HENLEGGE_TRUKKET_SØKNAD:
            return false;
    }
};

export const mottakersMålformImplementering = (
    personer: IGrunnlagPerson[],
    skjemaValideringsStatus: Valideringsstatus,
    mottakerIdent: string | readonly string[] | number
) =>
    personer.find((person: IGrunnlagPerson) => {
        if (skjemaValideringsStatus === Valideringsstatus.OK) {
            return person.personIdent === mottakerIdent;
        } else {
            return person.type === PersonType.SØKER;
        }
    })?.målform ?? Målform.NB;

const [BrevModulProvider, useBrevModul] = createUseContext(() => {
    const { åpenBehandling } = useBehandling();

    const maksAntallKulepunkter = 20;
    const makslengdeFritekst = 220;

    const mottakerIdent = useFelt({
        verdi: '',
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
                return feil(felt, `Du må velge minst ett dokument`);
            }

            return ok(felt);
        },
        skalFeltetVises: (avhengigheter: Avhengigheter) => {
            return (
                avhengigheter?.brevmal.valideringsstatus === Valideringsstatus.OK &&
                [Brevmal.INNHENTE_OPPLYSNINGER].includes(avhengigheter?.brevmal.verdi)
            );
        },
        avhengigheter: { brevmal, fritekster },
        nullstillVedAvhengighetEndring: false,
    });

    const {
        barnaMedOpplysninger,
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
            barnaMedOpplysninger: IBarnMedOpplysninger[];
            avtalerOmDeltBostedPerBarn: Record<string, ISODateString[]>;
            datoAvtale: ISODateString | undefined;
        },
        IBehandling
    >({
        felter: {
            mottakerIdent,
            brevmal,
            dokumenter,
            fritekster,
            barnaMedOpplysninger,
            avtalerOmDeltBostedPerBarn,
            datoAvtale: datoAvtale,
        },
        skjemanavn: 'brevmodul',
    });

    const [navigerTilOpplysningsplikt, settNavigerTilOpplysningsplikt] =
        React.useState<boolean>(false);

    /**
     * Nullstill enkelte felter i skjemaet ved oppdatering av åpenbehandling i staten.
     * Dette fordi at man kan ha gjort endring på målform
     */
    useEffect(() => {
        skjema.felter.dokumenter.nullstill();
        nullstillDeltBosted();
    }, [åpenBehandling]);

    useEffect(() => {
        nullstillDeltBosted();
    }, [skjema.felter.brevmal.verdi]);

    const personer =
        åpenBehandling.status === RessursStatus.SUKSESS ? åpenBehandling.data.personer : [];

    const mottakersMålform = (): Målform =>
        mottakersMålformImplementering(
            personer,
            skjema.felter.mottakerIdent.valideringsstatus,
            skjema.felter.mottakerIdent.verdi
        );

    const hentMuligeBrevMaler = (): Brevmal[] => hentMuligeBrevmalerImplementering(åpenBehandling);

    const leggTilFritekst = () => {
        skjema.felter.fritekster.validerOgSettFelt([
            ...skjema.felter.fritekster.verdi,
            lagInitiellFritekst('', genererIdBasertPåAndreFritekster(fritekster)),
        ]);
    };

    /**
     * Legger til initielt fritekstpunkt hvis brevmal er "Varsel om revurdering"
     */
    useEffect(() => {
        if (fritekster.verdi.length === 0 && brevmal.verdi === Brevmal.VARSEL_OM_REVURDERING) {
            leggTilFritekst();
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

            return {
                mottakerIdent: skjema.felter.mottakerIdent.verdi,
                multiselectVerdier: multiselectVerdier,
                brevmal: skjema.felter.brevmal.verdi as Brevmal,
                barnIBrev: [],
                datoAvtale: skjema.felter.datoAvtale.verdi,
            };
        }
    };

    const hentVarselOmRevurderingDeltBostedSkjemaData = (): IManueltBrevRequestPåBehandling => {
        const barnIBrev = skjema.felter.barnaMedOpplysninger.verdi.filter(barn => barn.merket);

        return {
            mottakerIdent: skjema.felter.mottakerIdent.verdi,
            multiselectVerdier: barnIBrev.flatMap(hentDeltBostedMulitiselectVerdierForBarn),
            barnIBrev: barnIBrev.map(barn => barn.ident),
            brevmal: Brevmal.VARSEL_OM_REVURDERING_DELT_BOSTED_PARAGRAF_14,
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
    };
});

export { BrevModulProvider, useBrevModul };
