import { Element, Undertekst } from 'nav-frontend-typografi';
import React from 'react';

import { IPerson } from '../../../../typer/person';
import { IVilkårConfig, IVilkårResultat, VilkårType } from '../../../../typer/vilkår';
import { IFelt } from '../../../../typer/felt';
import GeneriskVilkårVurdering from './GeneriskVilkårVurdering';
import { useVilkårsvurdering } from '../../../../context/Vilkårsvurdering/VilkårsvurderingContext';
import UtførKnapp from './UtførKnapp';
import { erLesevisning } from '../../../../utils/behandling';

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
    const visLeseversjon = true; // TODO : erLesevisning() ?? false;

    return (
        <>
            <br />
            <div className={'horisontal-sentrert-div'}>
                <Element children={vilkårFraConfig.tittel} />
                <Undertekst children={vilkårFraConfig.lovreferanse} />
                {!visLeseversjon && (
                    <UtførKnapp
                        onClick={() =>
                            leggTilVilkår(person.personIdent, vilkårFraConfig.key as VilkårType)
                        }
                        id={`${person.personIdent}__legg-til-periode__${vilkårFraConfig.key}`}
                    >
                        Legg til periode
                    </UtførKnapp>
                )}
            </div>
            <ul className={'vilkårsvurdering__list'}>
                {vilkårResultater.map((vilkårResultat: IFelt<IVilkårResultat>) => {
                    return (
                        <GeneriskVilkårVurdering
                            key={`${person.personIdent}_${vilkårResultat.verdi.vilkårType}_${vilkårResultat.verdi.id}`}
                            vilkårFraConfig={vilkårFraConfig}
                            person={person}
                            vilkårResultat={vilkårResultat}
                            visFeilmeldinger={visFeilmeldinger}
                            tillattFjerning={vilkårResultater.length > 1}
                            visLeseversjon={visLeseversjon}
                        />
                    );
                })}
            </ul>
        </>
    );
};

export default GeneriskVilkår;
