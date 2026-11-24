import { useSaksbehandler } from '@hooks/useSaksbehandler';
import { useSkalObfuskereData } from '@hooks/useSkalObfuskereData';
import { HenleggBehandlingModal } from '@komponenter/Saklinje/Meny/HenleggBehandling/HenleggBehandlingModal';
import { HenleggBehandlingVeivalgModal } from '@komponenter/Saklinje/Meny/HenleggBehandling/HenleggBehandlingVeivalgModal';
import { GlobalAlert } from '@navikt/ds-react';
import { useHttp } from '@navikt/familie-http';
import {
    byggFeiletRessurs,
    byggSuksessRessurs,
    byggTomRessurs,
    type Ressurs,
    RessursStatus,
} from '@navikt/familie-typer';
import { KontrollsiderProvider } from '@sider/Fagsak/Behandling/KontrollsiderContext';
import { BehandlerRolle, type IBehandling } from '@typer/behandling';
import { obfuskerBehandling } from '@utils/obfuskerData';
import type { AxiosError } from 'axios';
import { useEffect, useState } from 'react';

import { BehandlingProvider, Behandlingskilde } from './BehandlingContext';
import { BehandlingOppsett, PersonlinjeUtenBehandling } from './BehandlingOppsett';

interface Props {
    behandlingId: number;
}

export function BehandlingMedUseHttp({ behandlingId }: Props) {
    const { request } = useHttp();

    const skalObfuskereData = useSkalObfuskereData();
    const saksbehandler = useSaksbehandler();

    const [behandlingRessurs, settBehandlingRessurs] = useState<Ressurs<IBehandling>>(byggTomRessurs());

    useEffect(() => {
        settBehandlingRessurs(byggTomRessurs());

        const requestBasertPåBehandlerRolle = () => {
            if (saksbehandler.rolle === BehandlerRolle.BESLUTTER) {
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

        requestBasertPåBehandlerRolle()
            .then(response => {
                if (skalObfuskereData && response.status === RessursStatus.SUKSESS) {
                    obfuskerBehandling(response.data);
                }
                settBehandlingRessurs(response);
            })
            .catch((_error: AxiosError) => {
                settBehandlingRessurs(byggFeiletRessurs('Ukjent ved innhenting av behandling'));
            });
    }, [behandlingId]);

    switch (behandlingRessurs.status) {
        case RessursStatus.SUKSESS: {
            const behandling = behandlingRessurs.data;
            return (
                <BehandlingProvider
                    key={behandling.behandlingId}
                    behandling={behandling}
                    behandlingskilde={Behandlingskilde.USE_HTTP}
                    settBehandling={behandling => {
                        if (skalObfuskereData) {
                            obfuskerBehandling(behandling);
                        }
                        settBehandlingRessurs(byggSuksessRessurs(behandling));
                    }}
                >
                    <KontrollsiderProvider>
                        <HenleggBehandlingModal />
                        <HenleggBehandlingVeivalgModal />
                        <BehandlingOppsett />
                    </KontrollsiderProvider>
                </BehandlingProvider>
            );
        }
        case RessursStatus.IKKE_TILGANG:
            return (
                <>
                    <PersonlinjeUtenBehandling />
                    <GlobalAlert status="warning">
                        <GlobalAlert.Header>
                            <GlobalAlert.Title>Du har ikke tilgang til å se denne behandlingen.</GlobalAlert.Title>
                        </GlobalAlert.Header>
                    </GlobalAlert>
                </>
            );
        case RessursStatus.FEILET:
        case RessursStatus.FUNKSJONELL_FEIL:
            return (
                <>
                    <PersonlinjeUtenBehandling />
                    <GlobalAlert status="error">
                        <GlobalAlert.Header>
                            <GlobalAlert.Title>{behandlingRessurs.frontendFeilmelding}</GlobalAlert.Title>
                        </GlobalAlert.Header>
                    </GlobalAlert>
                </>
            );
        default:
            return <PersonlinjeUtenBehandling />;
    }
}
