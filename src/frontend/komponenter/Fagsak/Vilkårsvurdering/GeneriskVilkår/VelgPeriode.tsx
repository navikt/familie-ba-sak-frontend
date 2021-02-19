import React from 'react';

import styled from 'styled-components';

import navFarger from 'nav-frontend-core';
import Hjelpetekst from 'nav-frontend-hjelpetekst';
import { SkjemaGruppe } from 'nav-frontend-skjema';
import { Element } from 'nav-frontend-typografi';

import { FamilieDatovelger, ISODateString } from '@navikt/familie-form-elements';
import { FeltState, Valideringsstatus } from '@navikt/familie-skjema';

import { useBehandling } from '../../../../context/BehandlingContext';
import { nyPeriode } from '../../../../typer/periode';
import { IVilkårResultat, Resultat } from '../../../../typer/vilkår';
import { datoformatNorsk } from '../../../../utils/formatter';
import { vilkårPeriodeFeilmeldingId } from './VilkårTabell';

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

const StyledElement = styled(Element)`
    margin-right: 0.5rem;
`;

const MarginSkjemaGruppe = styled(SkjemaGruppe)`
    margin-bottom: 1rem !important;
`;

const FlexDiv = styled.div`
    width: 23rem;
    display: flex;
    justify-content: space-between;
    & .lese-element {
        width: 50%;
    }
    .skjemaelement__label {
        color: ${navFarger.navMorkGra};
        font-size: 16px;
        font-weight: normal;
        height: 22px;
        line-height: 22px;
    }
`;

const VelgPeriode: React.FC<IProps> = ({
    redigerbartVilkår,
    validerOgSettRedigerbartVilkår,
    visFeilmeldinger,
}) => {
    const { erLesevisning } = useBehandling();
    const lesevisning = erLesevisning();

    return (
        <MarginSkjemaGruppe
            feilmeldingId={vilkårPeriodeFeilmeldingId(redigerbartVilkår.verdi)}
            feil={
                redigerbartVilkår.verdi.periode.valideringsstatus === Valideringsstatus.FEIL &&
                visFeilmeldinger
                    ? redigerbartVilkår.verdi.periode.feilmelding
                    : ''
            }
        >
            {!lesevisning && (
                <StyledLegend>
                    <StyledElement>Velg periode</StyledElement>
                    <Hjelpetekst tittel={'Hjelpetekst fastsett periode'}>
                        {
                            'Oppgi startdato/periode hvor vilkåret er oppfylt/ikke oppfylt. Virkningstidspunktet vil bli beregnet ut fra dette. Dersom vurderingen gjelder et avslag er ikke periode påkrevd.'
                        }
                    </Hjelpetekst>
                </StyledLegend>
            )}

            <FlexDiv>
                {(!lesevisning || redigerbartVilkår.verdi.periode.verdi.fom) && (
                    <div>
                        <FamilieDatovelger
                            allowInvalidDateSelection={false}
                            limitations={{
                                maxDate: new Date().toISOString(),
                            }}
                            erLesesvisning={lesevisning}
                            id={`${vilkårPeriodeFeilmeldingId(
                                redigerbartVilkår.verdi
                            )}__fastsett-periode-fom`}
                            label={
                                redigerbartVilkår.verdi.resultat.verdi === Resultat.IKKE_OPPFYLT &&
                                redigerbartVilkår.verdi.erEksplisittAvslagPåSøknad
                                    ? 'F.o.m (valgfri)'
                                    : 'F.o.m'
                            }
                            placeholder={datoformatNorsk.DATO}
                            onChange={(dato?: ISODateString) => {
                                validerOgSettRedigerbartVilkår({
                                    ...redigerbartVilkår,
                                    verdi: {
                                        ...redigerbartVilkår.verdi,
                                        periode: {
                                            ...redigerbartVilkår.verdi.periode,
                                            verdi: nyPeriode(
                                                dato,
                                                redigerbartVilkår.verdi.periode.verdi.tom
                                            ),
                                        },
                                    },
                                });
                            }}
                            valgtDato={redigerbartVilkår.verdi.periode.verdi.fom}
                        />
                    </div>
                )}
                {(!lesevisning || redigerbartVilkår.verdi.periode.verdi.tom) && (
                    <div>
                        <FamilieDatovelger
                            erLesesvisning={lesevisning}
                            id={`${vilkårPeriodeFeilmeldingId(
                                redigerbartVilkår.verdi
                            )}__fastsett-periode-tom`}
                            label={'T.o.m (valgfri)'}
                            placeholder={datoformatNorsk.DATO}
                            onChange={(dato?: ISODateString) => {
                                validerOgSettRedigerbartVilkår({
                                    ...redigerbartVilkår,
                                    verdi: {
                                        ...redigerbartVilkår.verdi,
                                        periode: {
                                            ...redigerbartVilkår.verdi.periode,
                                            verdi: nyPeriode(
                                                redigerbartVilkår.verdi.periode.verdi.fom,
                                                dato
                                            ),
                                        },
                                    },
                                });
                            }}
                            valgtDato={redigerbartVilkår.verdi.periode.verdi.tom}
                        />
                    </div>
                )}
            </FlexDiv>
        </MarginSkjemaGruppe>
    );
};

export default VelgPeriode;
