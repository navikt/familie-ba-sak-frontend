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
} from '../komponenter/Felleskomponenter/Hendelsesoversikt/BrevModul/typer';
import { AxiosError } from 'axios';
import { useSkjema } from '../typer/skjema';
import { feil, IFelt, nyttFelt, ok } from '../typer/felt';
import { fjernWhitespace } from '../utils/commons';

const [BrevModulProvider, useBrevModul] = createUseContext(() => {
    const { axiosRequest } = useApp();
    const { åpenBehandling } = useBehandling();
    const { hentFeltProps, kanSendeSkjema, onSubmit, oppdaterFeltISkjema, skjema } = useSkjema<
        IFagsak
    >({
        felter: {
            mottaker: nyttFelt<string>('', (felt: IFelt<string>) =>
                felt.verdi.length >= 1 ? ok(felt) : feil(felt, 'Du må velge en mottaker')
            ),
            brevmal: nyttFelt<Brevmal | ''>('', (felt: IFelt<Brevmal | ''>) =>
                felt.verdi ? ok(felt) : feil(felt, 'Du må velge en brevmal')
            ),
            fritekst: nyttFelt('', (felt: IFelt<string>) =>
                fjernWhitespace(felt.verdi).length >= 3
                    ? ok(felt)
                    : feil(
                          felt,
                          'Du må fylle ut fritekst'
                          // Teksten under skal inn når vi får på plass multiselect
                          //'Siden du har valgt “Annet” i feltet over, må du oppgi minst ett dokument '
                      )
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

    const hentForhåndsvisning = (brevData: IBrevData) => {
        settHentetForhåndsvisning(byggHenterRessurs());
        axiosRequest<string, IBrevData>({
            method: 'POST',
            data: brevData,
            url: `/familie-ba-sak/api/dokument/forhaandsvis-brev/innhente-opplysninger/${behandlingId}`,
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

    return {
        navigerTilOpplysningsplikt,
        settNavigerTilOpplysningsplikt,
        hentForhåndsvisning,
        hentetForhåndsvisning,
        hentMuligeBrevMaler,
        hentFeltProps,
        kanSendeSkjema,
        onSubmit,
        oppdaterFeltISkjema,
        skjema,
    };
});

export { BrevModulProvider, useBrevModul };
