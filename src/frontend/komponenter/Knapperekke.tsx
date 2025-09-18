import type { PropsWithChildren } from 'react';
import React from 'react';

import { HStack } from '@navikt/ds-react';

const Knapperekke: React.FC<PropsWithChildren> = ({ children }) => {
    return (
        <HStack marginBlock="space-16 0" justify="space-between">
            {children}
        </HStack>
    );
};

export default Knapperekke;
