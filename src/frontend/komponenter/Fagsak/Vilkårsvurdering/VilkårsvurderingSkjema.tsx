import React, { useState } from 'react';
import { useVilkårsvurdering } from '../../../context/Vilkårsvurdering/VilkårsvurderingContext';
import {
    IPersonResultat,
    IVilkårConfig,
    IVilkårResultat,
    vilkårConfig,
    Resultat,
} from '../../../typer/vilkår';
import PersonInformasjon from '../../Felleskomponenter/PersonInformasjon/PersonInformasjon';
import GeneriskVilkår from './GeneriskVilkår/GeneriskVilkår';
import { Collapse } from 'react-collapse';
import IkonKnapp from '../../Felleskomponenter/IkonKnapp/IkonKnapp';
import FamilieChevron from '../../../ikoner/FamilieChevron';
import { FeltState } from '../../../familie-skjema/typer';

interface IVilkårsvurderingSkjema {
    visFeilmeldinger: boolean;
}

const VilkårsvurderingSkjema: React.FunctionComponent<IVilkårsvurderingSkjema> = ({
    visFeilmeldinger,
}) => {
    const { vilkårsvurdering } = useVilkårsvurdering();
    const [personErEkspandert, settPersonErEkspandert] = useState<{ [key: string]: boolean }>(
        vilkårsvurdering.reduce((personMapEkspandert, personResultat) => {
            return {
                ...personMapEkspandert,
                [personResultat.personIdent]:
                    personResultat.vilkårResultater.filter(
                        (vilkårResultat: FeltState<IVilkårResultat>) =>
                            vilkårResultat.verdi.resultat.verdi === Resultat.KANSKJE
                    ).length > 0,
            };
        }, {})
    );

    return (
        <>
            {vilkårsvurdering.map((personResultat: IPersonResultat, index: number) => {
                return (
                    <div
                        className={'vilkårsvurdering__person'}
                        key={personResultat.personIdent}
                        id={`${index}_${personResultat.person.fødselsdato}`}
                    >
                        <div className={'vilkårsvurdering__person--personlinje'}>
                            <PersonInformasjon
                                person={personResultat.person}
                                tag={'h3'}
                                tekstType={'UNDERTITTEL'}
                                width={'35rem'}
                            />
                            <IkonKnapp
                                erLesevisning={false}
                                id={`vis-skjul-vilkårsvurdering-${personResultat.personIdent}`}
                                onClick={() =>
                                    settPersonErEkspandert({
                                        [personResultat.personIdent]: !personErEkspandert[
                                            personResultat.personIdent
                                        ],
                                    })
                                }
                                mini={true}
                                label={
                                    personErEkspandert[personResultat.personIdent]
                                        ? 'Skjul vilkårsvurdering'
                                        : 'Vis vilkårsvurdering'
                                }
                                ikon={
                                    <FamilieChevron
                                        retning={
                                            personErEkspandert[personResultat.personIdent]
                                                ? 'opp'
                                                : 'ned'
                                        }
                                    />
                                }
                            />
                        </div>

                        <Collapse isOpened={personErEkspandert[personResultat.personIdent]}>
                            {Object.values(vilkårConfig)
                                .filter((vc: IVilkårConfig) =>
                                    vc.parterDetteGjelderFor.includes(personResultat.person.type)
                                )
                                .map((vc: IVilkårConfig) => {
                                    const vilkårResultater: FeltState<
                                        IVilkårResultat
                                    >[] = personResultat.vilkårResultater.filter(
                                        (vilkårResultat: FeltState<IVilkårResultat>) =>
                                            vilkårResultat.verdi.vilkårType === vc.key
                                    );

                                    if (vilkårResultater.length !== 0) {
                                        return (
                                            <GeneriskVilkår
                                                key={`${personResultat.personIdent}_${vc.key}`}
                                                person={personResultat.person}
                                                vilkårResultater={vilkårResultater}
                                                vilkårFraConfig={vc}
                                                visFeilmeldinger={visFeilmeldinger}
                                            />
                                        );
                                    } else {
                                        return undefined;
                                    }
                                })}
                        </Collapse>
                    </div>
                );
            })}
        </>
    );
};

export default VilkårsvurderingSkjema;
