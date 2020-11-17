import { Ressurs, RessursStatus } from '@navikt/familie-typer';
import { SkjemaGruppe } from 'nav-frontend-skjema';
import { Element, Undertekst } from 'nav-frontend-typografi';
import React, { useState } from 'react';
import {
    useVilkårsvurdering,
    VilkårSubmit,
} from '../../../../context/Vilkårsvurdering/VilkårsvurderingContext';
import Pluss from '../../../../ikoner/Pluss';
import { IGrunnlagPerson } from '../../../../typer/person';
import { IVilkårConfig, IVilkårResultat, Resultat, VilkårType } from '../../../../typer/vilkår';
import UtførKnapp from '../../../Felleskomponenter/IkonKnapp/IkonKnapp';
import GeneriskVilkårVurdering from './GeneriskVilkårVurdering';
import { useBehandling } from '../../../../context/BehandlingContext';
import { IFagsak } from '../../../../typer/fagsak';
import { useFagsakRessurser } from '../../../../context/FagsakContext';
import { FeltState } from '../../../../familie-skjema/typer';

export const vilkårFeilmeldingId = (vilkårResultat: IVilkårResultat) =>
    `vilkår_${vilkårResultat.vilkårType}_${vilkårResultat.id}`;

export const vilkårResultatFeilmeldingId = (vilkårResultat: IVilkårResultat) =>
    `vilkår-resultat_${vilkårResultat.vilkårType}_${vilkårResultat.id}`;

export const vilkårBegrunnelseFeilmeldingId = (vilkårResultat: IVilkårResultat) =>
    `vilkår-begrunnelse_${vilkårResultat.vilkårType}_${vilkårResultat.id}`;

export const vilkårPeriodeFeilmeldingId = (vilkårResultat: IVilkårResultat) =>
    `vilkår-periode_${vilkårResultat.vilkårType}_${vilkårResultat.id}`;

interface IProps {
    person: IGrunnlagPerson;
    vilkårResultater: FeltState<IVilkårResultat>[];
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
    const { settFagsak } = useFagsakRessurser();
    const { settVilkårSubmit, postVilkår, vilkårSubmit } = useVilkårsvurdering();

    const [visFeilmeldingerForVilkår, settVisFeilmeldingerForVilkår] = useState(false);
    const [feilmelding, settFeilmelding] = useState('');

    const håndterNyPeriodeVilkårsvurdering = (promise: Promise<Ressurs<IFagsak>>) => {
        promise
            .then((oppdatertFagsak: Ressurs<IFagsak>) => {
                settVisFeilmeldingerForVilkår(false);
                settVilkårSubmit(VilkårSubmit.NONE);
                settFeilmelding('');
                if (oppdatertFagsak.status === RessursStatus.SUKSESS) {
                    settFagsak(oppdatertFagsak);
                } else if (oppdatertFagsak.status === RessursStatus.FEILET) {
                    settFeilmelding(oppdatertFagsak.frontendFeilmelding);
                    settVisFeilmeldingerForVilkår(true);
                } else {
                    settFeilmelding(
                        'En ukjent feil har oppstått, vi har ikke klart å legge til periode.'
                    );
                    settVisFeilmeldingerForVilkår(true);
                }
            })
            .catch(() => {
                settVilkårSubmit(VilkårSubmit.NONE);
            });
    };

    const skalViseLeggTilKnapp = () => {
        const uvurdertPeriodePåVilkår = vilkårResultater.find(
            vilkår => vilkår.verdi.resultat.verdi === Resultat.IKKE_VURDERT
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
                    {vilkårResultater.map((vilkårResultat: FeltState<IVilkårResultat>) => {
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
                        className={'generisk-vilkår__legg-til-knapp'}
                        erLesevisning={erLesevisning()}
                        onClick={() => {
                            const promise = postVilkår(
                                person.personIdent,
                                vilkårFraConfig.key as VilkårType
                            );
                            håndterNyPeriodeVilkårsvurdering(promise);
                        }}
                        id={`${person.personIdent}__legg-til-periode__${vilkårFraConfig.key}`}
                        ikon={<Pluss />}
                        knappPosisjon={'venstre'}
                        label={'Legg til periode'}
                        mini={true}
                        spinner={vilkårSubmit === VilkårSubmit.POST}
                        disabled={vilkårSubmit === VilkårSubmit.POST}
                    />
                ) : null}
            </SkjemaGruppe>
        </div>
    );
};

export default GeneriskVilkår;
