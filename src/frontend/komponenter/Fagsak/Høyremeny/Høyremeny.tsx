import * as React from 'react';

import styled from 'styled-components';

import { ChevronLeftIcon, ChevronRightIcon } from '@navikt/aksel-icons';
import { Button } from '@navikt/ds-react';
import { ASurfaceDefault } from '@navikt/ds-tokens/dist/tokens';
import { hentDataFraRessursMedFallback, RessursStatus } from '@navikt/familie-typer';

import { useBehandling } from '../../../context/behandlingContext/BehandlingContext';
import type { ILogg } from '../../../typer/logg';
import { formaterIsoDato, Datoformat } from '../../../utils/formatter';
import Hendelsesoversikt from '../../Felleskomponenter/Hendelsesoversikt/Hendelsesoversikt';
import type { Hendelse } from '../../Felleskomponenter/Hendelsesoversikt/typer';
import Behandlingskort from '../Behandlingskort/Behandlingskort';

const ToggleVisningHøyremeny = styled(Button)`
    position: absolute;
    margin-left: ${(props: { åpenhøyremeny: boolean }) =>
        !props.åpenhøyremeny ? '-20px' : '-17px'};
    top: 370px;
    width: 34px;
    min-width: 34px;
    height: 34px;
    padding: 0px;
    border-radius: 50%;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    background-color: ${ASurfaceDefault};
`;

const Høyremeny: React.FunctionComponent = () => {
    const { åpenBehandling, logg, hentLogg, åpenHøyremeny, settÅpenHøyremeny } = useBehandling();

    React.useEffect(() => {
        if (åpenBehandling && åpenBehandling.status === RessursStatus.SUKSESS) {
            hentLogg();
        }
    }, [åpenBehandling]);

    return åpenBehandling.status === RessursStatus.SUKSESS ? (
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
                        <Behandlingskort åpenBehandling={åpenBehandling.data} />
                        <Hendelsesoversikt
                            hendelser={hentDataFraRessursMedFallback(logg, []).map(
                                (loggElement: ILogg): Hendelse => {
                                    return {
                                        id: loggElement.id.toString(),
                                        dato: formaterIsoDato(
                                            loggElement.opprettetTidspunkt,
                                            Datoformat.DATO_TID
                                        ),
                                        utførtAv: loggElement.opprettetAv,
                                        rolle: loggElement.rolle,
                                        tittel: loggElement.tittel,
                                        beskrivelse: loggElement.tekst,
                                    };
                                }
                            )}
                            åpenBehandling={åpenBehandling.data}
                        />
                    </>
                )}
            </div>
        </>
    ) : null;
};

export default Høyremeny;
