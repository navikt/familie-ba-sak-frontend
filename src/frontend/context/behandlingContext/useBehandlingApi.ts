import { useEffect, useState } from 'react';

import { AxiosError } from 'axios';
import { useHistory } from 'react-router';

import { useHttp } from '@navikt/familie-http';
import {
    Ressurs,
    byggTomRessurs,
    byggHenterRessurs,
    byggFeiletRessurs,
    RessursStatus,
} from '@navikt/familie-typer';

import useSakOgBehandlingParams from '../../hooks/useSakOgBehandlingParams';
import { BehandlingÅrsak, IBehandling, IOpprettBehandlingData } from '../../typer/behandling';
import { ILogg } from '../../typer/logg';

const useBehandlingApi = (
    behandling: Ressurs<IBehandling>,
    oppdaterBehandling: (behandling: Ressurs<IBehandling>, oppdaterMinimalFagsak?: boolean) => void
) => {
    const { request } = useHttp();
    const { fagsakId, behandlingId } = useSakOgBehandlingParams();

    const history = useHistory();
    const [logg, settLogg] = useState<Ressurs<ILogg[]>>(byggTomRessurs());

    useEffect(() => {
        if (behandlingId !== undefined) {
            if (behandling.status !== RessursStatus.SUKSESS) {
                hentBehandling();
            } else if (
                behandling.status === RessursStatus.SUKSESS &&
                behandling.data.behandlingId !== parseInt(behandlingId, 10)
            ) {
                hentBehandling();
            }
        }
    }, [behandlingId]);

    const opprettBehandling = (data: IOpprettBehandlingData) => {
        return request<IOpprettBehandlingData, IBehandling>({
            data,
            method: 'POST',
            url: '/familie-ba-sak/api/behandlinger',
            påvirkerSystemLaster: true,
        })
            .then((response: Ressurs<IBehandling>) => {
                oppdaterBehandling(response);
                if (response.status === RessursStatus.SUKSESS) {
                    const behandling = response.data;

                    if (behandling.årsak === BehandlingÅrsak.SØKNAD) {
                        history.push(
                            `/fagsak/${fagsakId}/${behandling?.behandlingId}/registrer-soknad`
                        );
                    } else {
                        history.push(
                            `/fagsak/${fagsakId}/${behandling?.behandlingId}/vilkaarsvurdering`
                        );
                    }
                }
            })
            .catch(() => {
                return byggFeiletRessurs('Opprettelse av behandling feilet');
            });
    };

    const hentBehandling = () => {
        request<void, IBehandling>({
            method: 'GET',
            url: `/familie-ba-sak/api/behandlinger/${behandlingId}`,
            påvirkerSystemLaster: true,
        }).then((response: Ressurs<IBehandling>) => {
            oppdaterBehandling(response, false);
        });
    };

    const hentLogg = (): void => {
        settLogg(byggHenterRessurs());
        request<void, ILogg[]>({
            method: 'GET',
            url: `/familie-ba-sak/api/logg/${behandlingId}`,
        })
            .then((hentetLogg: Ressurs<ILogg[]>) => {
                settLogg(hentetLogg);
            })
            .catch(() => {
                settLogg(byggFeiletRessurs('Feil ved lasting av logg'));
            });
    };

    const oppdaterRegisteropplysninger = (): Promise<Ressurs<IBehandling>> => {
        return request<void, IBehandling>({
            method: 'GET',
            url: `/familie-ba-sak/api/person/oppdater-registeropplysninger/${behandlingId}`,
            påvirkerSystemLaster: false,
        })
            .then((response: Ressurs<IBehandling>) => {
                if (
                    response.status === RessursStatus.FEILET ||
                    response.status === RessursStatus.FUNKSJONELL_FEIL ||
                    response.status === RessursStatus.IKKE_TILGANG
                ) {
                    return byggFeiletRessurs(
                        'Kunne ikke oppdatere registeropplysninger. Prøv igjen eller kontakt brukerstøtte hvis problemet vedvarer.'
                    ) as Ressurs<IBehandling>;
                } else {
                    oppdaterBehandling(response);
                    return response;
                }
            })
            .catch((_error: AxiosError) => {
                return byggFeiletRessurs(
                    'Ukjent feil ved oppdatering av registeropplysninger'
                ) as Ressurs<IBehandling>;
            });
    };

    return {
        logg,
        hentLogg,
        opprettBehandling,
        oppdaterRegisteropplysninger,
    };
};

export default useBehandlingApi;
