import { Ressurs, RessursStatus } from '@navikt/familie-typer';
import { SkjemaGruppe } from 'nav-frontend-skjema';
import { Element, Undertekst } from 'nav-frontend-typografi';
import React, { useState } from 'react';
import {
    useVilkårsvurdering,
    VilkårSubmit,
} from '../../../../context/Vilkårsvurdering/VilkårsvurderingContext';
import Pluss from '../../../../ikoner/Pluss';
import { IFelt } from '../../../../typer/felt';
import { IPerson } from '../../../../typer/person';
import {
    IRestPersonResultat,
    IVilkårConfig,
    IVilkårResultat,
    Resultat,
    VilkårType,
} from '../../../../typer/vilkår';
import UtførKnapp from '../../../Felleskomponenter/IkonKnapp/IkonKnapp';
import GeneriskVilkårVurdering from './GeneriskVilkårVurdering';
import 'nav-frontend-tabell-style';
import { useBehandling } from '../../../../context/BehandlingContext';

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
    const { erLesevisning } = useBehandling();
    const {
        settVilkårsvurderingFraApi,
        settVilkårSubmit,
        postVilkår,
        vilkårSubmit,
    } = useVilkårsvurdering();

    const [visFeilmeldingerForVilkår, settVisFeilmeldingerForVilkår] = useState(false);
    const [feilmelding, settFeilmelding] = useState('');

    const håndterNyPeriodeVilkårsvurdering = (promise: Promise<Ressurs<IRestPersonResultat[]>>) => {
        promise
            .then((nyVilkårsvurdering: Ressurs<IRestPersonResultat[]>) => {
                settVilkårSubmit(VilkårSubmit.NONE);
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
                settVilkårSubmit(VilkårSubmit.NONE);
            });
    };

    const skalViseLeggTilKnapp = () => {
        const uvurdertPeriodePåVilkår = vilkårResultater.find(
            vilkår => vilkår.verdi.resultat.verdi === Resultat.KANSKJE
        );
        return uvurdertPeriodePåVilkår === undefined;
    };

    return (
        <div className={'generisk-vilkår'}>
            <SkjemaGruppe feil={visFeilmeldingerForVilkår ? feilmelding : undefined}>
                <div className={'horisontal-sentrert-div'}>
                    <Element children={vilkårFraConfig.tittel} />
                    <Undertekst children={vilkårFraConfig.lovreferanse} />
                </div>
                <hr />

                <table className={'tabell'}>
                    <thead>
                        <tr className={'tr-head'}>
                            <th>Vurdering</th>
                            <th>Periode</th>
                            <th>Begrunnelse</th>
                            <th />
                            <th />
                            <th />
                        </tr>
                    </thead>
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
                </table>

                {skalViseLeggTilKnapp() ? (
                    <UtførKnapp
                        erLesevisning={erLesevisning()}
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
                        spinner={vilkårSubmit === VilkårSubmit.POST}
                    />
                ) : null}
            </SkjemaGruppe>
        </div>
    );
};

export default GeneriskVilkår;
