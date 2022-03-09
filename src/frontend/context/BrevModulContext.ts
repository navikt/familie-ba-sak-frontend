import React, { useEffect } from 'react';

import createUseContext from 'constate';

import {
    type Avhengigheter,
    feil,
    type FeltState,
    ok,
    useFelt,
    useSkjema,
    Valideringsstatus,
} from '@navikt/familie-skjema';
import { type Ressurs, RessursStatus } from '@navikt/familie-typer';

import type { ISelectOptionMedBrevtekst } from '../komponenter/Felleskomponenter/Hendelsesoversikt/BrevModul/typer';
import { Brevmal } from '../komponenter/Felleskomponenter/Hendelsesoversikt/BrevModul/typer';
import type { IBehandling } from '../typer/behandling';
import { Behandlingstype, BehandlingÅrsak } from '../typer/behandling';
import type { IManueltBrevRequestPåBehandling } from '../typer/dokument';
import type { IGrunnlagPerson } from '../typer/person';
import { PersonType } from '../typer/person';
import { Målform } from '../typer/søknad';
import { fjernWhitespace } from '../utils/commons';
import type { IFritekstFelt } from '../utils/fritekstfelter';
import { genererIdBasertPåAndreFritekster, lagInitiellFritekst } from '../utils/fritekstfelter';
import { useBehandling } from './behandlingContext/BehandlingContext';

export const hentMuligeBrevmalerImplementering = (
    åpenBehandling: Ressurs<IBehandling>
): Brevmal[] => {
    const brevMaler = [];
    if (åpenBehandling.status === RessursStatus.SUKSESS) {
        if (åpenBehandling.data.årsak === BehandlingÅrsak.SØKNAD) {
            brevMaler.push(Brevmal.INNHENTE_OPPLYSNINGER);
            brevMaler.push(Brevmal.SVARTIDSBREV);
        }

        if (
            åpenBehandling.data.type === Behandlingstype.REVURDERING &&
            åpenBehandling.data.årsak !== BehandlingÅrsak.SØKNAD
        ) {
            brevMaler.push(Brevmal.VARSEL_OM_REVURDERING);
        }
    }

    return brevMaler;
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
                avhengigheter.brevmal.verdi !== Brevmal.SVARTIDSBREV
            );
        },
        avhengigheter: { brevmal },
    });

    const multiselect = useFelt({
        verdi: [],
        valideringsfunksjon: (
            felt: FeltState<ISelectOptionMedBrevtekst[]>,
            avhengigheter?: Avhengigheter
        ) => {
            const brevmal: Brevmal | '' = avhengigheter?.brevmal.verdi;

            if (felt.verdi.length === 0 && avhengigheter?.fritekster.verdi.length === 0) {
                return feil(
                    felt,
                    `Du må velge minst ${
                        brevmal === Brevmal.INNHENTE_OPPLYSNINGER ? 'ett dokument' : 'en årsak'
                    }`
                );
            }

            const opprettedeVerdierMedFeil = felt.verdi.filter(
                (selectOptionMedBrevtekst: ISelectOptionMedBrevtekst) =>
                    !selectOptionMedBrevtekst.brevtekst &&
                    fjernWhitespace(selectOptionMedBrevtekst.value).length < 3
            );

            if (opprettedeVerdierMedFeil.length > 0) {
                return opprettedeVerdierMedFeil.length === 1
                    ? feil(
                          felt,
                          `Du må fjerne ${
                              brevmal === Brevmal.INNHENTE_OPPLYSNINGER ? 'dokumentet' : 'årsaken'
                          } som har mindre enn tre tegn`
                      )
                    : feil(
                          felt,
                          `Du må fjerne ${
                              brevmal === Brevmal.INNHENTE_OPPLYSNINGER ? 'dokumentene' : 'årsakene'
                          } som har mindre enn tre tegn`
                      );
            }

            return ok(felt);
        },
        skalFeltetVises: (avhengigheter: Avhengigheter) => {
            return (
                avhengigheter?.brevmal.valideringsstatus === Valideringsstatus.OK &&
                avhengigheter?.brevmal.verdi !== Brevmal.VARSEL_OM_REVURDERING &&
                avhengigheter?.brevmal.verdi !== Brevmal.SVARTIDSBREV
            );
        },
        avhengigheter: { brevmal, fritekster },
        nullstillVedAvhengighetEndring: false,
    });

    const { kanSendeSkjema, onSubmit, skjema } = useSkjema<
        {
            mottakerIdent: string;
            brevmal: Brevmal | '';
            multiselect: ISelectOptionMedBrevtekst[];
            fritekster: FeltState<IFritekstFelt>[];
        },
        IBehandling
    >({
        felter: {
            mottakerIdent,
            brevmal,
            multiselect,
            fritekster,
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
        skjema.felter.multiselect.nullstill();
    }, [åpenBehandling]);

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

    const hentSkjemaData = (): IManueltBrevRequestPåBehandling => ({
        mottakerIdent: skjema.felter.mottakerIdent.verdi,
        multiselectVerdier: [
            ...skjema.felter.multiselect.verdi.map((selectOption: ISelectOptionMedBrevtekst) => {
                if (selectOption.brevtekst) {
                    return selectOption.brevtekst[mottakersMålform()];
                } else {
                    return selectOption.value;
                }
            }),
            ...skjema.felter.fritekster.verdi.map(f => f.verdi.tekst),
        ],
        brevmal: skjema.felter.brevmal.verdi as Brevmal,
    });

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
    };
});

export { BrevModulProvider, useBrevModul };
