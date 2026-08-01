import { useVersjonsinfo } from '@hooks/useVersjonsinfo';
import { erPreprod } from '@utils/miljø';

import { Detail, HStack } from '@navikt/ds-react';

export function DeployetBranch() {
    const { frontendBranch, backendBranch } = useVersjonsinfo();

    if (!erPreprod()) {
        return null;
    }

    return (
        <HStack gap="space-8" align="center" wrap={false}>
            <Detail textColor="subtle">{`Frontend: ${frontendBranch ?? 'ukjent'}`}</Detail>
            <Detail textColor="subtle">{`Backend: ${backendBranch ?? 'ukjent'}`}</Detail>
        </HStack>
    );
}
