import { mockSøker } from '../../utils/test/person/person.mock';
import { YtelseType } from '../beregning';
import type { IGrunnlagPerson } from '../person';
import type { IUtbetalingsperiodeDetalj } from '../vedtaksperiode';

interface IMockUtbetalingsperiodeDetalj {
    person?: IGrunnlagPerson;
    ytelseType?: YtelseType;
    utbetaltPerMnd?: number;
    erPåvirketAvEndring?: boolean;
}

export const lagUtbetalingsperiodeDetalj = ({
    person = mockSøker(),
    ytelseType = YtelseType.ORDINÆR_BARNETRYGD,
    utbetaltPerMnd = 0,
    erPåvirketAvEndring = false,
}: IMockUtbetalingsperiodeDetalj = {}): IUtbetalingsperiodeDetalj => ({
    person: person,
    ytelseType: ytelseType,
    utbetaltPerMnd: utbetaltPerMnd,
    erPåvirketAvEndring: erPåvirketAvEndring,
});
