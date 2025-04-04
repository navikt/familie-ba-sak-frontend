import * as React from 'react';

import styled from 'styled-components';

import { BodyShort } from '@navikt/ds-react';

import { NavigeringsRetning } from '../../../../../komponenter/Tidslinje/TidslinjeContext';
import TidslinjeNavigering from '../../../../../komponenter/Tidslinje/TidslinjeNavigering';

const FlexColumn = styled.div`
    display: flex;
    flex-direction: column;
`;

interface Props {
    settIndexFramvistÅr: (value: ((prevState: number) => number) | number) => void;
    indexFramvistÅr: number;
    erISisteÅrAvPerioden: boolean;
    aktueltÅr: number;
    årISimuleringen: number[];
}

export const Årsvelger: React.FC<Props> = ({
    settIndexFramvistÅr,
    indexFramvistÅr,
    erISisteÅrAvPerioden,
    aktueltÅr,
    årISimuleringen,
}) => (
    <FlexColumn>
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
    </FlexColumn>
);
