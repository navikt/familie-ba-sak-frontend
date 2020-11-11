import createUseContext from 'constate';
import React, { useEffect } from 'react';

import { Behandlingstype, BehandlingÅrsak, hentStegNummer } from '../typer/behandling';
import {
    byggDataRessurs,
    byggFeiletRessurs,
    byggHenterRessurs,
    byggTomRessurs,
    Ressurs,
    RessursStatus,
} from '@navikt/familie-typer';
import { useApp } from './AppContext';
import { useBehandling } from './BehandlingContext';
import { IFagsak } from '../typer/fagsak';
import {
    Brevmal,
    IBrevData,
    ISelectOptionMedBrevtekst,
} from '../komponenter/Felleskomponenter/Hendelsesoversikt/BrevModul/typer';
import { AxiosError } from 'axios';
import { useSkjema } from '../familie-skjema/skjema';
import { fjernWhitespace } from '../utils/commons';
import { IGrunnlagPerson } from '../typer/person';
import { Målform } from '../typer/søknad';
import { useFelt } from '../familie-skjema/felt';
import { FeltState } from '../familie-skjema/typer';
import { feil, ok } from '../familie-skjema/validators';

const [BrevModulProvider, useBrevModul] = createUseContext(() => {
    const { axiosRequest } = useApp();
    const { åpenBehandling } = useBehandling();
    const { kanSendeSkjema, onSubmit, skjema } = useSkjema<
        {
            mottakerIdent: string;
            brevmal: Brevmal | '';
            multiselect: ISelectOptionMedBrevtekst[];
            fritekst: string;
        },
        IFagsak
    >({
        initialSkjema: {
            felter: {
                mottakerIdent: useFelt({
                    value: '',
                    valideringsfunksjon: (felt: FeltState<string>) =>
                        felt.value.length >= 1 ? ok(felt) : feil(felt, 'Du må velge en mottaker'),
                }),
                brevmal: useFelt({
                    value: '',
                    valideringsfunksjon: (felt: FeltState<Brevmal | ''>) =>
                        felt.value ? ok(felt) : feil(felt, 'Du må velge en brevmal'),
                }),
                multiselect: useFelt({
                    value: [],
                    valideringsfunksjon: (felt: FeltState<ISelectOptionMedBrevtekst[]>) => {
                        // TODO hente fra context
                        const brevmal: Brevmal | '' = Brevmal.INNHENTE_OPPLYSNINGER;

                        return felt.value.length > 0
                            ? ok(felt)
                            : feil(
                                  felt,
                                  `Du må velge minst ${
                                      brevmal === Brevmal.INNHENTE_OPPLYSNINGER
                                          ? 'ett dokument'
                                          : 'en årsak'
                                  }`
                              );
                    },
                }),
                fritekst: nyttFelt(
                    '',
                    (felt: FeltState<string>, valideringsmetadata?: Valideringsmetadata) => {
                        const brevmal: Brevmal | '' = valideringsmetadata?.felter?.brevmal.value;
                        const multiselect: ISelectOptionMedBrevtekst[] | undefined =
                            valideringsmetadata?.felter?.multiselect.value;

                        const annetErValgt =
                            (
                                multiselect?.filter(
                                    (selectOption: ISelectOptionMedBrevtekst) =>
                                        selectOption.value === 'annet'
                                ) ?? []
                            ).length > 0;

                        if (annetErValgt) {
                            return fjernWhitespace(felt.value).length >= 3
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
                    }
                ),
            },
            skjemanavn: 'brevmodul',
            submitRessurs: byggTomRessurs(),
            visFeilmeldinger: false,
        },
    });

    const [hentetForhåndsvisning, settHentetForhåndsvisning] = React.useState<Ressurs<string>>(
        byggTomRessurs()
    );

    const [navigerTilOpplysningsplikt, settNavigerTilOpplysningsplikt] = React.useState<boolean>(
        false
    );

    /**
     * Nullstill enkelte felter i skjemaet ved oppdatering av åpenbehandling i staten.
     * Dette fordi at man kan ha gjort endring på målform
     */
    useEffect(() => {
        nullstillFelt('fritekst');
        nullstillFelt('multiselect');
    }, [åpenBehandling]);

    const behandlingId =
        åpenBehandling.status === RessursStatus.SUKSESS && åpenBehandling.data.behandlingId;

    const personer =
        åpenBehandling.status === RessursStatus.SUKSESS ? åpenBehandling.data.personer : [];

    const mottakersMålform =
        personer.find(
            (person: IGrunnlagPerson) => person.personIdent === skjema.felter.mottakerIdent.value
        )?.målform ?? Målform.NB;

    const hentForhåndsvisning = (brevData: IBrevData) => {
        settHentetForhåndsvisning(byggHenterRessurs());
        axiosRequest<string, IBrevData>({
            method: 'POST',
            data: brevData,
            url: `/familie-ba-sak/api/dokument/forhaandsvis-brev/${behandlingId}`,
        })
            .then((response: Ressurs<string>) => {
                if (response.status === RessursStatus.SUKSESS) {
                    settHentetForhåndsvisning(
                        byggDataRessurs(`data:application/pdf;base64,${response.data}`)
                    );
                } else if (response.status === RessursStatus.FEILET) {
                    settHentetForhåndsvisning(response);
                } else {
                    settHentetForhåndsvisning(
                        byggFeiletRessurs('Ukjent feil, kunne ikke generere forhåndsvisning.')
                    );
                }
            })
            .catch((_error: AxiosError) => {
                settHentetForhåndsvisning(
                    byggFeiletRessurs('Ukjent feil ved henting av forhåndsvisning.')
                );
            });
    };

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

    const multiselectInneholderAnnet = () =>
        skjema.felter.multiselect.value.filter(
            (selectOption: ISelectOptionMedBrevtekst) => selectOption.value === 'annet'
        ).length > 0;

    const hentSkjemaData = (): IBrevData => ({
        mottakerIdent: skjema.felter.mottakerIdent.value,
        multiselectVerdier: skjema.felter.multiselect.value
            .filter((selectOption: ISelectOptionMedBrevtekst) => selectOption.value !== 'annet')
            .map(
                (selectOption: ISelectOptionMedBrevtekst) =>
                    selectOption.brevtekst[mottakersMålform]
            ),
        brevmal: skjema.felter.brevmal.value,
        fritekst: skjema.felter.fritekst.value,
    });

    return {
        hentFeltProps,
        hentForhåndsvisning,
        hentMuligeBrevMaler,
        hentSkjemaData,
        hentetForhåndsvisning,
        kanSendeSkjema,
        mottakersMålform,
        multiselectInneholderAnnet,
        navigerTilOpplysningsplikt,
        onSubmit,
        oppdaterFeltISkjema,
        personer,
        settNavigerTilOpplysningsplikt,
        skjema,
    };
});

export { BrevModulProvider, useBrevModul };
