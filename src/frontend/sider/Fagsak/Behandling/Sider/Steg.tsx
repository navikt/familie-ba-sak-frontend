import type { PropsWithChildren } from 'react';

import { useScrollOnMount } from '@hooks/useScrollOnMount';
import { BehandlingPåVentAlert } from '@komponenter/Alert/BehandlingPåVentAlert';
import { MidlertidigEnhetAlert } from '@komponenter/Alert/MidlertidigEnhetAlert';

import { Box, type BoxProps, Heading, VStack } from '@navikt/ds-react';

interface Props extends PropsWithChildren {
    tittel: string;
    maxWidth?: BoxProps['maxWidth'];
}

export function Steg({ tittel, maxWidth, children }: Props) {
    const ref = useScrollOnMount<HTMLDivElement>();

    return (
        <Box ref={ref} marginBlock={'space-0 space-128'} maxWidth={maxWidth}>
            <VStack paddingInline={'space-32'} paddingBlock={'space-24'} gap={'space-16'}>
                <BehandlingPåVentAlert />
                <MidlertidigEnhetAlert />
                <Box position={'relative'} marginBlock={'space-8'}>
                    <Heading size={'large'} level={'1'} spacing={true}>
                        {tittel}
                    </Heading>
                    {children}
                </Box>
            </VStack>
        </Box>
    );
}
