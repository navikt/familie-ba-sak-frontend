import React, { createContext, type PropsWithChildren, useContext, useEffect, useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { useNavigate } from 'react-router';

import { useHttp } from '@navikt/familie-http';
import { byggFeiletRessurs, byggTomRessurs, type Ressurs, RessursStatus } from '@navikt/familie-typer';

import { useAppContext } from '../../../../context/AppContext';
import { useFeatureToggles } from '../../../../hooks/useFeatureToggles';
import { HentFagsakQueryKeyFactory } from '../../../../hooks/useHentFagsak';
import { HentHistorikkinnslagQueryKeyFactory } from '../../../../hooks/useHentHistorikkinnslag';
import useSakOgBehandlingParams from '../../../../hooks/useSakOgBehandlingParams';
import { BehandlerRolle, type IBehandling } from '../../../../typer/behandling';
import type { IMinimalFagsak } from '../../../../typer/fagsak';
import { FeatureToggle } from '../../../../typer/featureToggles';
import { obfuskerBehandling } from '../../../../utils/obfuskerData';
import { useFagsakContext } from '../../FagsakContext';
import { lagVisningsBehandlingFraBehandling } from '../../Saksoversikt/visningBehandling';

interface HentOgSettBehandlingContextValue {
    behandlingRessurs: Ressurs<IBehandling>;
    settBehandlingRessurs: (behandling: Ressurs<IBehandling>) => void;
}

const HentOgSettBehandlingContext = createContext<HentOgSettBehandlingContextValue | undefined>(undefined);

export function HentOgSettBehandlingProvider({ children }: PropsWithChildren) {
    const { fagsak } = useFagsakContext();
    const { request } = useHttp();
    const { behandlingId } = useSakOgBehandlingParams();
    const queryClient = useQueryClient();
    const [behandlingRessurs, privatSettBehandlingRessurs] = useState<Ressurs<IBehandling>>(byggTomRessurs());
    const navigate = useNavigate();
    const { skalObfuskereData, hentSaksbehandlerRolle } = useAppContext();
    const toggles = useFeatureToggles();

    const erBehandlingDelAvFagsak = fagsak.behandlinger.some(
        visningBehandling => visningBehandling.behandlingId.toString() === behandlingId
    );

    if (behandlingId !== undefined && !erBehandlingDelAvFagsak) {
        navigate(`/fagsak/${fagsak.id}`);
    }

    const settBehandlingRessurs = (behandling: Ressurs<IBehandling>) => {
        if (behandling.status === RessursStatus.SUKSESS) {
            queryClient.invalidateQueries({
                queryKey: HentHistorikkinnslagQueryKeyFactory.historikkinnslag(behandling.data.behandlingId),
            });
            queryClient.setQueryData(HentFagsakQueryKeyFactory.fagsak(fagsak.id), (fagsak: IMinimalFagsak) => ({
                ...fagsak,
                behandlinger: [
                    ...fagsak.behandlinger.filter(b => b.behandlingId !== behandling.data.behandlingId),
                    lagVisningsBehandlingFraBehandling(behandling.data),
                ],
            }));
        }
        if (skalObfuskereData) {
            obfuskerBehandling(behandling);
        }
        privatSettBehandlingRessurs(behandling);
    };

    useEffect(() => {
        privatSettBehandlingRessurs(byggTomRessurs());

        const requestBasertPåBehandlerRolle = () => {
            if (
                hentSaksbehandlerRolle() === BehandlerRolle.BESLUTTER &&
                toggles[FeatureToggle.hentBehandlingEndepunktForBeslutter]
            ) {
                return request<void, IBehandling>({
                    method: 'PUT',
                    url: `/familie-ba-sak/api/behandlinger/${behandlingId}/oppdatert-valutakurs`,
                    påvirkerSystemLaster: true,
                });
            } else {
                return request<void, IBehandling>({
                    method: 'GET',
                    url: `/familie-ba-sak/api/behandlinger/${behandlingId}`,
                    påvirkerSystemLaster: true,
                });
            }
        };

        if (behandlingId) {
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
    }, [behandlingId]);

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
