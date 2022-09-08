import React from 'react';

import styled from 'styled-components';

import { Alert } from '@navikt/ds-react';
import { NavdsSpacing14, NavdsSpacing8 } from '@navikt/ds-tokens/dist/tokens';
import type { FeltState } from '@navikt/familie-skjema';

import { useVilkårsvurdering } from '../../../context/Vilkårsvurdering/VilkårsvurderingContext';
import { PersonType } from '../../../typer/person';
import type { IPersonResultat, IVilkårConfig, IVilkårResultat } from '../../../typer/vilkår';
import { annenVurderingConfig, vilkårConfig, VilkårType } from '../../../typer/vilkår';
import PersonInformasjon from '../../Felleskomponenter/PersonInformasjon/PersonInformasjon';
import SamhandlerInformasjon from '../../Felleskomponenter/SamhandlerInformasjon/SamhandlerInformasjon';
import GeneriskAnnenVurdering from './GeneriskAnnenVurdering/GeneriskAnnenVurdering';
import GeneriskVilkår from './GeneriskVilkår/GeneriskVilkår';
import Registeropplysninger from './Registeropplysninger/Registeropplysninger';

interface IVilkårsvurderingSkjema {
    visFeilmeldinger: boolean;
}

const AktørLinje = styled.div`
    display: flex;
    justify-content: space-between;
    position: -webkit-sticky;
    position: sticky;
    top: -1px;
    z-index: 3;
    background-color: white;
    padding: ${NavdsSpacing8} 0;
`;

const IndentertInnhold = styled.div`
    padding-left: ${NavdsSpacing14};
`;

const VilkårsvurderingSkjema: React.FunctionComponent<IVilkårsvurderingSkjema> = ({
    visFeilmeldinger,
}) => {
    const { vilkårsvurdering } = useVilkårsvurdering();
    const personResultat = vilkårsvurdering.find(
        (value: IPersonResultat) => value.person.type === PersonType.BARN
    );
    const andreVurderinger = personResultat?.andreVurderinger;
    const index = 0;
    const iVilkårConfigs = Object.values(vilkårConfig).filter((vc: IVilkårConfig) =>
        vc.parterDetteGjelderFor.includes(PersonType.BARN)
    );
    iVilkårConfigs.splice(
        iVilkårConfigs.findIndex(value => value.key === VilkårType.BOR_MED_SØKER),
        1,
        {
            beskrivelse: 'bor fast på institusjon',
            key: 'BOR_FAST_PÅ_INSTITUSJON',
            tittel: 'Bor fast på institusjon',
            spørsmål: () => `Bor barnet fast på institusjon?`,
            parterDetteGjelderFor: [PersonType.BARN],
        }
    );
    return personResultat ? (
        <div
            key={`${index}_${personResultat.person.fødselsdato}`}
            id={`${index}_${personResultat.person.fødselsdato}`}
        >
            <AktørLinje>
                <SamhandlerInformasjon
                    samhandler={{
                        navn: 'Bufetat',
                        orgNummer: '123456789',
                        tssEksternId: '',
                        adresser: [],
                    }}
                    somOverskrift
                />
            </AktørLinje>

            <AktørLinje>
                <PersonInformasjon person={personResultat.person} somOverskrift />
            </AktørLinje>

            <IndentertInnhold>
                <>
                    {personResultat.person.registerhistorikk ? (
                        <Registeropplysninger
                            opplysninger={personResultat.person.registerhistorikk}
                        />
                    ) : (
                        <Alert
                            variant="warning"
                            children={'Klarte ikke hente registeropplysninger'}
                        />
                    )}
                </>
                {iVilkårConfigs.map((vc: IVilkårConfig) => {
                    const vilkårResultater: FeltState<IVilkårResultat>[] =
                        personResultat.vilkårResultater.filter(
                            (vilkårResultat: FeltState<IVilkårResultat>) =>
                                vilkårResultat.verdi.vilkårType === vc.key
                        );

                    return (
                        <GeneriskVilkår
                            key={`${index}_${personResultat.person.fødselsdato}_${vc.key}`}
                            generiskVilkårKey={`${index}_${personResultat.person.fødselsdato}_${vc.key}`}
                            person={personResultat.person}
                            vilkårResultater={vilkårResultater}
                            vilkårFraConfig={vc}
                            visFeilmeldinger={visFeilmeldinger}
                        />
                    );
                })}
                {andreVurderinger &&
                    andreVurderinger.length > 0 &&
                    Object.values(annenVurderingConfig)
                        .filter(annenVurderingConfig =>
                            annenVurderingConfig.parterDetteGjelderFor.includes(
                                personResultat.person.type
                            )
                        )
                        .map(annenVurderingConfig => (
                            <GeneriskAnnenVurdering
                                key={`${index}_${personResultat.person.fødselsdato}_${annenVurderingConfig.key}`}
                                person={personResultat.person}
                                andreVurderinger={personResultat.andreVurderinger}
                                annenVurderingConfig={annenVurderingConfig}
                                visFeilmeldinger={visFeilmeldinger}
                            />
                        ))}
            </IndentertInnhold>
        </div>
    ) : (
        <div>Finner ingen vilkår på behandlingen.</div>
    );
};

export default VilkårsvurderingSkjema;
