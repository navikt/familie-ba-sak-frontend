import { NavigeringsRetning } from '@komponenter/Tidslinje/TidslinjeContext';

import { BodyShort, VStack } from '@navikt/ds-react';

import TidslinjeNavigering from '../../../../../komponenter/Tidslinje/TidslinjeNavigering';

interface Props {
    settIndexFramvistÅr: (value: ((prevState: number) => number) | number) => void;
    indexFramvistÅr: number;
    erISisteÅrAvPerioden: boolean;
    aktueltÅr: number;
    årISimuleringen: number[];
}

export const Årsvelger = ({
    settIndexFramvistÅr,
    indexFramvistÅr,
    erISisteÅrAvPerioden,
    aktueltÅr,
    årISimuleringen,
}: Props) => (
    <VStack>
        <TidslinjeNavigering
            naviger={retning =>
                retning === NavigeringsRetning.VENSTRE
                    ? settIndexFramvistÅr(indexFramvistÅr - 1)
                    : settIndexFramvistÅr(indexFramvistÅr + 1)
            }
            kanNavigereTilHøyre={!erISisteÅrAvPerioden}
            kanNavigereTilVenstre={!(indexFramvistÅr === 0)}
            navigerTilHøyreTittel={`Vis simuleringsresultat for ${aktueltÅr + 1}`}
            navigerTilVenstreTittel={`Vis simuleringsresultat for ${aktueltÅr - 1}`}
        >
            <BodyShort size={'small'}>{årISimuleringen[indexFramvistÅr]}</BodyShort>
        </TidslinjeNavigering>
    </VStack>
);
