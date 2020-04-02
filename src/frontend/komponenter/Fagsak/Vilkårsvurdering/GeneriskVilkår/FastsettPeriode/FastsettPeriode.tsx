import React from 'react';
import { useVilkårsvurdering } from '../../../../../context/VilkårsvurderingContext';
import { IPerson } from '../../../../../typer/person';
import { IVilkårResultat } from '../../../../../typer/vilkår';
import { Normaltekst } from 'nav-frontend-typografi';
import { Input, Label } from 'nav-frontend-skjema';
import Datovegler from '../../../../Felleskomponenter/Datovelger/Datovelger';

interface IProps {
    redigerbartVilkår: IVilkårResultat;
    settRedigerbartVilkår: (redigerbartVilkår: IVilkårResultat) => void;
}

const FastsettPeriode: React.FC<IProps> = ({ redigerbartVilkår, settRedigerbartVilkår }) => {
    const onPeriodeChange = (periodeFom: string, periodeTom: string) => {
        console.log('fom: ', periodeFom);
        settRedigerbartVilkår({
            ...redigerbartVilkår,
            periodeFom,
            periodeTom,
        });
    };

    return (
        <div className={'fastsett-periode'}>
            <Normaltekst children={'Fastsett periode'} />
            <div className={'fastsett-periode__flex'}>
                <Datovegler
                    id={'fastsett-periode-fom'}
                    label={'F.o.m.'}
                    onChange={(dato: string) => onPeriodeChange(dato, redigerbartVilkår.periodeTom)}
                    valgtDato={redigerbartVilkår.periodeFom}
                />

                <Datovegler
                    id={'fastsett-periode-tom'}
                    label={'T.o.m.'}
                    onChange={(dato: string) => onPeriodeChange(redigerbartVilkår.periodeFom, dato)}
                    valgtDato={redigerbartVilkår.periodeTom}
                />
            </div>
        </div>
    );
};

export default FastsettPeriode;
