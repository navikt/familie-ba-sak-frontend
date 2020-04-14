import { Knapp } from 'nav-frontend-knapper';
import { SkjemaGruppe } from 'nav-frontend-skjema';
import { Undertittel } from 'nav-frontend-typografi';
import React from 'react';

import { useVilkårsvurdering } from '../../../context/Vilkårsvurdering/VilkårsvurderingContext';
import { Behandlingstype } from '../../../typer/behandling';
import {
    IPersonResultat,
    IVilkårResultat,
    VilkårType,
    vilkårConfig,
    IVilkårConfig,
} from '../../../typer/vilkår';
import { erBehandlingenInnvilget } from '../../../utils/fagsak';
import Informasjonsbolk from '../../Felleskomponenter/Informasjonsbolk/Informasjonsbolk';
import GeneriskVilkår from './GeneriskVilkår/GeneriskVilkår';
import { IFelt } from '../../../typer/felt';

interface IBehandlingVilkårSkjema {
    opprettelseFeilmelding: string;
    visFeilmeldinger: boolean;
    behandlingstype: Behandlingstype;
}

const BehandlingVilkårSkjema: React.FunctionComponent<IBehandlingVilkårSkjema> = ({
    opprettelseFeilmelding,
    visFeilmeldinger,
    behandlingstype,
}) => {
    const { leggTilVilkår, vilkårsvurdering } = useVilkårsvurdering();

    const nesteMåned = () => {
        const iDag = new Date();
        const måned = (iDag.getMonth() + 2).toString();
        return [
            måned.length === 1 ? '0' + måned : måned,
            iDag
                .getFullYear()
                .toString()
                .substr(2),
        ].join('.');
    };
    return (
        <SkjemaGruppe
            className={'vilkår__skjemagruppe'}
            feil={
                visFeilmeldinger && opprettelseFeilmelding !== ''
                    ? opprettelseFeilmelding
                    : undefined
            }
        >
            {vilkårsvurdering.map((personResultat: IPersonResultat) => {
                return (
                    <div key={personResultat.personIdent}>
                        <Undertittel children={`Vurder vilkår for ${personResultat.person.navn}`} />

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
        </SkjemaGruppe>
    );
};

export default BehandlingVilkårSkjema;
