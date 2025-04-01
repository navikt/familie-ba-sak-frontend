import React, { createContext, useContext, useEffect, useState } from 'react';

import type { AxiosError } from 'axios';
import { useNavigate } from 'react-router';

import { useHttp } from '@navikt/familie-http';
import { byggFeiletRessurs, byggTomRessurs, type Ressurs } from '@navikt/familie-typer';

import useSakOgBehandlingParams from '../../hooks/useSakOgBehandlingParams';
import { useFagsakContext } from '../../sider/Fagsak/FagsakContext';
import type { IBehandling } from '../../typer/behandling';
import type { IMinimalFagsak } from '../../typer/fagsak';
import { obfuskerBehandling } from '../../utils/obfuskerData';
import { useApp } from '../AppContext';

interface Props extends React.PropsWithChildren {
    fagsak: IMinimalFagsak;
}

interface HentOgSettBehandlingContextValue {
    behandlingRessurs: Ressurs<IBehandling>;
    settBehandlingRessurs: (behandling: Ressurs<IBehandling>) => void;
}

const HentOgSettBehandlingContext = createContext<HentOgSettBehandlingContextValue | undefined>(
    undefined
);

export const HentOgSettBehandlingProvider = ({ fagsak, children }: Props) => {
    const { request } = useHttp();
    const { behandlingId } = useSakOgBehandlingParams();
    const { hentMinimalFagsak } = useFagsakContext();
    const [behandlingRessurs, privatSettBehandlingRessurs] =
        useState<Ressurs<IBehandling>>(byggTomRessurs());
    const navigate = useNavigate();
    const { skalObfuskereData } = useApp();

    const erBehandlingDelAvFagsak = fagsak.behandlinger.some(
        visningBehandling => visningBehandling.behandlingId.toString() === behandlingId
    );

    if (behandlingId !== undefined && !erBehandlingDelAvFagsak) {
        navigate(`/fagsak/${fagsak.id}`);
    }

    const settBehandlingRessurs = (behandling: Ressurs<IBehandling>) => {
        hentMinimalFagsak(fagsak.id, false);
        if (skalObfuskereData) {
            obfuskerBehandling(behandling);
        }
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
                    if (skalObfuskereData) {
                        obfuskerBehandling(response);
                    }
                    privatSettBehandlingRessurs(response);
                })
                .catch((_error: AxiosError) => {
                    privatSettBehandlingRessurs(
                        byggFeiletRessurs('Ukjent ved innhenting av behandling')
                    );
                });
        }
    }, [behandlingId]);

    return (
        <HentOgSettBehandlingContext.Provider value={{ behandlingRessurs, settBehandlingRessurs }}>
            {children}
        </HentOgSettBehandlingContext.Provider>
    );
};

export const useHentOgSettBehandlingContext = () => {
    const context = useContext(HentOgSettBehandlingContext);

    if (context === undefined) {
        throw new Error(
            'useHentOgSettBehandlingContext må brukes innenfor HentOgSettBehandlingProvider'
        );
    }
    return context;
};
