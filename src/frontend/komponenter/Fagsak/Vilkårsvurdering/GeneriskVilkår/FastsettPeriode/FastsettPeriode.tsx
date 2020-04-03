import React from 'react';
import { IVilkårResultat } from '../../../../../typer/vilkår';
import { Normaltekst } from 'nav-frontend-typografi';
import Datovegler from '../../../../Felleskomponenter/Datovelger/Datovelger';
import { nyPeriode } from '../../../../../typer/periode';

interface IProps {
    redigerbartVilkår: IVilkårResultat;
    settRedigerbartVilkår: (redigerbartVilkår: IVilkårResultat) => void;
}

const FastsettPeriode: React.FC<IProps> = ({ redigerbartVilkår, settRedigerbartVilkår }) => {
    return (
        <div className={'fastsett-periode'}>
            <Normaltekst children={'Fastsett periode'} />
            <div className={'fastsett-periode__flex'}>
                <Datovegler
                    id={'fastsett-periode-fom'}
                    label={'F.o.m.'}
                    onChange={(dato: string) => {
                        settRedigerbartVilkår({
                            ...redigerbartVilkår,
                            periode: nyPeriode(dato, redigerbartVilkår.periode.tom),
                        });
                    }}
                    valgtDato={redigerbartVilkår.periode.fom}
                />

                <Datovegler
                    id={'fastsett-periode-tom'}
                    label={'T.o.m.'}
                    onChange={(dato: string) => {
                        settRedigerbartVilkår({
                            ...redigerbartVilkår,
                            periode: nyPeriode(redigerbartVilkår.periode.fom, dato),
                        });
                    }}
                    valgtDato={redigerbartVilkår.periode.tom}
                />
            </div>
        </div>
    );
};

export default FastsettPeriode;
