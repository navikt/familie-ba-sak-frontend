import * as React from 'react';

import styled from 'styled-components';

import { Loader, Heading, VStack } from '@navikt/ds-react';
import { AZIndexTooltip } from '@navikt/ds-tokens/dist/tokens';

const PosisjonertVStack = styled(VStack)`
    position: fixed;
    width: 100vw;
    height: 50vh;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: ${AZIndexTooltip};
`;

const SystemetLaster = () => {
    return (
        <PosisjonertVStack gap="2">
            <Heading size={'medium'} children={'Systemet laster'} />
            <Loader size="large" transparent={true} title="Systemet laster data" />
        </PosisjonertVStack>
    );
};

export default SystemetLaster;
