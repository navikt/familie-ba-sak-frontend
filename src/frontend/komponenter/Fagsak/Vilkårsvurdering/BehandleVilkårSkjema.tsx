import { SkjemaGruppe } from 'nav-frontend-skjema';
import React from 'react';

import { Behandlingstype } from '../../../typer/behandling';
import { IVilkårResultat, IPeriodeResultat } from '../../../typer/vilkår';
import Informasjonsbolk from '../../Felleskomponenter/Informasjonsbolk/Informasjonsbolk';
import { erBehandlingenInnvilget } from '../../../utils/fagsak';
import { Undertittel } from 'nav-frontend-typografi';
import GeneriskVilkår from './GeneriskVilkår/GeneriskVilkår';
import { useVilkårsvurdering } from '../../../context/VilkårsvurderingContext';

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
    const { periodeResultater } = useVilkårsvurdering();

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
