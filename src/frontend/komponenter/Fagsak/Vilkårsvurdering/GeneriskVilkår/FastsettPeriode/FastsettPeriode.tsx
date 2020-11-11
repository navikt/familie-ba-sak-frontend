import { SkjemaGruppe } from 'nav-frontend-skjema';
import React from 'react';
import { useBehandling } from '../../../../../context/BehandlingContext';
import { nyPeriode } from '../../../../../typer/periode';
import { IVilkårResultat } from '../../../../../typer/vilkår';
import { datoformat, datoformatNorsk, formaterIsoDato } from '../../../../../utils/formatter';
import { vilkårPeriodeFeilmeldingId } from '../GeneriskVilkår';
import Hjelpetekst from 'nav-frontend-hjelpetekst';
import styled from 'styled-components';
import { Element } from 'nav-frontend-typografi';
import { ISODateString } from 'nav-datovelger/lib/types';
import { FamilieDatovelger } from '@navikt/familie-form-elements';
import { FeltState, Valideringsstatus } from '../../../../../familie-skjema/typer';

interface IProps {
    hjelpetekst?: string;
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

const FastsettPeriode: React.FC<IProps> = ({
    hjelpetekst,
    redigerbartVilkår,
    validerOgSettRedigerbartVilkår,
    visFeilmeldinger,
}) => {
    const { erLesevisning } = useBehandling();
    const lesevisning = erLesevisning();

    return (
        <SkjemaGruppe
            feilmeldingId={vilkårPeriodeFeilmeldingId(redigerbartVilkår.value)}
            className={'fastsett-periode'}
            feil={
                redigerbartVilkår.value.periode.valideringsstatus === Valideringsstatus.FEIL &&
                visFeilmeldinger
                    ? redigerbartVilkår.value.periode.feilmelding
                    : ''
            }
        >
            {!lesevisning && (
                <StyledLegend>
                    <StyledElement>Velg periode</StyledElement>
                    {hjelpetekst && (
                        <Hjelpetekst tittel={'Hjelpetekst fastsett periode'}>
                            {hjelpetekst}
                        </Hjelpetekst>
                    )}
                </StyledLegend>
            )}

            <div className={'fastsett-periode__flex'}>
                <div>
                    <FamilieDatovelger
                        allowInvalidDateSelection={false}
                        limitations={{
                            maxDate: new Date().toISOString(),
                        }}
                        erLesesvisning={lesevisning}
                        id={`${vilkårPeriodeFeilmeldingId(
                            redigerbartVilkår.value
                        )}__fastsett-periode-fom`}
                        label={'F.o.m'}
                        placeholder={datoformatNorsk.DATO}
                        onChange={(dato?: ISODateString) => {
                            validerOgSettRedigerbartVilkår({
                                ...redigerbartVilkår,
                                value: {
                                    ...redigerbartVilkår.value,
                                    periode: {
                                        ...redigerbartVilkår.value.periode,
                                        value: nyPeriode(
                                            dato,
                                            redigerbartVilkår.value.periode.value.tom
                                        ),
                                    },
                                },
                            });
                        }}
                        valgtDato={formaterIsoDato(
                            redigerbartVilkår.value.periode.value.fom,
                            datoformat.DATO
                        )}
                    />
                </div>
                {(!lesevisning || redigerbartVilkår.value.periode.value.tom) && (
                    <div>
                        <FamilieDatovelger
                            erLesesvisning={lesevisning}
                            id={`${vilkårPeriodeFeilmeldingId(
                                redigerbartVilkår.value
                            )}__fastsett-periode-tom`}
                            label={'T.o.m (valgfri)'}
                            placeholder={datoformatNorsk.DATO}
                            onChange={(dato?: ISODateString) => {
                                validerOgSettRedigerbartVilkår({
                                    ...redigerbartVilkår,
                                    value: {
                                        ...redigerbartVilkår.value,
                                        periode: {
                                            ...redigerbartVilkår.value.periode,
                                            value: nyPeriode(
                                                redigerbartVilkår.value.periode.value.fom,
                                                dato
                                            ),
                                        },
                                    },
                                });
                            }}
                            valgtDato={formaterIsoDato(
                                redigerbartVilkår.value.periode.value.tom,
                                datoformat.DATO
                            )}
                        />
                    </div>
                )}
            </div>
        </SkjemaGruppe>
    );
};

export default FastsettPeriode;
