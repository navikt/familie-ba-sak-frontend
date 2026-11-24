import { useErNyttOppsett } from '@hooks/useKonsept';
import { useScrollOnMount } from '@hooks/useScrollOnMount';
import { BehandlingPåVentAlert } from '@komponenter/Alert/BehandlingPåVentAlert';
import { MidlertidigEnhetAlert } from '@komponenter/Alert/MidlertidigEnhetAlert';
import { Box, type BoxProps, Heading, VStack } from '@navikt/ds-react';
import type { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
    tittel: string;
    maxWidth?: BoxProps['maxWidth'];
}

export function Steg({ tittel, maxWidth, children }: Props) {
    const ref = useScrollOnMount<HTMLDivElement>();
    const erNyttOppsett = useErNyttOppsett();

    return (
        <Box ref={ref} marginBlock={'space-0 space-128'} maxWidth={maxWidth}>
            <VStack
                paddingInline={erNyttOppsett ? 'space-20' : 'space-32'}
                paddingBlock={erNyttOppsett ? 'space-12' : 'space-24'}
                gap={'space-16'}
            >
                <BehandlingPåVentAlert />
                <MidlertidigEnhetAlert />
                <Box position={'relative'} marginBlock={'space-8'}>
                    <Box marginBlock={erNyttOppsett ? 'space-0 space-12' : undefined}>
                        <Heading size={'large'} level={'1'} spacing={!erNyttOppsett}>
                            {tittel}
                        </Heading>
                    </Box>
                    {children}
                </Box>
            </VStack>
        </Box>
    );
}
