import { Element, Undertekst } from 'nav-frontend-typografi';
import React from 'react';
import Pluss from '../../../../ikoner/Pluss';
import { IFelt } from '../../../../typer/felt';
import { IPerson } from '../../../../typer/person';
import { IVilkårConfig, IVilkårResultat } from '../../../../typer/vilkår';
import DashedHr from '../../../Felleskomponenter/DashedHr/DashedHr';
import UtførKnapp from '../../../Felleskomponenter/IkonKnapp/IkonKnapp';
import GeneriskVilkårVurdering from './GeneriskVilkårVurdering';

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
                onClick={() => {
                    //leggTilVilkår(person.personIdent, vilkårFraConfig.key as VilkårType)
                    console.log(
                        'TODO: Avklart midlertidig manglende funksjonalitet med funksjonelle'
                    );
                }}
                id={`${person.personIdent}__legg-til-periode__${vilkårFraConfig.key}`}
            >
                Legg til periode
                <Pluss />
            </UtførKnapp>
        </div>
    );
};

export default GeneriskVilkår;
