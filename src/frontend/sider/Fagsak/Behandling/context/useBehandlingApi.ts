import { useState } from 'react';

import type { AxiosError } from 'axios';

import { useHttp } from '@navikt/familie-http';
import type { Ressurs } from '@navikt/familie-typer';
import { byggFeiletRessurs, byggHenterRessurs, byggTomRessurs, RessursStatus } from '@navikt/familie-typer';

import { useAppContext } from '../../../../context/AppContext';
import useSakOgBehandlingParams from '../../../../hooks/useSakOgBehandlingParams';
import type { IBehandling } from '../../../../typer/behandling';
import { type ILogg } from '../../../../typer/logg';
import { obfuskerLogg } from '../../../../utils/obfuskerData';

const useBehandlingApi = (
    oppdaterBehandling: (behandling: Ressurs<IBehandling>, oppdaterMinimalFagsak?: boolean) => void
) => {
    const { request } = useHttp();
    const { behandlingId } = useSakOgBehandlingParams();

    const [logg, settLogg] = useState<Ressurs<ILogg[]>>(byggTomRessurs());

    const { skalObfuskereData } = useAppContext();

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
                    if (skalObfuskereData) {
                        obfuskerLogg(hentetLogg);
                    }
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
                return byggFeiletRessurs('Ukjent feil ved oppdatering av registeropplysninger') as Ressurs<IBehandling>;
            });
    };

    return {
        logg,
        hentLogg,
        oppdaterRegisteropplysninger,
    };
};

export default useBehandlingApi;
