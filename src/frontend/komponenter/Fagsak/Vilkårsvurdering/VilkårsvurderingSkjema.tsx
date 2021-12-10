import React, { useState } from 'react';

import { Collapse } from 'react-collapse';
import styled from 'styled-components';

import AlertStripe from 'nav-frontend-alertstriper';

import { AddCircle } from '@navikt/ds-icons';
import { FeltState } from '@navikt/familie-skjema';
import { Ressurs, RessursStatus } from '@navikt/familie-typer';

import { useBehandling } from '../../../context/behandlingContext/BehandlingContext';
import {
    useVilkårsvurdering,
    VilkårSubmit,
} from '../../../context/Vilkårsvurdering/VilkårsvurderingContext';
import FamilieChevron from '../../../ikoner/FamilieChevron';
import { IBehandling } from '../../../typer/behandling';
import { PersonType } from '../../../typer/person';
import {
    IPersonResultat,
    IVilkårConfig,
    IVilkårResultat,
    vilkårConfig,
    Resultat,
    annenVurderingConfig,
    VilkårType,
} from '../../../typer/vilkår';
import IkonKnapp, { IkonPosisjon } from '../../Felleskomponenter/IkonKnapp/IkonKnapp';
import PersonInformasjon from '../../Felleskomponenter/PersonInformasjon/PersonInformasjon';
import GeneriskAnnenVurdering from './GeneriskAnnenVurdering/GeneriskAnnenVurdering';
import GeneriskVilkår from './GeneriskVilkår/GeneriskVilkår';
import Registeropplysninger from './Registeropplysninger/Registeropplysninger';

interface IVilkårsvurderingSkjema {
    visFeilmeldinger: boolean;
}

const Container = styled.div`
    &:first-child {
        padding-top: 2.5rem;
    }

    padding-top: 1rem;
    padding-bottom: 1rem;
`;

const PersonLinje = styled.div`
    display: flex;
    justify-content: space-between;
    position: -webkit-sticky;
    position: sticky;
    top: -1px;
    z-index: 3;
    background-color: white;
    padding: 1.5rem 0;
`;

const VilkårDiv = styled.div`
    display: flex;
    align-items: center;

    a.lenke span {
        margin-left: 10px;
    }
`;

