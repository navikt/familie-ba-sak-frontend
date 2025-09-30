import type { PropsWithChildren } from 'react';
import * as React from 'react';
import { useEffect } from 'react';

import styled from 'styled-components';

import { Box, Button, ErrorMessage, Heading, VStack } from '@navikt/ds-react';
import { ASpacing24, ASpacing4, ASpacing6 } from '@navikt/ds-tokens/dist/tokens';

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
    tittel: string | React.ReactNode;
    maxWidthStyle?: string;
    skalDisableNesteKnapp?: boolean;
    skalViseNesteKnapp?: boolean;
    skalViseForrigeKnapp?: boolean;
    feilmelding?: string;
    steg: BehandlingSteg;
}

const StyledErrorMessage = styled(ErrorMessage)`
    margin-top: ${ASpacing4};
`;

const Navigering = styled.div`
    margin: ${ASpacing24} 0 ${ASpacing4};
    display: flex;
    flex-direction: row-reverse;
    justify-content: flex-end;

    button:not(:first-child) {
        margin-right: ${ASpacing6};
    }
`;

const Skjemasteg: React.FunctionComponent<IProps> = ({
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
}) => {
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
    );
};

export default Skjemasteg;
