import { useEffect, useState } from 'react';

import type { AxiosError } from 'axios';
import createUseContext from 'constate';
import { useNavigate } from 'react-router-dom';

import { useHttp } from '@navikt/familie-http';
import type { Ressurs } from '@navikt/familie-typer';
import { byggFeiletRessurs, byggTomRessurs } from '@navikt/familie-typer';

import useSakOgBehandlingParams from '../../hooks/useSakOgBehandlingParams';
import type { IBehandling } from '../../typer/behandling';
import type { IMinimalFagsak } from '../../typer/fagsak';
import { useFagsakContext } from '../Fagsak/FagsakContext';

interface Props {
    fagsak: IMinimalFagsak;
}

export const [HentOgSettBehandlingProvider, useHentOgSettBehandling] = createUseContext(
    ({ fagsak }: Props) => {
        const { request } = useHttp();
        const { behandlingId } = useSakOgBehandlingParams();
        const { hentMinimalFagsak } = useFagsakContext();
        const [behandlingRessurs, privatSettBehandlingRessurs] =
            useState<Ressurs<IBehandling>>(byggTomRessurs());
        const navigate = useNavigate();

        const erBehandlingDelAvFagsak = fagsak.behandlinger.some(
            visningBehandling => visningBehandling.behandlingId.toString() === behandlingId
        );

        if (behandlingId !== undefined && !erBehandlingDelAvFagsak) {
            navigate(`/fagsak/${fagsak.id}`);
        }

        const settBehandlingRessurs = (behandling: Ressurs<IBehandling>) => {
            hentMinimalFagsak(fagsak.id, false);
            privatSettBehandlingRessurs(behandling);
        };

        useEffect(() => {
            privatSettBehandlingRessurs(byggTomRessurs());

            if (behandlingId) {
                request<void, IBehandling>({
                    method: 'GET',
                    url: `/familie-ba-sak/api/behandlinger/${behandlingId}`,
                    påvirkerSystemLaster: true,
                })
                    .then((response: Ressurs<IBehandling>) => {
                        privatSettBehandlingRessurs(response);
                    })
                    .catch((_error: AxiosError) => {
                        privatSettBehandlingRessurs(
                            byggFeiletRessurs('Ukjent ved innhenting av behandling')
                        );
                    });
            }
        }, [behandlingId]);

        return { behandlingRessurs, settBehandlingRessurs };
    }
);
