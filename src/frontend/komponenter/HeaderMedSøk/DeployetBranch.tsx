import { useVersjonsinfo } from '@hooks/useVersjonsinfo';
import { erPreprod } from '@utils/miljø';

import { Detail, HStack } from '@navikt/ds-react';

import Styles from './DeployetBranch.module.css';

export function DeployetBranch() {
    const { laster, frontendBranch, backendBranch } = useVersjonsinfo();

    if (!erPreprod() || laster) {
        return null;
    }

    return (
        <HStack gap="space-8" align="center" wrap={false} className={Styles.deployetBranch}>
            <Detail textColor="subtle">{`Frontend: ${frontendBranch ?? 'ukjent'}`}</Detail>
            <Detail textColor="subtle">{`Backend: ${backendBranch ?? 'ukjent'}`}</Detail>
        </HStack>
    );
}
