import type { PropsWithChildren } from 'react';
import * as React from 'react';
import { useEffect } from 'react';

import { Box, Heading, VStack } from '@navikt/ds-react';

import { BehandlingPåVentAlert } from '../../../../komponenter/Alert/BehandlingPåVentAlert';
import { MidlertidigEnhetAlert } from '../../../../komponenter/Alert/MidlertidigEnhetAlert';

interface Props extends PropsWithChildren {
    tittel: string | React.ReactNode;
    bredde?: string;
}

export function Steg({ tittel, bredde = '40rem', children }: Props) {
    useEffect(() => {
        const skjema = document.getElementById('steg');
        if (skjema) {
            skjema.scrollIntoView({ block: 'start' });
        }
    }, []);

    return (
        <VStack id={'steg'} paddingInline={'space-32'} paddingBlock={'space-24'} gap={'space-16'}>
            <BehandlingPåVentAlert />
            <MidlertidigEnhetAlert />
            <Box position={'relative'} marginBlock={'space-8'} maxWidth={bredde}>
                <Heading size={'large'} level={'1'} spacing={true}>
                    {tittel}
                </Heading>
                {children}
            </Box>
        </VStack>
    );
}
