import * as React from 'react';

import styled from 'styled-components';

import { SkjemaGruppe } from 'nav-frontend-skjema';

import { Label } from '@navikt/ds-react';
import type { ISkjema } from '@navikt/familie-skjema';

import type { IBehandling } from '../../../../typer/behandling';
import type { IUtenlandskPeriodeBeløp } from '../../../../typer/kompetanse';
import MånedÅrVelger from '../../../Felleskomponenter/MånedÅrInput/MånedÅrVelger';

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

const utenlandskPeriodeBeløpFeilmeldingId = (
    utenlandskPeriodeBeløp: ISkjema<IUtenlandskPeriodeBeløp, IBehandling>
): string =>
    `utd_beløp-periode_${utenlandskPeriodeBeløp.felter.barnIdenter.verdi.map(
        barn => `${barn.value}`
    )}_${utenlandskPeriodeBeløp.felter.initielFom.verdi}`;

interface IProps {
    skjema: ISkjema<IUtenlandskPeriodeBeløp, IBehandling>;
    lesevisning: boolean;
}

const EndreUtenlandskPeriodeBeløp: React.FC<IProps> = ({ skjema, lesevisning }) => {
    const finnÅrTilbakeTil = (): number => {
        return new Date().getFullYear() - new Date(skjema.felter.initielFom.verdi).getFullYear();
    };

    return (
        <SkjemaGruppe
            className={lesevisning ? 'lesevisning' : ''}
            feilmeldingId={utenlandskPeriodeBeløpFeilmeldingId(skjema)}
            feil={skjema.visFeilmeldinger && skjema.felter.periode.feilmelding}
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
                        skjema.felter.periode.verdi?.fom
                            ? skjema.felter.periode.verdi?.fom
                            : undefined
                    }
                    onEndret={årMåned => {
                        if (årMåned === skjema.felter.periode.verdi.fom) {
                            // fom ikke endret
                            return;
                        }
                        skjema.felter.periode.validerOgSettFelt({
                            ...skjema.felter.periode.verdi,
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
                    value={
                        skjema.felter.periode.verdi.tom
                            ? skjema.felter.periode.verdi.tom
                            : undefined
                    }
                    onEndret={årMåned => {
                        if (årMåned === skjema.felter.periode.verdi.tom) {
                            // tom ikke endret
                            return;
                        }
                        skjema.felter.periode.validerOgSettFelt({
                            ...skjema.felter.periode.verdi,
                            tom: årMåned,
                        });
                    }}
                />
            </FlexDiv>
        </SkjemaGruppe>
    );
};

export default EndreUtenlandskPeriodeBeløp;
