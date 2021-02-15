import React, { useState } from 'react';

import styled from 'styled-components';

import { SkjemaGruppe } from 'nav-frontend-skjema';
import { Element, Undertekst, Undertittel } from 'nav-frontend-typografi';

import { FeltState } from '@navikt/familie-skjema';
import { Ressurs, RessursStatus } from '@navikt/familie-typer';

import { useBehandling } from '../../../../context/BehandlingContext';
import { useFagsakRessurser } from '../../../../context/FagsakContext';
import {
    useVilkårsvurdering,
    VilkårSubmit,
} from '../../../../context/Vilkårsvurdering/VilkårsvurderingContext';
import Pluss from '../../../../ikoner/Pluss';
import { IFagsak } from '../../../../typer/fagsak';
import { IGrunnlagPerson } from '../../../../typer/person';
import { IVilkårConfig, IVilkårResultat, Resultat, VilkårType } from '../../../../typer/vilkår';
import IkonKnapp from '../../../Felleskomponenter/IkonKnapp/IkonKnapp';
import VilkårTabell from './VilkårTabell';

interface IProps {
    person: IGrunnlagPerson;
    vilkårResultater: FeltState<IVilkårResultat>[];
    vilkårFraConfig: IVilkårConfig;
    visFeilmeldinger: boolean;
}

const Container = styled.div`
    margin-top: 1rem;
    :not(:first-child) {
        margin-top: 2.5rem;
    }
`;

const VilkårTittel = styled(Undertittel)`
    display: flex;
    align-items: center;

    > *:not(:first-child) {
        margin-left: 0.75rem;
    }
`;

const UtførKnapp = styled(IkonKnapp)`
    margin-top: 0.5rem;
`;

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
                } else if (
                    oppdatertFagsak.status === RessursStatus.FEILET ||
                    oppdatertFagsak.status === RessursStatus.FUNKSJONELL_FEIL ||
                    oppdatertFagsak.status === RessursStatus.IKKE_TILGANG
                ) {
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
        <Container>
            <SkjemaGruppe feil={visFeilmeldingerForVilkår ? feilmelding : undefined}>
                <VilkårTittel tag={'h4'}>
                    <Element children={vilkårFraConfig.tittel} />
                    <Undertekst children={vilkårFraConfig.lovreferanse} />
                </VilkårTittel>
                <VilkårTabell
                    person={person}
                    vilkårFraConfig={vilkårFraConfig}
                    vilkårResultater={vilkårResultater}
                    visFeilmeldinger={visFeilmeldinger}
                />
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
                        ikon={<Pluss />}
                        knappPosisjon={'venstre'}
                        label={'Legg til periode'}
                        mini={true}
                        spinner={vilkårSubmit === VilkårSubmit.POST}
                        disabled={vilkårSubmit === VilkårSubmit.POST}
                    />
                ) : null}
            </SkjemaGruppe>
        </Container>
    );
};

export default GeneriskVilkår;
