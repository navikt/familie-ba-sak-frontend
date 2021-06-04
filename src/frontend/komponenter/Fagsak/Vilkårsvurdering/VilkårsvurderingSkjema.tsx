import React, { useState } from 'react';

import { Collapse } from 'react-collapse';
import styled from 'styled-components';

import AlertStripe from 'nav-frontend-alertstriper';

import { FeltState } from '@navikt/familie-skjema';

import { useApp } from '../../../context/AppContext';
import { useBehandling } from '../../../context/BehandlingContext';
import { useVilkårsvurdering } from '../../../context/Vilkårsvurdering/VilkårsvurderingContext';
import FamilieChevron from '../../../ikoner/FamilieChevron';
import { ToggleNavn } from '../../../typer/toggles';
import {
    IPersonResultat,
    IVilkårConfig,
    IVilkårResultat,
    vilkårConfig,
    Resultat,
    annenVurderingConfig,
} from '../../../typer/vilkår';
import IkonKnapp from '../../Felleskomponenter/IkonKnapp/IkonKnapp';
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
    z-index: 2;
    background-color: white;
    padding: 1.5rem 0;
`;

const VilkårsvurderingSkjema: React.FunctionComponent<IVilkårsvurderingSkjema> = ({
    visFeilmeldinger,
}) => {
    const { vilkårsvurdering } = useVilkårsvurdering();
    const { erLesevisning } = useBehandling();
    const { toggles } = useApp();
    const skalViseRegisteropplysninger = toggles[ToggleNavn.skjønnsvurdering];
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

    return (
        <>
            {vilkårsvurdering.map((personResultat: IPersonResultat, index: number) => {
                const andreVurderinger = personResultat.andreVurderinger;
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
                            <IkonKnapp
                                erLesevisning={false}
                                id={`vis-skjul-vilkårsvurdering-${personResultat.personIdent}`}
                                onClick={() =>
                                    settPersonErEkspandert({
                                        ...personErEkspandert,
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
                        </PersonLinje>

                        <Collapse isOpened={personErEkspandert[personResultat.personIdent]}>
                            {skalViseRegisteropplysninger && (
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
                            )}
                            {Object.values(vilkårConfig)
                                .filter((vc: IVilkårConfig) =>
                                    vc.parterDetteGjelderFor.includes(personResultat.person.type)
                                )
                                .map((vc: IVilkårConfig) => {
                                    const vilkårResultater: FeltState<IVilkårResultat>[] = personResultat.vilkårResultater.filter(
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
