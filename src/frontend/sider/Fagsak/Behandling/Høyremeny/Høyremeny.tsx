import React, { Activity, useState } from 'react';

import { Box, Button, Tabs, VStack } from '@navikt/ds-react';

import { Behandlingskort } from './Behandlingskort/Behandlingskort';
import { Brev } from './Brev/Brev';
import { Historikk } from './Historikk/Historikk';
import Styles from './Høyremeny.module.css';
import { HøyremenyKnappikon } from './HøyremenyKnappikon';
import { Tabvelger } from './Tabvelger';
import { Totrinnskontroll } from './Totrinnskontroll/Totrinnskontroll';
import { useHøyremeny } from './useHøyremeny';
import { useSkalViseTotrinnskontroll } from './useSkalViseTotrinnskontroll';
import { useHentHistorikkinnslag } from '../../../../hooks/useHentHistorikkinnslag';
import { useBehandlingContext } from '../context/BehandlingContext';

export enum TabValg {
    Totrinnskontroll = 'Totrinnskontroll',
    Historikk = 'Historikk',
    Meldinger = 'Meldinger',
    Dokumenter = 'Dokumenter',
}

export function Høyremeny() {
    const { behandling } = useBehandlingContext();

    const skalViseTotrinnskontroll = useSkalViseTotrinnskontroll();

    const [erÅpen, settErÅpen] = useHøyremeny();
    const [aktivTab, settAktivTab] = useState(skalViseTotrinnskontroll ? TabValg.Totrinnskontroll : TabValg.Historikk);

    const {
        data: historikkinnslag,
        isPending: hentHistorikkinnslagIsPending,
        error: hentHistorikkinnslagError,
    } = useHentHistorikkinnslag(behandling.behandlingId, {
        refetchOnWindowFocus: false, // TODO: Skru på når behandlingstilstanden er håndtert av react-query
        refetchOnReconnect: false, // TODO: Skru på når behandlingstilstanden er håndtert av react-query
    });

    return (
        <Box>
            <Button
                title={erÅpen ? 'Skjul høyremeny' : 'Vis høyremeny'}
                aria-label={erÅpen ? 'Skjul høyremeny' : 'Vis høyremeny'}
                className={Styles.knapp}
                variant={'secondary'}
                size={'small'}
                icon={<HøyremenyKnappikon erHøyremenyÅpen={erÅpen} />}
                onMouseDown={e => e.preventDefault()}
                onClick={() => settErÅpen(prev => !prev)}
            />
            <Activity mode={erÅpen ? 'visible' : 'hidden'}>
                <VStack width={'25rem'}>
                    <Behandlingskort />
                    <Tabs value={aktivTab} onChange={tab => settAktivTab(tab as TabValg)} iconPosition={'top'}>
                        <Tabvelger skalViseTotrinnskontroll={skalViseTotrinnskontroll} />
                        <Tabs.Panel value={TabValg.Totrinnskontroll}>
                            <Totrinnskontroll />
                        </Tabs.Panel>
                        <Tabs.Panel value={TabValg.Historikk}>
                            <Historikk
                                historikkinnslag={historikkinnslag}
                                laster={hentHistorikkinnslagIsPending}
                                feil={hentHistorikkinnslagError}
                            />
                        </Tabs.Panel>
                        <Tabs.Panel value={TabValg.Meldinger}>
                            <Brev onIModalClick={() => settAktivTab(TabValg.Historikk)} />
                        </Tabs.Panel>
                    </Tabs>
                </VStack>
            </Activity>
        </Box>
    );
}
