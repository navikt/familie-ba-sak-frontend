import type { PropsWithChildren } from 'react';
import React from 'react';

import { ChevronLeftIcon, ChevronRightIcon } from '@navikt/aksel-icons';
import { Button, HStack } from '@navikt/ds-react';

import { NavigeringsRetning } from './TidslinjeContext';

interface IProps extends PropsWithChildren {
    naviger: (retning: NavigeringsRetning) => void;
    kanNavigereTilHøyre?: boolean;
    kanNavigereTilVenstre?: boolean;
    navigerTilVenstreTittel?: string;
    navigerTilHøyreTittel?: string;
}

const TidslinjeNavigering: React.FC<IProps> = ({
    naviger,
    kanNavigereTilHøyre = true,
    kanNavigereTilVenstre = true,
    navigerTilVenstreTittel = 'Naviger til venstre i tidslinjen',
    navigerTilHøyreTittel = 'Naviger til høyre i tidslinjen',
    children,
}) => {
    return (
        <HStack gap={'space-12'}>
            <Button
                title={navigerTilVenstreTittel}
                variant="tertiary"
                size="small"
                disabled={!kanNavigereTilVenstre}
                onClick={() => naviger(NavigeringsRetning.VENSTRE)}
                icon={<ChevronLeftIcon title={navigerTilVenstreTittel} fontSize={'1.8rem'} />}
            />
            {children && <HStack align={'center'}>{children}</HStack>}
            <Button
                title={navigerTilHøyreTittel}
                variant="tertiary"
                size="small"
                disabled={!kanNavigereTilHøyre}
                onClick={() => naviger(NavigeringsRetning.HØYRE)}
                icon={<ChevronRightIcon title={navigerTilHøyreTittel} fontSize={'1.8rem'} />}
            />
        </HStack>
    );
};

export default TidslinjeNavigering;
