import { useState, useEffect } from 'react';

import type { AxiosError } from 'axios';
import styled from 'styled-components';

import { useHttp } from '@navikt/familie-http';
import type { Ressurs } from '@navikt/familie-typer';
import {
    byggFeiletRessurs,
    byggFunksjonellFeilRessurs,
    byggHenterRessurs,
    byggTomRessurs,
    RessursStatus,
} from '@navikt/familie-typer';

import { useTotrinnskontrollModalContext } from './TotrinnskontrollModalContextProvider';
import { Totrinnskontrollskjema } from './Totrinnskontrollskjema';
import type { IBehandling } from '../../../../../typer/behandling';
import { BehandlingStatus } from '../../../../../typer/behandling';
import type { ITotrinnskontrollData } from '../../../../../typer/totrinnskontroll';
import { TotrinnskontrollBeslutning } from '../../../../../typer/totrinnskontroll';
import { useBehandlingContext } from '../../context/BehandlingContext';
import type { ITrinn } from '../../Sider/sider';
import { KontrollertStatus } from '../../Sider/sider';
import { Tab, useTabContext } from '../TabContextProvider';

const Container = styled.div`
    padding: 0.5rem 1.5rem;
    display: flex;
`;

export function Totrinnskontroll() {
    const { behandling, trinnPåBehandling, settIkkeKontrollerteSiderTilManglerKontroll, settÅpenBehandling } =
        useBehandlingContext();
    const { settTab } = useTabContext();
    const { åpneModal } = useTotrinnskontrollModalContext();

    const { request } = useHttp();

    const [innsendtVedtak, settInnsendtVedtak] = useState<Ressurs<IBehandling>>(byggTomRessurs());

    const [forrigeState, settForrigeState] = useState(trinnPåBehandling);

    const nullstillFeilmelding = () => {
        const erFørsteSjekk = Object.entries(forrigeState).some(([sideId, trinn]) => {
            const oppdatertTrinn: ITrinn = Object.entries(trinnPåBehandling)
                .filter(([oppdatertSideId, _]) => sideId === oppdatertSideId)
                .map(([_, aTrinn]) => aTrinn)[0];
            return (
                (trinn.kontrollert === KontrollertStatus.IKKE_KONTROLLERT ||
                    trinn.kontrollert === KontrollertStatus.MANGLER_KONTROLL) &&
                oppdatertTrinn.kontrollert === KontrollertStatus.KONTROLLERT
            );
        });
        if (erFørsteSjekk) {
            settInnsendtVedtak(byggTomRessurs());
        }
        settForrigeState(trinnPåBehandling);
    };

    useEffect(() => {
        nullstillFeilmelding();
    }, [trinnPåBehandling]);

    const sendInnVedtak = (beslutning: TotrinnskontrollBeslutning, begrunnelse: string, egetVedtak: boolean) => {
        if (
            !egetVedtak &&
            Object.values(trinnPåBehandling).some(trinn => trinn.kontrollert !== KontrollertStatus.KONTROLLERT)
        ) {
            settIkkeKontrollerteSiderTilManglerKontroll();
            settInnsendtVedtak(byggFunksjonellFeilRessurs('Du må kontrollere alle steg i løsningen.'));
            return;
        }

        settInnsendtVedtak(byggHenterRessurs());
        const manglerBegrunnelse = beslutning === TotrinnskontrollBeslutning.UNDERKJENT && !begrunnelse;
        if (beslutning === TotrinnskontrollBeslutning.IKKE_VURDERT) {
            settInnsendtVedtak(byggFeiletRessurs('Totrinnskontroll ikke vurdert ved innsending'));
        } else if (manglerBegrunnelse) {
            settInnsendtVedtak(byggFeiletRessurs('Mangler begrunnelse ved innsending'));
        } else {
            request<ITotrinnskontrollData, IBehandling>({
                method: 'POST',
                data: {
                    beslutning,
                    begrunnelse,
                    kontrollerteSider: Object.entries(trinnPåBehandling).map(([_, side]) => {
                        return side.navn;
                    }),
                },
                url: `/familie-ba-sak/api/behandlinger/${behandling.behandlingId}/steg/iverksett-vedtak`,
            })
                .then((response: Ressurs<IBehandling>) => {
                    settInnsendtVedtak(response);
                    if (response.status === RessursStatus.SUKSESS) {
                        settÅpenBehandling(response);
                        åpneModal(beslutning);
                        settTab(Tab.Historikk);
                    }
                })
                .catch((_error: AxiosError) => {
                    settInnsendtVedtak(byggFeiletRessurs('Ukjent feil, sende inn vedtak.'));
                });
        }
    };

    return (
        <>
            {behandling.status === BehandlingStatus.FATTER_VEDTAK && (
                <Container className="totrinnskontroll">
                    <Totrinnskontrollskjema sendInnVedtak={sendInnVedtak} innsendtVedtak={innsendtVedtak} />
                </Container>
            )}
        </>
    );
}
