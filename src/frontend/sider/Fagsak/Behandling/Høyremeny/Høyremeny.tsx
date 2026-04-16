import React, { Activity } from 'react';

import { Box, Button, Tabs, VStack } from '@navikt/ds-react';

import { Behandlingskort } from './Behandlingskort/Behandlingskort';
import { Brev } from './Brev/Brev';
import { Historikk } from './Historikk/Historikk';
import Styles from './Høyremeny.module.css';
import { HøyremenyKnappikon } from './HøyremenyKnappikon';
import { Tab } from './TabContextProvider';
import { useTabContext } from './TabContextProvider';
import { Tabvelger } from './Tabvelger';
import { Totrinnskontroll } from './Totrinnskontroll/Totrinnskontroll';
import { useTotrinnskontrollModalContext } from './Totrinnskontroll/TotrinnskontrollModalContextProvider';
import { useHøyremeny } from './useHøyremeny';
import { useHentHistorikkinnslag } from '../../../../hooks/useHentHistorikkinnslag';
import { useBehandlingContext } from '../context/BehandlingContext';
import { TotrinnskontrollModal } from './Totrinnskontroll/TotrinnskontrollModal';

export function Høyremeny() {
    const { behandling } = useBehandlingContext();
    const { erModalÅpen } = useTotrinnskontrollModalContext();
    const { tab, settTab } = useTabContext();

    const [erÅpen, settErÅpen] = useHøyremeny();

    const {
        data: historikkinnslag,
        isPending: hentHistorikkinnslagIsPending,
        error: hentHistorikkinnslagError,
    } = useHentHistorikkinnslag(behandling.behandlingId, {
        refetchOnWindowFocus: false, // TODO: Skru på når behandlingstilstanden er håndtert av react-query
        refetchOnReconnect: false, // TODO: Skru på når behandlingstilstanden er håndtert av react-query
    });

    return (
        <>
            {erModalÅpen && <TotrinnskontrollModal />}
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
                        <Tabs value={tab} onChange={tab => settTab(tab as Tab)} iconPosition={'top'}>
                            <Tabvelger />
                            <Tabs.Panel value={Tab.Totrinnskontroll}>
                                <Totrinnskontroll />
                            </Tabs.Panel>
                            <Tabs.Panel value={Tab.Historikk}>
                                <Historikk
                                    historikkinnslag={historikkinnslag}
                                    laster={hentHistorikkinnslagIsPending}
                                    feil={hentHistorikkinnslagError}
                                />
                            </Tabs.Panel>
                            <Tabs.Panel value={Tab.Meldinger}>
                                <Brev />
                            </Tabs.Panel>
                        </Tabs>
                    </VStack>
                </Activity>
            </Box>
        </>
    );
}
