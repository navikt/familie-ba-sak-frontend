import { Heading, Loader, VStack } from '@navikt/ds-react';

import styles from './SystemetLaster.module.css';

const SystemetLaster = () => {
    return (
        <VStack gap="space-8" className={styles.spinner}>
            <Heading size={'medium'} children={'Systemet laster'} />
            <Loader size="large" transparent={true} title="Systemet laster data" />
        </VStack>
    );
};

export default SystemetLaster;
