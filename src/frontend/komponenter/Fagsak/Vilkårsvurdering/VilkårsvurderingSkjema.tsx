import React from 'react';
import { useVilkårsvurdering } from '../../../context/Vilkårsvurdering/VilkårsvurderingContext';
import { Behandlingstype } from '../../../typer/behandling';
import { IFelt } from '../../../typer/felt';
import {
    IPersonResultat,
    IVilkårConfig,
    IVilkårResultat,
    vilkårConfig,
} from '../../../typer/vilkår';
import { erBehandlingenInnvilget } from '../../../utils/fagsak';
import Informasjonsbolk from '../../Felleskomponenter/Informasjonsbolk/Informasjonsbolk';
import PersonInformasjon from '../../Felleskomponenter/PersonInformasjon/PersonInformasjon';
import GeneriskVilkår from './GeneriskVilkår/GeneriskVilkår';

interface IVilkårsvurderingSkjema {
    visFeilmeldinger: boolean;
    behandlingstype: Behandlingstype;
}

const VilkårsvurderingSkjema: React.FunctionComponent<IVilkårsvurderingSkjema> = ({
    visFeilmeldinger,
    behandlingstype,
}) => {
    const { vilkårsvurdering } = useVilkårsvurdering();

    const nesteMåned = () => {
        const iDag = new Date();
        const måned = (iDag.getMonth() + 2).toString();
        return [
            måned.length === 1 ? '0' + måned : måned,
            iDag.getFullYear().toString().substr(2),
        ].join('.');
    };
    return (
        <>
            {vilkårsvurdering.map((personResultat: IPersonResultat, index: number) => {
                return (
                    <div
                        className={'vilkårsvurdering__person'}
                        key={personResultat.personIdent}
                        id={`${index}_${personResultat.person.fødselsdato}`}
                    >
                        <PersonInformasjon
                            person={personResultat.person}
                            tag={'h3'}
                            tekstType={'UNDERTITTEL'}
                        />

                        {Object.values(vilkårConfig)
                            .filter((vc: IVilkårConfig) =>
                                vc.parterDetteGjelderFor.includes(personResultat.person.type)
                            )
                            .map((vc: IVilkårConfig) => {
                                const vilkårResultater: IFelt<
                                    IVilkårResultat
                                >[] = personResultat.vilkårResultater.filter(
                                    (vilkårResultat: IFelt<IVilkårResultat>) =>
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
                    </div>
                );
            })}

            <br />

            {behandlingstype === Behandlingstype.REVURDERING &&
                !erBehandlingenInnvilget(vilkårsvurdering) && (
                    <div className={'vilkår__skjemagruppe--opphørsdato'}>
                        <Informasjonsbolk
                            informasjon={[{ label: `Forventet opphørsmåned`, tekst: nesteMåned() }]}
                        />
                    </div>
                )}
        </>
    );
};

export default VilkårsvurderingSkjema;
