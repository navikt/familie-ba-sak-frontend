import type { PropsWithChildren, ReactNode } from 'react';
import { useEffect } from 'react';

import { useBehandling } from '@hooks/useBehandling';
import { useErLesevisning } from '@hooks/useErLesevisning';
import { BehandlingPåVentAlert } from '@komponenter/Alert/BehandlingPåVentAlert';
import { MidlertidigEnhetAlert } from '@komponenter/Alert/MidlertidigEnhetAlert';
import { BehandlingSteg } from '@typer/behandling';
import { behandlingErEtterSteg } from '@utils/steg';

import { Box, Button, ErrorMessage, Heading, Stack, VStack } from '@navikt/ds-react';

export const MAX_SKJEMASTEG_BREDDE = '1440px';

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
    const behandling = useBehandling();
    const erLesevisning = useErLesevisning();

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
                    {feilmelding !== '' && (
                        <Box marginBlock={'space-16 space-0'}>
                            <ErrorMessage>{'feilmelding'}</ErrorMessage>
                        </Box>
                    )}
                    <Stack
                        direction={'row-reverse'}
                        justify={'start'}
                        marginBlock={'space-96 space-16'}
                        marginInline={'space-0'}
                        gap={'space-24'}
                    >
                        {nesteOnClick && skalViseNesteKnapp && (!erLesevisning || kanGåVidereILesevisning) && (
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
                    </Stack>
                </Box>
            </VStack>
        </Box>
    );
};

export default Skjemasteg;
