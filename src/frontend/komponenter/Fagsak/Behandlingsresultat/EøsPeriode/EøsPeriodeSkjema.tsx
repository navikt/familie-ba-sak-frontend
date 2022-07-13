import * as React from 'react';

import styled from 'styled-components';

import { SkjemaGruppe } from 'nav-frontend-skjema';

import { Label } from '@navikt/ds-react';
import type { Felt } from '@navikt/familie-skjema';

import type { IYearMonthPeriode } from '../../../../utils/kalender';
import MånedÅrVelger from '../../../Felleskomponenter/MånedÅrInput/MånedÅrVelger';

const StyledLegend = styled.legend`
    && {
        display: flex;
        margin-bottom: 0;
    }
`;

const FlexDiv = styled.div`
    width: ${(props: { maxWidth?: number }) => (props.maxWidth ? `${props.maxWidth}rem` : '28rem')};
    display: flex;
    justify-content: space-between;
    font-size: 1rem;

    div {
        z-index: 0;
    }

    div div.skjemaelement {
        margin-bottom: 0rem;
    }
`;

interface IProps {
    periode: Felt<IYearMonthPeriode>;
    periodeFeilmeldingId: string;
    initielFom: Felt<string>;
    visFeilmeldinger: boolean;
    lesevisning: boolean;
    maxWidth?: number;
}

const EøsPeriodeSkjema: React.FC<IProps> = ({
    periode,
    periodeFeilmeldingId,
    initielFom,
    visFeilmeldinger,
    lesevisning,
    maxWidth,
}) => {
    const finnÅrTilbakeTil = (): number => {
        return new Date().getFullYear() - new Date(initielFom.verdi).getFullYear();
    };

    return (
        <SkjemaGruppe
            className={lesevisning ? 'lesevisning' : ''}
            feilmeldingId={periodeFeilmeldingId}
            feil={visFeilmeldinger && periode.feilmelding}
        >
            <StyledLegend>
                <Label size="small">Periode</Label>
            </StyledLegend>
            <FlexDiv maxWidth={maxWidth}>
                <MånedÅrVelger
                    lesevisning={lesevisning}
                    id={`periode_fom`}
                    label={'F.o.m'}
                    antallÅrTilbake={finnÅrTilbakeTil()}
                    antallÅrFrem={0}
                    value={periode.verdi?.fom ? periode.verdi?.fom : undefined}
                    onEndret={årMåned => {
                        if (årMåned === periode.verdi.fom) {
                            // fom ikke endret
                            return;
                        }
                        periode.validerOgSettFelt({
                            ...periode.verdi,
                            fom: årMåned,
                        });
                    }}
                />
                <MånedÅrVelger
                    lesevisning={lesevisning}
                    id={`periode_tom`}
                    label={'T.o.m (valgfri)'}
                    antallÅrTilbake={finnÅrTilbakeTil()}
                    antallÅrFrem={0}
                    value={periode.verdi.tom ? periode.verdi.tom : undefined}
                    onEndret={årMåned => {
                        if (årMåned === periode.verdi.tom) {
                            // tom ikke endret
                            return;
                        }
                        periode.validerOgSettFelt({
                            ...periode.verdi,
                            tom: årMåned,
                        });
                    }}
                />
            </FlexDiv>
        </SkjemaGruppe>
    );
};

export default EøsPeriodeSkjema;
