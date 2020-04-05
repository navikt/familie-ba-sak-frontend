import { Knapp } from 'nav-frontend-knapper';
import { SkjemaGruppe } from 'nav-frontend-skjema';
import { Undertittel } from 'nav-frontend-typografi';
import React from 'react';

import { useVilkårsvurdering } from '../../../context/Vilkårsvurdering/VilkårsvurderingContext';
import { Behandlingstype } from '../../../typer/behandling';
import { IPeriodeResultat, IVilkårResultat, VilkårType } from '../../../typer/vilkår';
import { erBehandlingenInnvilget } from '../../../utils/fagsak';
import Informasjonsbolk from '../../Felleskomponenter/Informasjonsbolk/Informasjonsbolk';
import GeneriskVilkår from './GeneriskVilkår/GeneriskVilkår';

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
    const { leggTilVilkår, periodeResultater } = useVilkårsvurdering();

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
            {periodeResultater.map((periodeResultat: IPeriodeResultat) => {
                return (
                    <div key={periodeResultat.personIdent}>
                        <Undertittel
                            children={`Vurder vilkår for ${periodeResultat.person.navn}`}
                        />
                        <ul className={'vilkårsvurdering__list'}>
                            {periodeResultat.vilkårResultater.map(
                                (vilkårResultat: IVilkårResultat) => {
                                    return (
                                        <GeneriskVilkår
                                            key={`${periodeResultat.personIdent}_${vilkårResultat.vilkårType}_${vilkårResultat.id}`}
                                            person={periodeResultat.person}
                                            vilkårResultat={vilkårResultat}
                                        />
                                    );
                                }
                            )}
                            <Knapp
                                type={'flat'}
                                mini={true}
                                onClick={() => {
                                    leggTilVilkår(
                                        periodeResultat.personIdent,
                                        VilkårType.BOSATT_I_RIKET
                                    );
                                }}
                                children={'Vurder ny periode'}
                            />
                        </ul>
                    </div>
                );
            })}

            <br />

            {behandlingstype === Behandlingstype.REVURDERING &&
                !erBehandlingenInnvilget(periodeResultater) && (
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