const VilkårsvurderingSkjema: React.FunctionComponent<IVilkårsvurderingSkjema> = ({
    visFeilmeldinger,
}) => {
    const { vilkårsvurdering, settVilkårSubmit, postVilkår } = useVilkårsvurdering();
    const { erLesevisning, erMigreringOgEndreMigreringsdato, settÅpenBehandling } = useBehandling();
    const [personErEkspandert, settPersonErEkspandert] = useState<{ [key: string]: boolean }>(
        vilkårsvurdering.reduce((personMapEkspandert, personResultat) => {
            return {
                ...personMapEkspandert,
                [personResultat.personIdent]:
                    erLesevisning() ||
                    personResultat.vilkårResultater.filter(
                        (vilkårResultat: FeltState<IVilkårResultat>) =>
                            vilkårResultat.verdi.resultat.verdi === Resultat.IKKE_VURDERT
                    ).length > 0,
            };
        }, {})
    );

    const leggTilVilkårUtvidet = (personIdent: string) => {
        const promise = postVilkår(personIdent, VilkårType.UTVIDET_BARNETRYGD);
        promise.then((oppdatertBehandling: Ressurs<IBehandling>) => {
            settVilkårSubmit(VilkårSubmit.NONE);
            if (oppdatertBehandling.status === RessursStatus.SUKSESS) {
                settÅpenBehandling(oppdatertBehandling);
            }
        });
    };

    return (
        <>
            {vilkårsvurdering.map((personResultat: IPersonResultat, index: number) => {
                const andreVurderinger = personResultat.andreVurderinger;
                const harUtvidet = personResultat.vilkårResultater.find(
                    vilkårResultat =>
                        vilkårResultat.verdi.vilkårType === VilkårType.UTVIDET_BARNETRYGD
                );
                return (
                    <Container
                        key={personResultat.personIdent}
                        id={`${index}_${personResultat.person.fødselsdato}`}
                    >
                        <PersonLinje>
                            <PersonInformasjon
                                person={personResultat.person}
                                tag={'h3'}
                                tekstType={'UNDERTITTEL'}
                            />

                            {!erLesevisning() &&
                                personErEkspandert[personResultat.personIdent] &&
                                personResultat.person.type === PersonType.SØKER &&
                                !harUtvidet &&
                                erMigreringOgEndreMigreringsdato && (
                                    <VilkårDiv>
                                        <IkonKnapp
                                            erLesevisning={erLesevisning()}
                                            id={`${personResultat.person.personIdent}__legg-til-vilkår-utvidet`}
                                            onClick={() =>
                                                leggTilVilkårUtvidet(personResultat.personIdent)
                                            }
                                            label={`Legg til vilkår utvidet barnetrygd`}
                                            mini={true}
                                            ikonPosisjon={IkonPosisjon.VENSTRE}
                                            ikon={
                                                <AddCircle title="Legg til vilkår utvidet barnetrygd" />
                                            }
                                        />
                                    </VilkårDiv>
                                )}

                            <IkonKnapp
                                erLesevisning={false}
                                id={`vis-skjul-vilkårsvurdering-${personResultat.personIdent}`}
                                onClick={() =>
                                    settPersonErEkspandert({
                                        ...personErEkspandert,
                                        [personResultat.personIdent]:
                                            !personErEkspandert[personResultat.personIdent],
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
                        </PersonLinje>

                        <Collapse isOpened={personErEkspandert[personResultat.personIdent]}>
                            <>
                                {personResultat.person.registerhistorikk ? (
                                    <Registeropplysninger
                                        opplysninger={personResultat.person.registerhistorikk}
                                    />
                                ) : (
                                    <AlertStripe
                                        type={'advarsel'}
                                        children={'Klarte ikke hente registeropplysninger'}
                                    />
                                )}
                            </>
                            {Object.values(vilkårConfig)
                                .filter((vc: IVilkårConfig) =>
                                    vc.parterDetteGjelderFor.includes(personResultat.person.type)
                                )
                                .map((vc: IVilkårConfig) => {
                                    const vilkårResultater: FeltState<IVilkårResultat>[] =
                                        personResultat.vilkårResultater.filter(
                                            (vilkårResultat: FeltState<IVilkårResultat>) =>
                                                vilkårResultat.verdi.vilkårType === vc.key
                                        );

                                    return vilkårResultater.length ? (
                                        <GeneriskVilkår
                                            key={`${personResultat.personIdent}_${vc.key}`}
                                            person={personResultat.person}
                                            vilkårResultater={vilkårResultater}
                                            vilkårFraConfig={vc}
                                            visFeilmeldinger={visFeilmeldinger}
                                        />
                                    ) : undefined;
                                })}
                            {andreVurderinger.length > 0 &&
                                Object.values(annenVurderingConfig)
                                    .filter(annenVurderingConfig =>
                                        annenVurderingConfig.parterDetteGjelderFor.includes(
                                            personResultat.person.type
                                        )
                                    )
                                    .map(annenVurderingConfig => (
                                        <GeneriskAnnenVurdering
                                            key={`${personResultat.personIdent}_${annenVurderingConfig.key}`}
                                            person={personResultat.person}
                                            andreVurderinger={personResultat.andreVurderinger}
                                            annenVurderingConfig={annenVurderingConfig}
                                            visFeilmeldinger={visFeilmeldinger}
                                        />
                                    ))}
                        </Collapse>
                    </Container>
                );
            })}
        </>
    );
};

export default VilkårsvurderingSkjema;
