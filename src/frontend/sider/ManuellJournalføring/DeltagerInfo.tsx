import type { ReactNode } from 'react';

import { BodyShort, Box, Heading, HStack } from '@navikt/ds-react';

interface DeltagerProps {
    ikon: ReactNode;
    navn: string;
    ident: string;
    undertittel: string;
    children?: ReactNode | ReactNode[];
}

export const DeltagerInfo = ({ ikon, navn, undertittel, ident }: DeltagerProps) => {
    return (
        <div>
            <HStack>
                <Box marginInline={'space-0 space-16'}>{ikon}</Box>
                <div>
                    <Heading size={'small'} level={'2'}>
                        {ident ? `${navn} | ${ident}` : navn}
                    </Heading>
                    <BodyShort>{undertittel}</BodyShort>
                </div>
            </HStack>
        </div>
    );
};
