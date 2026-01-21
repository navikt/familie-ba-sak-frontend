import React, { createContext, type PropsWithChildren, useContext, useEffect, useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { useNavigate } from 'react-router';

import { useHttp } from '@navikt/familie-http';
import { byggFeiletRessurs, byggTomRessurs, type Ressurs } from '@navikt/familie-typer';

import { useAppContext } from '../../../../context/AppContext';
import { HentFagsakQueryKeyFactory } from '../../../../hooks/useHentFagsak';
import useSakOgBehandlingParams from '../../../../hooks/useSakOgBehandlingParams';
import type { IBehandling } from '../../../../typer/behandling';
import { obfuskerBehandling } from '../../../../utils/obfuskerData';
import { useFagsakContext } from '../../FagsakContext';

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
    const { skalObfuskereData } = useAppContext();

    const erBehandlingDelAvFagsak = fagsak.behandlinger.some(
        visningBehandling => visningBehandling.behandlingId.toString() === behandlingId
    );

    if (behandlingId !== undefined && !erBehandlingDelAvFagsak) {
        navigate(`/fagsak/${fagsak.id}`);
    }

    const settBehandlingRessurs = async (behandling: Ressurs<IBehandling>) => {
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
