import React, { useEffect } from 'react';

import createUseContext from 'constate';

import { RessursStatus } from '@navikt/familie-typer';

import { useFelt } from '../familie-skjema/felt';
import { useSkjema } from '../familie-skjema/skjema';
import { FeltState, FeltContext, Valideringsstatus } from '../familie-skjema/typer';
import { feil, ok } from '../familie-skjema/validators';
import {
    Brevmal,
    IBrevData,
    ISelectOptionMedBrevtekst,
} from '../komponenter/Felleskomponenter/Hendelsesoversikt/BrevModul/typer';
import { Behandlingstype, BehandlingÅrsak } from '../typer/behandling';
import { IFagsak } from '../typer/fagsak';
import { IGrunnlagPerson, PersonType } from '../typer/person';
import { Målform } from '../typer/søknad';
import { fjernWhitespace } from '../utils/commons';
import { useBehandling } from './BehandlingContext';

const [BrevModulProvider, useBrevModul] = createUseContext(() => {
    const { åpenBehandling } = useBehandling();

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

    const multiselect = useFelt({
        verdi: [],
        valideringsfunksjon: (
            felt: FeltState<ISelectOptionMedBrevtekst[]>,
            avhengigheter?: FeltContext
        ) => {
            const brevmal: Brevmal | '' = avhengigheter?.brevmal.verdi;

            if (felt.verdi.length === 0) {
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
        skalFeltetVises: (avhengigheter: FeltContext) => {
            return avhengigheter?.brevmal.valideringsstatus === Valideringsstatus.OK;
        },
        avhengigheter: { brevmal },
    });

    const { kanSendeSkjema, onSubmit, skjema } = useSkjema<
        {
            mottakerIdent: string;
            brevmal: Brevmal | '';
            multiselect: ISelectOptionMedBrevtekst[];
        },
        IFagsak
    >({
        felter: {
            mottakerIdent,
            brevmal,
            multiselect,
        },
        skjemanavn: 'brevmodul',
    });

    const [navigerTilOpplysningsplikt, settNavigerTilOpplysningsplikt] = React.useState<boolean>(
        false
    );

    /**
     * Nullstill enkelte felter i skjemaet ved oppdatering av åpenbehandling i staten.
     * Dette fordi at man kan ha gjort endring på målform
     */
    useEffect(() => {
        skjema.felter.multiselect.nullstill();
    }, [åpenBehandling]);

    const personer =
        åpenBehandling.status === RessursStatus.SUKSESS ? åpenBehandling.data.personer : [];

    const mottakersMålform = () =>
        personer.find((person: IGrunnlagPerson) => {
            if (skjema.felter.mottakerIdent.valideringsstatus === Valideringsstatus.OK) {
                return person.personIdent === skjema.felter.mottakerIdent.verdi;
            } else {
                return person.type === PersonType.SØKER;
            }
        })?.målform ?? Målform.NB;

    const hentMuligeBrevMaler = () => {
        const brevMaler = [];
        if (åpenBehandling.status === RessursStatus.SUKSESS) {
            if (åpenBehandling.data.årsak === BehandlingÅrsak.SØKNAD) {
                brevMaler.push(Brevmal.INNHENTE_OPPLYSNINGER);
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

    const hentSkjemaData = (): IBrevData => ({
        mottakerIdent: skjema.felter.mottakerIdent.verdi,
        multiselectVerdier: skjema.felter.multiselect.verdi.map(
            (selectOption: ISelectOptionMedBrevtekst) => {
                if (selectOption.brevtekst) {
                    return selectOption.brevtekst[mottakersMålform()];
                } else {
                    return selectOption.value;
                }
            }
        ),
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
    };
});

export { BrevModulProvider, useBrevModul };
