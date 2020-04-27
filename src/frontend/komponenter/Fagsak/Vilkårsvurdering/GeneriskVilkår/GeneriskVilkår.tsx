import { Element, Undertekst } from 'nav-frontend-typografi';
import React from 'react';

import { IPerson } from '../../../../typer/person';
import { IVilkårConfig, IVilkårResultat, VilkårType } from '../../../../typer/vilkår';
import { IFelt } from '../../../../typer/felt';
import GeneriskVilkårVurdering from './GeneriskVilkårVurdering';
import { useVilkårsvurdering } from '../../../../context/Vilkårsvurdering/VilkårsvurderingContext';
import UtførKnapp from '../../../Felleskomponenter/IkonKnapp/IkonKnapp';
import DashedHr from '../../../Felleskomponenter/DashedHr/DashedHr';
import Pluss from '../../../../ikoner/Pluss';
import { useFagsakRessurser } from '../../../../context/FagsakContext';

export const vilkårFeilmeldingId = (vilkårResultat: IVilkårResultat) =>
    `vilkår_${vilkårResultat.vilkårType}_${vilkårResultat.id}`;

export const vilkårResultatFeilmeldingId = (vilkårResultat: IVilkårResultat) =>
    `vilkår-resultat_${vilkårResultat.vilkårType}_${vilkårResultat.id}`;

export const vilkårBegrunnelseFeilmeldingId = (vilkårResultat: IVilkårResultat) =>
    `vilkår-begrunnelse_${vilkårResultat.vilkårType}_${vilkårResultat.id}`;

export const vilkårPeriodeFeilmeldingId = (vilkårResultat: IVilkårResultat) =>
    `vilkår-periode_${vilkårResultat.vilkårType}_${vilkårResultat.id}`;

interface IProps {
    person: IPerson;
    vilkårResultater: IFelt<IVilkårResultat>[];
    vilkårFraConfig: IVilkårConfig;
    visFeilmeldinger: boolean;
}

const GeneriskVilkår: React.FC<IProps> = ({
    person,
    vilkårFraConfig,
    vilkårResultater,
    visFeilmeldinger,
}) => {
    const { leggTilVilkår } = useVilkårsvurdering();
    const { erLesevisning } = useFagsakRessurser();

    return (
        <div className={'generisk-vilkår'}>
            <br />
            <div className={'horisontal-sentrert-div'}>
                <Element children={vilkårFraConfig.tittel} />
                <Undertekst children={vilkårFraConfig.lovreferanse} />
            </div>
            <DashedHr />
            <ul className={'vilkårsvurdering__list'}>
                {vilkårResultater.map((vilkårResultat: IFelt<IVilkårResultat>) => {
                    return (
                        <GeneriskVilkårVurdering
                            key={`${person.personIdent}_${vilkårResultat.verdi.vilkårType}_${vilkårResultat.verdi.id}`}
                            vilkårFraConfig={vilkårFraConfig}
                            person={person}
                            vilkårResultat={vilkårResultat}
                            visFeilmeldinger={visFeilmeldinger}
                        />
                    );
                })}
            </ul>
            <DashedHr />

            <UtførKnapp
                visLeseversjon={erLesevisning()}
                onClick={() => leggTilVilkår(person.personIdent, vilkårFraConfig.key as VilkårType)}
                id={`${person.personIdent}__legg-til-periode__${vilkårFraConfig.key}`}
            >
                Legg til periode
                <Pluss />
            </UtførKnapp>
        </div>
    );
};

export default GeneriskVilkår;
