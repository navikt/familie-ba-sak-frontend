import type { ReactNode } from 'react';

import styled from 'styled-components';

import { StarsEuIcon, FlagCrossIcon } from '@navikt/aksel-icons';

import { Regelverk } from '../typer/vilkår';

const NorskFlaggIkon = styled(FlagCrossIcon)`
    font-size: 1.5rem;
    min-width: 1.5rem;
`;

const EuIkon = styled(StarsEuIcon)`
    font-size: 1.5rem;
    min-width: 1.5rem;
`;

export const alleRegelverk: Record<Regelverk, { tekst: string; symbol: ReactNode }> = {
    [Regelverk.NASJONALE_REGLER]: {
        tekst: 'Nasjonale regler',
        symbol: <NorskFlaggIkon />,
    },
    [Regelverk.EØS_FORORDNINGEN]: {
        tekst: 'EØS-forordningen',
        symbol: <EuIkon />,
    },
};
