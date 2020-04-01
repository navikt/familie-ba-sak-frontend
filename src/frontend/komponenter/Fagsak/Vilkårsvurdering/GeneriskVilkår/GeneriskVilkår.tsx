import React from 'react';
import { IVilkårConfig, vilkårConfig, IVilkårResultat } from '../../../../typer/vilkår';
import Advarsel from '../../../../ikoner/Advarsel';
import { EtikettLiten, Element } from 'nav-frontend-typografi';
import UtførKnapp from './UtførKnapp';
import PanelBase from 'nav-frontend-paneler';

interface IProps {
    vilkårResultat: IVilkårResultat;
}

const GeneriskVilkår: React.FC<IProps> = ({ vilkårResultat }) => {
    const vilkårFraConfig: IVilkårConfig = vilkårConfig[vilkårResultat.vilkårType];
    const [ekspandertVilkår, settEkspandertVilkår] = React.useState(false);

    return (
        <PanelBase className={'generisk-vilkår'}>
            <div className={'generisk-vilkår__tittel-og-utfør'}>
                <Advarsel width={24} heigth={24} />
                <Element children={vilkårFraConfig.tittel} />
                <EtikettLiten children={vilkårFraConfig.lovreferanse} />
                <UtførKnapp
                    onClick={() => settEkspandertVilkår(!ekspandertVilkår)}
                    aktiv={ekspandertVilkår}
                />
            </div>
            {ekspandertVilkår && <div>EKSPANDERT</div>}
        </PanelBase>
    );
};

export default GeneriskVilkår;
