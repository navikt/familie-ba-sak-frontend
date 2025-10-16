import React from 'react';

import { ExternalLinkIcon } from '@navikt/aksel-icons';
import { HStack, Link } from '@navikt/ds-react';

interface Props {
    label: string;
    onClick: (event: React.UIEvent) => void;
}

export function ExternalLink({ label, onClick }: Props) {
    return (
        <Link href={'#'} target={'_blank'} onClick={onClick}>
            <HStack gap={'space-4'} marginBlock={'space-8 space-0'}>
                {label}
                <ExternalLinkIcon title={label} fontSize={'1.25rem'} />
            </HStack>
        </Link>
    );
}
