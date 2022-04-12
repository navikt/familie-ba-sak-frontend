import * as React from 'react';

import styled from 'styled-components';

import { SkjemaGruppe } from 'nav-frontend-skjema';

import { Label } from '@navikt/ds-react';
import { type FeltState, Valideringsstatus } from '@navikt/familie-skjema';

import type { IKompetanse } from '../../../../typer/kompetanse';
import { nyYearMonthPeriode } from '../../../../utils/kalender';
import MånedÅrVelger from '../../../Felleskomponenter/MånedÅrInput/MånedÅrVelger';
import { kompetansePeriodeFeilmeldingId } from './KompetanseSkjema';

const StyledLegend = styled.legend`
    && {
        display: flex;
        margin-bottom: 0;
    }
`;

const FlexDiv = styled.div`
    width: 28rem;
    display: flex;
    justify-content: space-between;

    div {
        z-index: 0;
    }

    div div.skjemaelement {
        margin-bottom: 0rem;
    }
`;

interface IProps {
    redigerbartKompetanse: FeltState<IKompetanse>;
    visFeilmeldinger: boolean;
    lesevisning: boolean;
    validerOgSettRedigerbartKompetanse: (endretKompetanse: FeltState<IKompetanse>) => void;
}

const EndreKompetansePeriode: React.FC<IProps> = ({
    redigerbartKompetanse,
    visFeilmeldinger,
    lesevisning,
    validerOgSettRedigerbartKompetanse,
}) => {
    const finnÅrTilbakeTil = (): number => {
        return (
            new Date().getFullYear() -
            new Date(redigerbartKompetanse.verdi.initielFom).getFullYear()
        );
    };

    return (
        <SkjemaGruppe
            className={lesevisning ? 'lesevisning' : ''}
            feilmeldingId={kompetansePeriodeFeilmeldingId(redigerbartKompetanse)}
            feil={
                visFeilmeldinger &&
                redigerbartKompetanse.verdi?.periode.valideringsstatus === Valideringsstatus.FEIL
                    ? redigerbartKompetanse.verdi.periode.feilmelding
                    : ''
            }
        >
            <StyledLegend>
                <Label size="small">Periode</Label>
            </StyledLegend>
            <FlexDiv>
                <MånedÅrVelger
                    lesevisning={lesevisning}
                    id={`periode_fom`}
                    label={'F.o.m'}
                    antallÅrTilbake={finnÅrTilbakeTil()}
                    antallÅrFrem={0}
                    value={
                        redigerbartKompetanse.verdi?.periode.verdi?.fom
                            ? redigerbartKompetanse.verdi?.periode.verdi?.fom
                            : undefined
                    }
                    onEndret={årMåned => {
                        if (årMåned === redigerbartKompetanse.verdi.periode.verdi.fom) {
                            // fom ikke endret
                            return;
                        }
                        validerOgSettRedigerbartKompetanse({
                            ...redigerbartKompetanse,
                            verdi: {
                                ...redigerbartKompetanse.verdi,
                                periode: {
                                    ...redigerbartKompetanse.verdi.periode,
                                    verdi: nyYearMonthPeriode(
                                        årMåned,
                                        redigerbartKompetanse.verdi.periode.verdi.tom
                                    ),
                                },
                            },
                        });
                    }}
                />
                <MånedÅrVelger
                    lesevisning={lesevisning}
                    id={`periode_tom`}
                    label={'T.o.m (valgfri)'}
                    antallÅrTilbake={finnÅrTilbakeTil()}
                    antallÅrFrem={0}
                    value={
                        redigerbartKompetanse.verdi?.periode.verdi.tom
                            ? redigerbartKompetanse.verdi?.periode.verdi.tom
                            : undefined
                    }
                    onEndret={årMåned => {
                        if (årMåned === redigerbartKompetanse.verdi.periode.verdi.tom) {
                            // tom ikke endret
                            return;
                        }
                        validerOgSettRedigerbartKompetanse({
                            ...redigerbartKompetanse,
                            verdi: {
                                ...redigerbartKompetanse.verdi,
                                periode: {
                                    ...redigerbartKompetanse.verdi.periode,
                                    verdi: nyYearMonthPeriode(
                                        redigerbartKompetanse.verdi?.periode.verdi.fom,
                                        årMåned
                                    ),
                                },
                            },
                        });
                    }}
                />
            </FlexDiv>
        </SkjemaGruppe>
    );
};

export default EndreKompetansePeriode;
