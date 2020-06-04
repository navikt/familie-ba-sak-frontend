import { ISODateString } from 'nav-datovelger';
import { Checkbox, SkjemaGruppe } from 'nav-frontend-skjema';
import { Normaltekst } from 'nav-frontend-typografi';
import React, { useState } from 'react';
import { useBehandling } from '../../../../../context/BehandlingContext';
import { IFelt, Valideringsstatus } from '../../../../../typer/felt';
import { nyPeriode } from '../../../../../typer/periode';
import { IVilkårResultat } from '../../../../../typer/vilkår';
import { datoformatNorsk } from '../../../../../utils/formatter';
import FamilieDatovelger from '../../../../Felleskomponenter/InputMedLesevisning/FamilieDatovelger';
import { vilkårPeriodeFeilmeldingId } from '../GeneriskVilkår';

interface IProps {
    redigerbartVilkår: IFelt<IVilkårResultat>;
    validerOgSettRedigerbartVilkår: (redigerbartVilkår: IFelt<IVilkårResultat>) => void;
    visFeilmeldinger: boolean;
}

const FastsettPeriode: React.FC<IProps> = ({
    redigerbartVilkår,
    validerOgSettRedigerbartVilkår,
    visFeilmeldinger,
}) => {
    const { erLesevisning } = useBehandling();
    const [fastsettTom, settFastsettTom] = useState<boolean>(
        redigerbartVilkår.verdi.periode.verdi.tom &&
            redigerbartVilkår.verdi.periode.verdi.tom !== ''
            ? true
            : false
    );
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
            <Normaltekst children={'Fastsett periode'} />
            <div className={'fastsett-periode__flex'}>
                <div>
                    <FamilieDatovelger
                        id={`${vilkårPeriodeFeilmeldingId(
                            redigerbartVilkår.verdi
                        )}__fastsett-periode-fom`}
                        label={'F.o.m.'}
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
                {(!erLesevisning() || redigerbartVilkår.verdi.periode.verdi.tom) && (
                    <div>
                        <FamilieDatovelger
                            disabled={!fastsettTom}
                            id={`${vilkårPeriodeFeilmeldingId(
                                redigerbartVilkår.verdi
                            )}__fastsett-periode-tom`}
                            label={'T.o.m.'}
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
                        {!erLesevisning() && (
                            <Checkbox
                                checked={fastsettTom}
                                onChange={() => {
                                    if (
                                        redigerbartVilkår.verdi.periode.verdi.tom !== '' &&
                                        fastsettTom
                                    ) {
                                        validerOgSettRedigerbartVilkår({
                                            ...redigerbartVilkår,
                                            verdi: {
                                                ...redigerbartVilkår.verdi,
                                                periode: {
                                                    ...redigerbartVilkår.verdi.periode,
                                                    verdi: nyPeriode(
                                                        redigerbartVilkår.verdi.periode.verdi.fom,
                                                        undefined
                                                    ),
                                                },
                                            },
                                        });
                                    }
                                    settFastsettTom(!fastsettTom);
                                }}
                                label={'Har en sluttdato'}
                            />
                        )}
                    </div>
                )}
            </div>
        </SkjemaGruppe>
    );
};

export default FastsettPeriode;
