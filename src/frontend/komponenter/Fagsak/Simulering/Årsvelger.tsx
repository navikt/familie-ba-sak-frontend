import * as React from 'react';

import styled from 'styled-components';

import { Detail } from '@navikt/ds-react';

import { NavigeringsRetning } from '../../../context/TidslinjeContext';
import TidslinjeNavigering from '../Behandlingsresultat/TidslinjeNavigering';

const ÅrsvelgerStyle = styled.div`
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
    <ÅrsvelgerStyle>
        <TidslinjeNavigering
            naviger={retning =>
                retning === NavigeringsRetning.VENSTRE
                    ? settIndexFramvistÅr(indexFramvistÅr - 1)
                    : settIndexFramvistÅr(indexFramvistÅr + 1)
            }
            kanNavigereTilHøyre={!erISisteÅrAvPerioden}
            kanNavigereTilVenstre={!(indexFramvistÅr === 0)}
            navigerTilHyøyreTittel={`Vis simuleringsresultat for ${aktueltÅr + 1}`}
            navigerTilVenstreTittel={`Vis simuleringsresultat for ${aktueltÅr - 1}`}
        >
            <Detail>{årISimuleringen[indexFramvistÅr]}</Detail>
        </TidslinjeNavigering>
    </ÅrsvelgerStyle>
);
