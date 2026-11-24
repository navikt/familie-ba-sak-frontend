import { useBehandling } from '@hooks/useBehandling';
import { useHentHistorikkinnslag } from '@hooks/useHentHistorikkinnslag';
import { Konsept, useErNyttOppsett, useKonsept } from '@hooks/useKonsept';
import { Skjermstørrelse, useSkjermstørrelse } from '@hooks/useSkjermstørrelse';
import { Box, Button, Tabs, VStack } from '@navikt/ds-react';
import { Activity } from 'react';

import { Behandlingskort } from './Behandlingskort/Behandlingskort';
import { Brev } from './Brev/Brev';
import { Dokumenter } from './Dokumenter/Dokumenter';
import { Historikk } from './Historikk/Historikk';
import Styles from './Høyremeny.module.css';
import { HøyremenyKnappikon } from './HøyremenyKnappikon';
import { Tab, useTabContext } from './TabContextProvider';
import { Tabvelger } from './Tabvelger';
import { Totrinnskontroll } from './Totrinnskontroll/Totrinnskontroll';
import { TotrinnskontrollModal } from './Totrinnskontroll/TotrinnskontrollModal';
import { useTotrinnskontrollModalContext } from './Totrinnskontroll/TotrinnskontrollModalContextProvider';
import { useHøyremeny } from './useHøyremeny';

export function Høyremeny() {
    const behandling = useBehandling();

    const { erModalÅpen } = useTotrinnskontrollModalContext();
    const { tab, settTab } = useTabContext();
    const erNyttOppsett = useErNyttOppsett();
    // Konsept 2 har ingen knapp for å skjule menyen
    const kanSkjules = useKonsept() !== Konsept.KONSEPT_2;
    // Fanene har 18px tekst i Figma (1920px). På smalere skjermer får ikke tre faner plass med den størrelsen.
    const brukSmåFaner = useSkjermstørrelse() < Skjermstørrelse['3XL'];
    // Dokumenter-fanen finnes bare i konsept 2 og 3
    const aktivTab = !erNyttOppsett && tab === Tab.Dokumenter ? Tab.Historikk : tab;

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
                {kanSkjules && (
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
                )}
                <Activity mode={!kanSkjules || erÅpen ? 'visible' : 'hidden'}>
                    <VStack
                        width={erNyttOppsett ? 'clamp(20rem, 25.42vw, 30.5rem)' : 'clamp(20rem, 20vw, 25rem)'}
                        padding={erNyttOppsett ? 'space-20' : undefined}
                        className={erNyttOppsett ? Styles.nyttOppsett : undefined}
                    >
                        <Behandlingskort />
                        <Tabs
                            value={aktivTab}
                            onChange={tab => settTab(tab as Tab)}
                            iconPosition={'top'}
                            size={erNyttOppsett && brukSmåFaner ? 'small' : undefined}
                        >
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
                            {erNyttOppsett && (
                                <Tabs.Panel value={Tab.Dokumenter}>
                                    <Dokumenter />
                                </Tabs.Panel>
                            )}
                        </Tabs>
                    </VStack>
                </Activity>
            </Box>
        </>
    );
}
