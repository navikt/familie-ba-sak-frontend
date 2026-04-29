import { BodyShort } from '@navikt/ds-react';

import { type IRestValutakurs } from '../../../../../../../typer/eøsPerioder';
import { Datoformat, isoMånedPeriodeTilFormatertString } from '../../../../../../../utils/dato';

interface IStatusBarnCelleOgPeriodeCelleProps {
    valutakurs: IRestValutakurs;
}

export const PeriodeValutakurs = ({ valutakurs }: IStatusBarnCelleOgPeriodeCelleProps) => (
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
