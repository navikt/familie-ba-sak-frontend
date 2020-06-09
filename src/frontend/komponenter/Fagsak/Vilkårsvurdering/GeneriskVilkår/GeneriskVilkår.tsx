import { SkjemaGruppe } from 'nav-frontend-skjema';
import { Element, Undertekst } from 'nav-frontend-typografi';
import React, { useState } from 'react';
import { useVilkårsvurdering } from '../../../../context/Vilkårsvurdering/VilkårsvurderingContext';
import Pluss from '../../../../ikoner/Pluss';
import { IFelt } from '../../../../typer/felt';
import { IPerson } from '../../../../typer/person';
import { Ressurs, RessursStatus } from '../../../../typer/ressurs';
import {
    IRestPersonResultat,
    IVilkårConfig,
    IVilkårResultat,
    Resultat,
    VilkårType,
} from '../../../../typer/vilkår';
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
    const {
        settVilkårsvurderingFraApi,
        settVurdererVilkår,
        postVilkår,
        vurdererVilkår,
    } = useVilkårsvurdering();

    const [visFeilmeldingerForVilkår, settVisFeilmeldingerForVilkår] = useState(false);
    const [feilmelding, settFeilmelding] = useState('');

    const håndterNyPeriodeVilkårsvurdering = (promise: Promise<Ressurs<IRestPersonResultat[]>>) => {
        promise
            .then((nyVilkårsvurdering: Ressurs<IRestPersonResultat[]>) => {
                settVurdererVilkår(false);
                settVisFeilmeldingerForVilkår(false);
                settFeilmelding('');
                if (nyVilkårsvurdering.status === RessursStatus.SUKSESS) {
                    settVilkårsvurderingFraApi(nyVilkårsvurdering.data);
                } else if (nyVilkårsvurdering.status === RessursStatus.FEILET) {
                    settVisFeilmeldingerForVilkår(true);
                    settFeilmelding(nyVilkårsvurdering.frontendFeilmelding);
                } else {
                    settVisFeilmeldingerForVilkår(true);
                    settFeilmelding(
                        'En ukjent feil har oppstått, vi har ikke klart å legge til periode.'
                    );
                }
            })
            .catch(() => {
                settVurdererVilkår(false);
            });
    };

    const skalViseLeggTilKnapp = () => {
        const uvurdertPeriodePåVilkår = vilkårResultater.find(
            vilkår => vilkår.verdi.resultat.verdi === Resultat.KANSKJE
        );
        return uvurdertPeriodePåVilkår === undefined;
    };

    return (
        <SkjemaGruppe feil={visFeilmeldingerForVilkår ? feilmelding : undefined}>
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
                {skalViseLeggTilKnapp() ? (
                    <UtførKnapp
                        onClick={() => {
                            const promise = postVilkår(
                                person.personIdent,
                                vilkårFraConfig.key as VilkårType
                            );
                            håndterNyPeriodeVilkårsvurdering(promise);
                        }}
                        id={`${person.personIdent}__legg-til-periode__${vilkårFraConfig.key}`}
                        label={'Legg til periode'}
                        ikon={<Pluss />}
                        spinner={vurdererVilkår}
                    />
                ) : null}
            </div>
        </SkjemaGruppe>
    );
};

export default GeneriskVilkår;
