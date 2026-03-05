import * as React from 'react';

import styled from 'styled-components';

import { Heading, Loader, VStack } from '@navikt/ds-react';

const PosisjonertVStack = styled(VStack)`
    position: fixed;
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    top: 20%;
    z-index: 9999;
`;

const SystemetLaster = () => {
    return (
        <PosisjonertVStack gap="space-8">
            <Heading size={'medium'} children={'Systemet laster'} />
            <Loader size="large" transparent={true} title="Systemet laster data" />
        </PosisjonertVStack>
    );
};

export default SystemetLaster;
