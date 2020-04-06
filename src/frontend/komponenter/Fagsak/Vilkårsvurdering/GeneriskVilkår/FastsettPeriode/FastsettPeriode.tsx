import { Checkbox } from 'nav-frontend-skjema';
import { Normaltekst } from 'nav-frontend-typografi';
import React, { useState } from 'react';

import { nyPeriode } from '../../../../../typer/periode';
import { IVilkårResultat } from '../../../../../typer/vilkår';
import { datoformatNorsk } from '../../../../../utils/formatter';
import Datovegler from '../../../../Felleskomponenter/Datovelger/Datovelger';

interface IProps {
    redigerbartVilkår: IVilkårResultat;
    settRedigerbartVilkår: (redigerbartVilkår: IVilkårResultat) => void;
}

const FastsettPeriode: React.FC<IProps> = ({ redigerbartVilkår, settRedigerbartVilkår }) => {
    const [fastsettTom, settFastsettTom] = useState<boolean>(
        redigerbartVilkår.periode.tom && redigerbartVilkår.periode.tom !== '' ? true : false
    );

    return (
        <div className={'fastsett-periode'}>
            <Normaltekst children={'Fastsett periode'} />
            <div className={'fastsett-periode__flex'}>
                <div>
                    <Datovegler
                        id={'fastsett-periode-fom'}
                        label={'F.o.m.'}
                        placeholder={datoformatNorsk.DATO}
                        onChange={(dato: string) => {
                            settRedigerbartVilkår({
                                ...redigerbartVilkår,
                                periode: nyPeriode(dato, redigerbartVilkår.periode.tom),
                            });
                        }}
                        valgtDato={redigerbartVilkår.periode.fom}
                    />
                </div>

                <div>
                    <Datovegler
                        // Hvis denne er disablet, skal man oppdatere staten med tom-streng/null
                        disabled={!fastsettTom}
                        id={'fastsett-periode-tom'}
                        label={'T.o.m.'}
                        placeholder={datoformatNorsk.DATO}
                        onChange={(dato: string) => {
                            settRedigerbartVilkår({
                                ...redigerbartVilkår,
                                periode: nyPeriode(redigerbartVilkår.periode.fom, dato),
                            });
                        }}
                        valgtDato={redigerbartVilkår.periode.tom}
                    />
                    <Checkbox
                        checked={fastsettTom}
                        onChange={() => {
                            settFastsettTom(!fastsettTom);

                            if (redigerbartVilkår.periode.tom !== '') {
                                settRedigerbartVilkår({
                                    ...redigerbartVilkår,
                                    periode: nyPeriode(redigerbartVilkår.periode.fom, undefined),
                                });
                            }
                        }}
                        label={'Har en sluttdato'}
                    />
                </div>
            </div>
        </div>
    );
};

export default FastsettPeriode;
