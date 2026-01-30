import * as React from 'react';
import { Activity } from 'react';

import { ChevronLeftIcon, ChevronRightIcon } from '@navikt/aksel-icons';
import { Button, Stack, VStack } from '@navikt/ds-react';
import { hentDataFraRessursMedFallback } from '@navikt/familie-typer';

import { Behandlingskort } from './Behandlingskort';
import { Hendelsesoversikt } from './Hendelsesoversikt/Hendelsesoversikt';
import type { Hendelse } from './Hendelsesoversikt/typer';
import Styles from './Høyremeny.module.css';
import { useHøyremeny } from './useHøyremeny';
import type { ILogg } from '../../../../typer/logg';
import { Datoformat, isoStringTilFormatertString } from '../../../../utils/dato';
import { useBehandlingContext } from '../context/BehandlingContext';

export function Høyremeny() {
    const { behandling, logg, hentLogg } = useBehandlingContext();

    const [erÅpen, settErÅpen] = useHøyremeny();

    React.useEffect(() => {
        hentLogg();
    }, [behandling]);

    const icon = erÅpen ? (
        <ChevronRightIcon aria-label={'Skjul høyremeny'} />
    ) : (
        <ChevronLeftIcon aria-label={'Vis høyremeny'} />
    );

    return (
        <Stack direction={'row'}>
            <Button
                title={erÅpen ? 'Skjul høyremeny' : 'Vis høyremeny'}
                aria-label={erÅpen ? 'Skjul høyremeny' : 'Vis høyremeny'}
                className={Styles.knapp}
                variant={'secondary'}
                size={'small'}
                icon={icon}
                onMouseDown={e => e.preventDefault()}
                onClick={() => settErÅpen(prev => !prev)}
            />
            <Activity mode={erÅpen ? 'visible' : 'hidden'}>
                <VStack width={'25rem'}>
                    <Behandlingskort />
                    <Hendelsesoversikt
                        hendelser={hentDataFraRessursMedFallback(logg, []).map((loggElement: ILogg): Hendelse => {
                            return {
                                id: loggElement.id.toString(),
                                dato: isoStringTilFormatertString({
                                    isoString: loggElement.opprettetTidspunkt,
                                    tilFormat: Datoformat.DATO_TID,
                                }),
                                utførtAv: loggElement.opprettetAv,
                                rolle: loggElement.rolle,
                                tittel: loggElement.tittel,
                                beskrivelse: loggElement.tekst,
                            };
                        })}
                    />
                </VStack>
            </Activity>
        </Stack>
    );
}
