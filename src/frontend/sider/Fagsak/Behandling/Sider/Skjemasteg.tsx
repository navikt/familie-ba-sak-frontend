import type { ReactNode, PropsWithChildren } from 'react';
import { useEffect } from 'react';

import styled from 'styled-components';

import { Box, Button, ErrorMessage, Heading, VStack } from '@navikt/ds-react';

import { BehandlingPåVentAlert } from '../../../../komponenter/Alert/BehandlingPåVentAlert';
import { MidlertidigEnhetAlert } from '../../../../komponenter/Alert/MidlertidigEnhetAlert';
import { BehandlingSteg } from '../../../../typer/behandling';
import { behandlingErEtterSteg } from '../../../../utils/steg';
import { useBehandlingContext } from '../context/BehandlingContext';

interface IProps extends PropsWithChildren {
    className?: string;
    forrigeKnappTittel?: string;
    forrigeOnClick?: () => void;
    nesteKnappTittel?: string;
    nesteOnClick?: () => void;
    senderInn: boolean;
    tittel: string | ReactNode;
    maxWidthStyle?: string;
    skalDisableNesteKnapp?: boolean;
    skalViseNesteKnapp?: boolean;
    skalViseForrigeKnapp?: boolean;
    feilmelding?: string;
    steg: BehandlingSteg;
}

const StyledErrorMessage = styled(ErrorMessage)`
    margin-top: var(--ax-space-16);
`;

const Navigering = styled.div`
    margin: var(--ax-space-96) 0 var(--ax-space-16);
    display: flex;
    flex-direction: row-reverse;
    justify-content: flex-end;

    button:not(:first-child) {
        margin-right: var(--ax-space-24);
    }
`;

const Skjemasteg = ({
    children,
    className,
    forrigeKnappTittel = 'Forrige steg',
    forrigeOnClick,
    nesteKnappTittel = 'Neste steg',
    nesteOnClick,
    senderInn,
    tittel,
    maxWidthStyle = '40rem',
    skalViseNesteKnapp = true,
    skalDisableNesteKnapp = false,
    skalViseForrigeKnapp = true,
    feilmelding = '',
}: IProps) => {
    const { behandling, vurderErLesevisning } = useBehandlingContext();

    useEffect(() => {
        const skjema = document.getElementById('skjemasteg');
        if (skjema) {
            skjema.scrollIntoView({ block: 'start' });
        }
    }, []);

    const kanGåVidereILesevisning = behandlingErEtterSteg(BehandlingSteg.VURDER_TILBAKEKREVING, behandling);

    function onNesteClicked() {
        if (!senderInn && nesteOnClick) {
            nesteOnClick();
        }
    }

    function onForrigeClicked() {
        if (forrigeOnClick) {
            forrigeOnClick();
        }
    }

    return (
        <Box marginBlock={'space-0 space-128'}>
            <VStack id={'skjemasteg'} paddingInline={'space-32'} paddingBlock={'space-24'} gap={'space-16'}>
                <BehandlingPåVentAlert />
                <MidlertidigEnhetAlert />
                <Box position={'relative'} marginBlock={'space-8'} className={className} maxWidth={maxWidthStyle}>
                    <Heading size={'large'} level={'1'} spacing={true}>
                        {tittel}
                    </Heading>
                    {children}
                    {feilmelding !== '' && <StyledErrorMessage>{feilmelding}</StyledErrorMessage>}
                    <Navigering>
                        {nesteOnClick && skalViseNesteKnapp && (!vurderErLesevisning() || kanGåVidereILesevisning) && (
                            <Button
                                variant={'primary'}
                                onClick={onNesteClicked}
                                loading={senderInn}
                                disabled={senderInn || skalDisableNesteKnapp}
                            >
                                {nesteKnappTittel}
                            </Button>
                        )}
                        {forrigeOnClick && skalViseForrigeKnapp && (
                            <Button variant={'secondary'} onClick={onForrigeClicked}>
                                {forrigeKnappTittel}
                            </Button>
                        )}
                    </Navigering>
                </Box>
            </VStack>
        </Box>
    );
};

export default Skjemasteg;
