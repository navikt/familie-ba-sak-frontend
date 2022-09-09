import React from 'react';

import styled from 'styled-components';

import { Alert } from '@navikt/ds-react';
import { NavdsSpacing14, NavdsSpacing8 } from '@navikt/ds-tokens/dist/tokens';
import { RessursStatus } from '@navikt/familie-typer';

import { useVilkårsvurdering } from '../../../context/Vilkårsvurdering/VilkårsvurderingContext';
import { PersonType } from '../../../typer/person';
import type { IPersonResultat, IVilkårConfig } from '../../../typer/vilkår';
import {
    annenVurderingConfig,
    AnnenVurderingType,
    vilkårConfig,
    VilkårType,
} from '../../../typer/vilkår';
import PersonInformasjon from '../../Felleskomponenter/PersonInformasjon/PersonInformasjon';
import SamhandlerInformasjon from '../../Felleskomponenter/SamhandlerInformasjon/SamhandlerInformasjon';
import { useSamhandlerRequest } from '../InstitusjonOgVerge/useSamhandler';
import GeneriskAnnenVurdering from './GeneriskAnnenVurdering/GeneriskAnnenVurdering';
import GeneriskVilkår from './GeneriskVilkår/GeneriskVilkår';
import Registeropplysninger from './Registeropplysninger/Registeropplysninger';

const AktørLinje = styled.div`
    display: flex;
    justify-content: space-between;
    position: -webkit-sticky;
    position: sticky;
    z-index: 3;
    background-color: white;
    padding-top: ${NavdsSpacing14};
    padding-bottom: ${NavdsSpacing8};
`;

const IndentertInnhold = styled.div`
    padding-left: ${NavdsSpacing14};

    &.samhandler-innhold {
        margin-bottom: -1.5rem;
    }
`;

interface IProps {
    visFeilmeldinger: boolean;
    orgNummer: string;
}

const VilkårsvurderingSkjemaInstitusjon: React.FunctionComponent<IProps> = ({
    visFeilmeldinger,
    orgNummer,
}) => {
    const { vilkårsvurdering } = useVilkårsvurdering();
    const { hentSamhandler, samhandlerRessurs } = useSamhandlerRequest();

    if (samhandlerRessurs.status === RessursStatus.IKKE_HENTET) {
        hentSamhandler(orgNummer);
    }

    const personResultat = vilkårsvurdering.find(
        (value: IPersonResultat) => value.person.type === PersonType.BARN
    );
    const opplysningsplikt = personResultat?.andreVurderinger.find(
        value => value.verdi.type === AnnenVurderingType.OPPLYSNINGSPLIKT
    );
    const opplysningspliktConfig = annenVurderingConfig['OPPLYSNINGSPLIKT'];
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
        <>
            {opplysningsplikt && (
                <>
                    <AktørLinje>
                        {samhandlerRessurs.status === RessursStatus.SUKSESS ? (
                            <SamhandlerInformasjon
                                samhandler={samhandlerRessurs.data}
                                somOverskrift
                            />
                        ) : (
                            <Alert
                                variant="warning"
                                children={'Klarte ikke hente opplysninger om institusjon'}
                            />
                        )}
                    </AktørLinje>
                    <IndentertInnhold className={'samhandler-innhold'}>
                        <GeneriskAnnenVurdering
                            key={`${index}_${personResultat.person.fødselsdato}_${opplysningspliktConfig.key}`}
                            person={personResultat.person}
                            andreVurderinger={personResultat.andreVurderinger}
                            annenVurderingConfig={opplysningspliktConfig}
                            visFeilmeldinger={visFeilmeldinger}
                        />
                    </IndentertInnhold>
                </>
            )}
            <AktørLinje>
                <PersonInformasjon person={personResultat.person} somOverskrift />
            </AktørLinje>

            <IndentertInnhold>
                {personResultat.person.registerhistorikk ? (
                    <Registeropplysninger opplysninger={personResultat.person.registerhistorikk} />
                ) : (
                    <Alert variant="warning" children={'Klarte ikke hente registeropplysninger'} />
                )}
                {iVilkårConfigs.map((vc: IVilkårConfig) => {
                    return (
                        <GeneriskVilkår
                            key={`${index}_${personResultat.person.fødselsdato}_${vc.key}`}
                            generiskVilkårKey={`${index}_${personResultat.person.fødselsdato}_${vc.key}`}
                            person={personResultat.person}
                            vilkårResultater={personResultat.vilkårResultater.filter(
                                vilkårResultat => vilkårResultat.verdi.vilkårType === vc.key
                            )}
                            vilkårFraConfig={vc}
                            visFeilmeldinger={visFeilmeldinger}
                        />
                    );
                })}
            </IndentertInnhold>
        </>
    ) : (
        <Alert variant="error" children={'Finner ingen vilkår på behandlingen'} />
    );
};

export default VilkårsvurderingSkjemaInstitusjon;
