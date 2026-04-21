import React, { createContext, type PropsWithChildren, useContext, useEffect, useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { useNavigate } from 'react-router';

import { useHttp } from '@navikt/familie-http';
import { byggFeiletRessurs, byggTomRessurs, type Ressurs, RessursStatus } from '@navikt/familie-typer';

import { useAppContext } from '../../../../context/AppContext';
import { useBehandlingIdParam } from '../../../../hooks/useBehandlingIdParam';
import { useFagsak } from '../../../../hooks/useFagsak';
import { HentFagsakQueryKeyFactory } from '../../../../hooks/useHentFagsak';
import { HentHistorikkinnslagQueryKeyFactory } from '../../../../hooks/useHentHistorikkinnslag';
import { BehandlerRolle, type IBehandling } from '../../../../typer/behandling';
import { obfuskerBehandling } from '../../../../utils/obfuskerData';

interface HentOgSettBehandlingContextValue {
    behandlingRessurs: Ressurs<IBehandling>;
    settBehandlingRessurs: (behandling: Ressurs<IBehandling>) => void;
}

const HentOgSettBehandlingContext = createContext<HentOgSettBehandlingContextValue | undefined>(undefined);

export function HentOgSettBehandlingProvider({ children }: PropsWithChildren) {
    const { skalObfuskereData, hentSaksbehandlerRolle } = useAppContext();
    const { request } = useHttp();

    const fagsak = useFagsak();
    const behandlingIdParam = useBehandlingIdParam();

    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const [behandlingRessurs, privatSettBehandlingRessurs] = useState<Ressurs<IBehandling>>(byggTomRessurs());

    const erBehandlingDelAvFagsak = fagsak.behandlinger.some(
        behandling => behandling.behandlingId === behandlingIdParam
    );

    if (behandlingIdParam !== undefined && !erBehandlingDelAvFagsak) {
        navigate(`/fagsak/${fagsak.id}`);
    }

    const settBehandlingRessurs = async (behandling: Ressurs<IBehandling>) => {
        if (behandling.status === RessursStatus.SUKSESS) {
            queryClient.invalidateQueries({
                queryKey: HentHistorikkinnslagQueryKeyFactory.historikkinnslag(behandling.data.behandlingId),
            });
        }
        queryClient.invalidateQueries({
            queryKey: HentFagsakQueryKeyFactory.fagsak(fagsak.id),
        });

        if (skalObfuskereData) {
            obfuskerBehandling(behandling);
        }
        privatSettBehandlingRessurs(behandling);
    };

    useEffect(() => {
        privatSettBehandlingRessurs(byggTomRessurs());

        const requestBasertPåBehandlerRolle = () => {
            if (hentSaksbehandlerRolle() === BehandlerRolle.BESLUTTER) {
                return request<void, IBehandling>({
                    method: 'PUT',
                    url: `/familie-ba-sak/api/behandlinger/${behandlingIdParam}/oppdatert-valutakurs`,
                    påvirkerSystemLaster: true,
                });
            } else {
                return request<void, IBehandling>({
                    method: 'GET',
                    url: `/familie-ba-sak/api/behandlinger/${behandlingIdParam}`,
                    påvirkerSystemLaster: true,
                });
            }
        };

        if (behandlingIdParam) {
            requestBasertPåBehandlerRolle()
                .then((response: Ressurs<IBehandling>) => {
                    if (skalObfuskereData) {
                        obfuskerBehandling(response);
                    }
                    privatSettBehandlingRessurs(response);
                })
                .catch((_error: AxiosError) => {
                    privatSettBehandlingRessurs(byggFeiletRessurs('Ukjent ved innhenting av behandling'));
                });
        }
    }, [behandlingIdParam]);

    return (
        <HentOgSettBehandlingContext.Provider value={{ behandlingRessurs, settBehandlingRessurs }}>
            {children}
        </HentOgSettBehandlingContext.Provider>
    );
}

export function useHentOgSettBehandlingContext() {
    const context = useContext(HentOgSettBehandlingContext);
    if (context === undefined) {
        throw new Error('useHentOgSettBehandlingContext må brukes innenfor HentOgSettBehandlingProvider');
    }
    return context;
}
