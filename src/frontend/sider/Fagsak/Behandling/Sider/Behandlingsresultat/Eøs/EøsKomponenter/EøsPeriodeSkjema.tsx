import * as React from 'react';

import styled from 'styled-components';

import { Fieldset } from '@navikt/ds-react';
import type { Felt } from '@navikt/familie-skjema';

import MånedÅrVelger from '../../../../../../../Felleskomponenter/MånedÅrInput/MånedÅrVelger';
import type { IIsoMånedPeriode } from '../../../../../../../utils/dato';

const FlexDiv = styled.div`
    width: 32rem;
    display: flex;
    justify-content: space-between;
    font-size: 1rem;

    div {
        z-index: 0;
    }

    div div.skjemaelement {
        margin-bottom: 0;
    }
`;

interface IProps {
    periode: Felt<IIsoMånedPeriode>;
    periodeFeilmeldingId: string;
    initielFom: Felt<string>;
    visFeilmeldinger: boolean;
    lesevisning: boolean;
    className?: string;
}

const EøsPeriodeSkjema: React.FC<IProps> = ({
    periode,
    periodeFeilmeldingId,
    initielFom,
    visFeilmeldinger,
    lesevisning,
    className = '',
}) => {
    const finnÅrTilbakeTil = (): number => {
        return new Date().getFullYear() - new Date(initielFom.verdi).getFullYear();
    };

    return (
        <Fieldset
            className={`${className} ${lesevisning ? 'lesevisning' : ''}`}
            errorId={periodeFeilmeldingId}
            error={visFeilmeldinger && periode.feilmelding}
            legend="Periode"
            size="medium"
        >
            <FlexDiv>
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
        </Fieldset>
    );
};

export default EøsPeriodeSkjema;
