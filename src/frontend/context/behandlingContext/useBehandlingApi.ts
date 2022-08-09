import { useEffect, useState } from 'react';

import type { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

import { useHttp } from '@navikt/familie-http';
import {
    type Ressurs,
    byggTomRessurs,
    byggHenterRessurs,
    byggFeiletRessurs,
    RessursStatus,
} from '@navikt/familie-typer';

import useSakOgBehandlingParams from '../../hooks/useSakOgBehandlingParams';
import type { IBehandling, IOpprettBehandlingData } from '../../typer/behandling';
import { BehandlingSteg, BehandlingÅrsak } from '../../typer/behandling';
import type { ILogg } from '../../typer/logg';

const useBehandlingApi = (
    behandling: Ressurs<IBehandling>,
    oppdaterBehandling: (behandling: Ressurs<IBehandling>, oppdaterMinimalFagsak?: boolean) => void
) => {
    const { request } = useHttp();
    const { fagsakId, behandlingId } = useSakOgBehandlingParams();

    const navigate = useNavigate();
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
                        navigate(
                            behandling.steg === BehandlingSteg.REGISTRERE_MOTTAKER
                                ? `/fagsak/${fagsakId}/${behandling?.behandlingId}/registrer-mottaker`
                                : `/fagsak/${fagsakId}/${behandling?.behandlingId}/registrer-soknad`
                        );
                    } else {
                        navigate(
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
        if (behandlingId === undefined) {
            settLogg(byggFeiletRessurs('Klarte ikke laste logg. Ingen behandlingsid.'));
        } else {
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
        }
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
