import type { PropsWithChildren } from 'react';

import { HStack } from '@navikt/ds-react';

const Knapperekke = ({ children }: PropsWithChildren) => {
    return (
        <HStack marginBlock="space-16 space-0" justify="space-between">
            {children}
        </HStack>
    );
};

export default Knapperekke;
