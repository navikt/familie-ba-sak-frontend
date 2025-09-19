import React from 'react';

import { BodyShort } from '@navikt/ds-react';

import { type IRestValutakurs } from '../../../../../../../typer/eøsPerioder';
import { Datoformat, isoMånedPeriodeTilFormatertString } from '../../../../../../../utils/dato';

interface IStatusBarnCelleOgPeriodeCelleProps {
    valutakurs: IRestValutakurs;
}

export const PeriodeValutakurs: React.FC<IStatusBarnCelleOgPeriodeCelleProps> = ({ valutakurs }) => (
    <BodyShort size="small">
        {isoMånedPeriodeTilFormatertString({
            periode: {
                fom: valutakurs.fom,
                tom: valutakurs.tom,
            },
            tilFormat: Datoformat.MÅNED_ÅR_KORTNAVN,
        })}
    </BodyShort>
);
