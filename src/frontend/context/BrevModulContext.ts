import createUseContext from 'constate';
import React from 'react';

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
import { feil, IFelt, nyttFelt, ok, Valideringsmetadata } from '../typer/felt';
import { useSkjema } from '../typer/skjema';
import { fjernWhitespace } from '../utils/commons';
import { IGrunnlagPerson } from '../typer/person';
import { Målform } from '../typer/søknad';

const [BrevModulProvider, useBrevModul] = createUseContext(() => {
    const { axiosRequest } = useApp();
    const { åpenBehandling } = useBehandling();
    const { hentFeltProps, kanSendeSkjema, onSubmit, oppdaterFeltISkjema, skjema } = useSkjema<
        IFagsak
    >({
        felter: {
            mottakerIdent: nyttFelt<string>('', (felt: IFelt<string>) =>
                felt.verdi.length >= 1 ? ok(felt) : feil(felt, 'Du må velge en mottaker')
            ),
            brevmal: nyttFelt<Brevmal | ''>('', (felt: IFelt<Brevmal | ''>) =>
                felt.verdi ? ok(felt) : feil(felt, 'Du må velge en brevmal')
            ),
            multiselect: nyttFelt<ISelectOptionMedBrevtekst[]>(
                [],
                (
                    felt: IFelt<ISelectOptionMedBrevtekst[]>,
                    valideringsmetadata?: Valideringsmetadata
                ) => {
                    const brevmal: Brevmal | '' = valideringsmetadata?.felter?.brevmal.verdi;

                    return felt.verdi.length > 0
                        ? ok(felt)
                        : feil(
                              felt,
                              `Du må velge minst ${
                                  brevmal === Brevmal.INNHENTE_OPPLYSNINGER
                                      ? 'et dokument'
                                      : 'en årsak'
                              }`
                          );
                }
            ),
            fritekst: nyttFelt(
                '',
                (felt: IFelt<string>, valideringsmetadata?: Valideringsmetadata) => {
                    const multiselect: ISelectOptionMedBrevtekst[] | undefined =
                        valideringsmetadata?.felter?.multiselect.verdi;

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
                                  'Siden du har valgt “Annet” i feltet over, må du oppgi minst ett dokument '
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
    });

    const [hentetForhåndsvisning, settHentetForhåndsvisning] = React.useState<Ressurs<string>>(
        byggTomRessurs()
    );

    const [navigerTilOpplysningsplikt, settNavigerTilOpplysningsplikt] = React.useState<boolean>(
        false
    );

    const behandlingId =
        åpenBehandling.status === RessursStatus.SUKSESS && åpenBehandling.data.behandlingId;

    const personer =
        åpenBehandling.status === RessursStatus.SUKSESS ? åpenBehandling.data.personer : [];

    const mottakersMålform =
        personer.find(
            (person: IGrunnlagPerson) => person.personIdent === skjema.felter.mottakerIdent.verdi
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

    const multiselectInneholderAnnet = () => {
        return (
            skjema.felter.multiselect.verdi.filter(
                (selectOption: ISelectOptionMedBrevtekst) => selectOption.value === 'annet'
            ).length > 0
        );
    };

    const hentSkjemaData = (): IBrevData => ({
        mottakerIdent: skjema.felter.mottakerIdent.verdi,
        multiselectVerdier: skjema.felter.multiselect.verdi
            .filter((selectOption: ISelectOptionMedBrevtekst) => selectOption.value !== 'annet')
            .map(
                (selectOption: ISelectOptionMedBrevtekst) =>
                    selectOption.brevtekst[mottakersMålform]
            ),
        brevmal: skjema.felter.brevmal.verdi,
        fritekst: skjema.felter.fritekst.verdi,
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
