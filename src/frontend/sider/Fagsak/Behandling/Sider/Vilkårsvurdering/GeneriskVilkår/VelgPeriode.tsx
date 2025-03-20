import React from 'react';

import { endOfMonth } from 'date-fns';
import styled from 'styled-components';

import { HelpText, Label, Fieldset } from '@navikt/ds-react';
import { Valideringsstatus } from '@navikt/familie-skjema';
import type { FeltState } from '@navikt/familie-skjema';

import { vilkårPeriodeFeilmeldingId } from './VilkårTabell';
import { useBehandling } from '../../../../../../context/behandlingContext/BehandlingContext';
import DatovelgerForGammelSkjemaløsning from '../../../../../../komponenter/datovelger/DatovelgerForGammelSkjemaløsning';
import type { IVilkårResultat } from '../../../../../../typer/vilkår';
import { Resultat } from '../../../../../../typer/vilkår';
import type { IsoDatoString } from '../../../../../../utils/dato';
import { dagensDato, nyIsoDatoPeriode } from '../../../../../../utils/dato';

interface IProps {
    redigerbartVilkår: FeltState<IVilkårResultat>;
    validerOgSettRedigerbartVilkår: (redigerbartVilkår: FeltState<IVilkårResultat>) => void;
    visFeilmeldinger: boolean;
}

const StyledLegend = styled.legend`
    && {
        display: flex;
        margin-bottom: 0;
    }
`;

const StyledLabel = styled(Label)`
    margin-right: 0.5rem;
`;

const FlexDiv = styled.div`
    display: flex;
    gap: 1.125rem;
`;

const VelgPeriode: React.FC<IProps> = ({
    redigerbartVilkår,
    validerOgSettRedigerbartVilkår,
    visFeilmeldinger,
}) => {
    const { vurderErLesevisning } = useBehandling();
    const erLesevisning = vurderErLesevisning();

    return (
        <Fieldset
            errorId={vilkårPeriodeFeilmeldingId(redigerbartVilkår.verdi)}
            error={
                redigerbartVilkår.verdi.periode.valideringsstatus === Valideringsstatus.FEIL &&
                visFeilmeldinger
                    ? redigerbartVilkår.verdi.periode.feilmelding
                    : ''
            }
            legend="Periode for vurderingen"
            hideLegend
        >
            {!erLesevisning && (
                <StyledLegend>
                    <StyledLabel>Velg periode</StyledLabel>
                    <HelpText title="Hvordan fastsette periode">
                        Oppgi startdato/periode hvor vilkåret er oppfylt/ikke oppfylt.
                        Virkningstidspunktet vil bli beregnet ut fra dette. Dersom vurderingen
                        gjelder et avslag er ikke periode påkrevd.
                    </HelpText>
                </StyledLegend>
            )}

            <FlexDiv>
                <DatovelgerForGammelSkjemaløsning
                    label={
                        redigerbartVilkår.verdi.resultat.verdi === Resultat.IKKE_OPPFYLT &&
                        redigerbartVilkår.verdi.erEksplisittAvslagPåSøknad
                            ? 'F.o.m (valgfri)'
                            : 'F.o.m'
                    }
                    value={redigerbartVilkår.verdi.periode.verdi.fom}
                    onDateChange={(dato?: IsoDatoString) => {
                        validerOgSettRedigerbartVilkår({
                            ...redigerbartVilkår,
                            verdi: {
                                ...redigerbartVilkår.verdi,
                                periode: {
                                    ...redigerbartVilkår.verdi.periode,
                                    verdi: nyIsoDatoPeriode(
                                        dato,
                                        redigerbartVilkår.verdi.periode.verdi.tom
                                    ),
                                },
                            },
                        });
                    }}
                    visFeilmeldinger={false}
                    readOnly={erLesevisning}
                    maksDatoAvgrensning={endOfMonth(dagensDato)}
                />
                <DatovelgerForGammelSkjemaløsning
                    label={'T.o.m (valgfri)'}
                    value={redigerbartVilkår.verdi.periode.verdi.tom}
                    onDateChange={(dato?: IsoDatoString) => {
                        validerOgSettRedigerbartVilkår({
                            ...redigerbartVilkår,
                            verdi: {
                                ...redigerbartVilkår.verdi,
                                periode: {
                                    ...redigerbartVilkår.verdi.periode,
                                    verdi: nyIsoDatoPeriode(
                                        redigerbartVilkår.verdi.periode.verdi.fom,
                                        dato
                                    ),
                                },
                            },
                        });
                    }}
                    visFeilmeldinger={false}
                    readOnly={erLesevisning}
                />
            </FlexDiv>
        </Fieldset>
    );
};

export default VelgPeriode;
