import createUseContext from 'constate';
import React, { useEffect } from 'react';

import { Behandlingstype, BehandlingÅrsak, hentStegNummer } from '../typer/behandling';
import { RessursStatus } from '@navikt/familie-typer';
import { useBehandling } from './BehandlingContext';
import { IFagsak } from '../typer/fagsak';
import {
    Brevmal,
    IBrevData,
    ISelectOptionMedBrevtekst,
} from '../komponenter/Felleskomponenter/Hendelsesoversikt/BrevModul/typer';
import { useSkjema } from '../familie-skjema/skjema';
import { fjernWhitespace } from '../utils/commons';
import { IGrunnlagPerson } from '../typer/person';
import { Målform } from '../typer/søknad';
import { useFelt } from '../familie-skjema/felt';
import { FeltState, FeltContext, Valideringsstatus } from '../familie-skjema/typer';
import { feil, ok } from '../familie-skjema/validators';

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

            return felt.verdi.length > 0
                ? ok(felt)
                : feil(
                      felt,
                      `Du må velge minst ${
                          brevmal === Brevmal.INNHENTE_OPPLYSNINGER ? 'ett dokument' : 'en årsak'
                      }`
                  );
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
            fritekst: string;
        },
        IFagsak
    >({
        felter: {
            mottakerIdent,
            brevmal,
            multiselect,
            fritekst: useFelt({
                verdi: '',
                valideringsfunksjon: (felt: FeltState<string>, avhengigheter?: FeltContext) => {
                    const brevmal: Brevmal | '' = avhengigheter?.brevmal.verdi;
                    const multiselect: ISelectOptionMedBrevtekst[] | undefined =
                        avhengigheter?.multiselect.verdi;

                    const annetErValgt =
                        (
                            multiselect?.filter(
                                (selectOption: ISelectOptionMedBrevtekst) =>
                                    selectOption.value === 'annet'
                            ) ?? []
                        ).length > 0;

                    if (annetErValgt) {
                        return fjernWhitespace(felt.verdi).length >= 3
                            ? ok(felt)
                            : feil(
                                  felt,
                                  `Siden du har valgt “Annet” i feltet over, må du oppgi minst ${
                                      brevmal === Brevmal.INNHENTE_OPPLYSNINGER
                                          ? 'ett dokument'
                                          : 'en årsak'
                                  }`
                              );
                    } else {
                        return ok(felt);
                    }
                },
                skalFeltetVises: (avhengigheter: FeltContext) => {
                    return avhengigheter?.multiselect.verdi.some(
                        (selectOption: ISelectOptionMedBrevtekst) => selectOption.value === 'annet'
                    );
                },
                avhengigheter: { brevmal, multiselect },
            }),
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
        skjema.felter.fritekst.nullstill();
        skjema.felter.multiselect.nullstill();
    }, [åpenBehandling]);

    const personer =
        åpenBehandling.status === RessursStatus.SUKSESS ? åpenBehandling.data.personer : [];

    const mottakersMålform =
        personer.find(
            (person: IGrunnlagPerson) => person.personIdent === skjema.felter.mottakerIdent.verdi
        )?.målform ?? Målform.NB;

    const hentMuligeBrevMaler = () => {
        const brevMaler = [];
        if (åpenBehandling.status === RessursStatus.SUKSESS) {
            if (
                hentStegNummer(åpenBehandling.data.steg) >= 2 &&
                åpenBehandling.data.årsak === BehandlingÅrsak.SØKNAD
            ) {
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
        multiselectVerdier: skjema.felter.multiselect.verdi
            .filter((selectOption: ISelectOptionMedBrevtekst) => selectOption.value !== 'annet')
            .map(
                (selectOption: ISelectOptionMedBrevtekst) =>
                    selectOption.brevtekst[mottakersMålform]
            ),
        brevmal: skjema.felter.brevmal.verdi as Brevmal,
        fritekst: skjema.felter.fritekst.verdi,
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
