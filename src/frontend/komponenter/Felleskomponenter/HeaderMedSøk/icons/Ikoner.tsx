import React from 'react';

import {
    MannIkon,
    KvinneIkon,
    NøytralPersonIkon,
    JenteIkon,
    GuttIkon,
} from '@navikt/familie-ikoner';

type IkonerMap = Record<string, React.ReactNode>;

export const ikoner: IkonerMap = {
    FORELDER_MANN: <MannIkon width={32} heigth={32} />,
    FORELDER_KVINNE: <KvinneIkon width={32} heigth={32} />,
    FORELDER_UKJENT: <NøytralPersonIkon width={32} heigth={32} />,
    BARN_KVINNE: <JenteIkon width={32} heigth={32} />,
    BARN_MANN: <GuttIkon width={32} heigth={32} />,
    BARN_UKJENT: <NøytralPersonIkon width={32} heigth={32} />,
    UKJENT_UKJENT: <NøytralPersonIkon width={32} heigth={32} />,
    UKJENT_MANN: <MannIkon width={32} heigth={32} />,
    UKJENT_KVINNE: <KvinneIkon width={32} heigth={32} />,
};
