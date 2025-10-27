import * as React from 'react';
import { Activity } from 'react';

import styled from 'styled-components';

import { ChevronLeftIcon, ChevronRightIcon } from '@navikt/aksel-icons';
import { Button, Stack, VStack } from '@navikt/ds-react';
import { ASurfaceDefault } from '@navikt/ds-tokens/dist/tokens';
import { hentDataFraRessursMedFallback } from '@navikt/familie-typer';

import Behandlingskort from './Behandlingskort';
import Hendelsesoversikt from './Hendelsesoversikt/Hendelsesoversikt';
import type { Hendelse } from './Hendelsesoversikt/typer';
import { useHøyremeny } from './useHøyremeny';
import type { ILogg } from '../../../../typer/logg';
import { Datoformat, isoStringTilFormatertString } from '../../../../utils/dato';
import { useBrukerContext } from '../../BrukerContext';
import { useBehandlingContext } from '../context/BehandlingContext';

const ToggleVisningHøyremeny = styled(Button)`
    position: absolute;
    margin-left: -21px;
    top: 370px;
    width: 34px;
    min-width: 34px;
    height: 34px;
    border-radius: 50%;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    background-color: ${ASurfaceDefault};
    z-index: 10;
`;

export function Høyremeny() {
    const { behandling, logg, hentLogg } = useBehandlingContext();
    const { bruker } = useBrukerContext();

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
            <ToggleVisningHøyremeny
                title={erÅpen ? 'Skjul høyremeny' : 'Vis høyremeny'}
                aria-label={erÅpen ? 'Skjul høyremeny' : 'Vis høyremeny'}
                variant={'secondary'}
                size={'small'}
                icon={icon}
                onMouseDown={e => e.preventDefault()}
                onClick={() => settErÅpen(prev => !prev)}
            />
            <Activity mode={erÅpen ? 'visible' : 'hidden'}>
                <VStack width={'25rem'}>
                    <Behandlingskort åpenBehandling={behandling} />
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
                        åpenBehandling={behandling}
                        bruker={bruker}
                    />
                </VStack>
            </Activity>
        </Stack>
    );
}
