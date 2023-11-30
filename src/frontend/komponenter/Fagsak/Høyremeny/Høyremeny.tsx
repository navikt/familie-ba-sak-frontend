import * as React from 'react';

import styled from 'styled-components';

import { ChevronLeftIcon, ChevronRightIcon } from '@navikt/aksel-icons';
import { Button } from '@navikt/ds-react';
import { ASurfaceDefault } from '@navikt/ds-tokens/dist/tokens';
import { hentDataFraRessursMedFallback } from '@navikt/familie-typer';

import { useBehandling } from '../../../context/behandlingContext/BehandlingContext';
import type { ILogg } from '../../../typer/logg';
import type { IPersonInfo } from '../../../typer/person';
import { Datoformat, isoStringTilFormatertString } from '../../../utils/dato';
import Hendelsesoversikt from '../../Felleskomponenter/Hendelsesoversikt/Hendelsesoversikt';
import type { Hendelse } from '../../Felleskomponenter/Hendelsesoversikt/typer';
import Behandlingskort from '../Behandlingskort/Behandlingskort';

interface Props {
    bruker: IPersonInfo;
}

const ToggleVisningHøyremeny = styled(Button)`
    position: absolute;
    margin-left: ${(props: { åpenhøyremeny: boolean }) =>
        !props.åpenhøyremeny ? '-20px' : '-17px'};
    top: 370px;
    width: 34px;
    min-width: 34px;
    height: 34px;
    padding: 0;
    border-radius: 50%;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    background-color: ${ASurfaceDefault};
`;

const Høyremeny: React.FunctionComponent<Props> = ({ bruker }) => {
    const { behandling, logg, hentLogg, åpenHøyremeny, settÅpenHøyremeny } = useBehandling();

    React.useEffect(() => {
        hentLogg();
    }, [behandling]);

    return (
        <>
            <div className={åpenHøyremeny ? 'høyremeny' : ''}>
                <ToggleVisningHøyremeny
                    variant="secondary"
                    onMouseDown={(e: React.MouseEvent) => e.preventDefault()}
                    onClick={() => {
                        settÅpenHøyremeny(!åpenHøyremeny);
                    }}
                    size="small"
                    aria-label="Skjul høyremeny"
                    åpenhøyremeny={åpenHøyremeny ? 1 : 0}
                    title={åpenHøyremeny ? 'Skjul høyremeny' : 'Vis høyremeny'}
                    icon={
                        åpenHøyremeny ? (
                            <ChevronRightIcon aria-label="Skjul høyremeny" />
                        ) : (
                            <ChevronLeftIcon aria-label="Vis høyremeny" />
                        )
                    }
                />
                {åpenHøyremeny && (
                    <>
                        <Behandlingskort åpenBehandling={behandling} />
                        <Hendelsesoversikt
                            hendelser={hentDataFraRessursMedFallback(logg, []).map(
                                (loggElement: ILogg): Hendelse => {
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
                                }
                            )}
                            åpenBehandling={behandling}
                            bruker={bruker}
                        />
                    </>
                )}
            </div>
        </>
    );
};

export default Høyremeny;
