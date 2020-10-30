import { FamilieDatovelger } from '@navikt/familie-form-elements';
import { SkjemaGruppe } from 'nav-frontend-skjema';
import React from 'react';
import { useBehandling } from '../../../../../context/BehandlingContext';
import { IFelt, Valideringsstatus } from '../../../../../typer/felt';
import { nyPeriode } from '../../../../../typer/periode';
import { IVilkårResultat } from '../../../../../typer/vilkår';
import { datoformatNorsk } from '../../../../../utils/formatter';
import { vilkårPeriodeFeilmeldingId } from '../GeneriskVilkår';
import Hjelpetekst from 'nav-frontend-hjelpetekst';
import { ISODateString } from 'nav-datovelger/lib/types';
import styled from 'styled-components';
import { Element } from 'nav-frontend-typografi';

interface IProps {
    hjelpetekst?: string;
    redigerbartVilkår: IFelt<IVilkårResultat>;
    validerOgSettRedigerbartVilkår: (redigerbartVilkår: IFelt<IVilkårResultat>) => void;
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
            feilmeldingId={vilkårPeriodeFeilmeldingId(redigerbartVilkår.verdi)}
            className={'fastsett-periode'}
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
                        erLesesvisning={lesevisning}
                        id={`${vilkårPeriodeFeilmeldingId(
                            redigerbartVilkår.verdi
                        )}__fastsett-periode-fom`}
                        label={'F.o.m'}
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
            </div>
        </SkjemaGruppe>
    );
};

export default FastsettPeriode;
