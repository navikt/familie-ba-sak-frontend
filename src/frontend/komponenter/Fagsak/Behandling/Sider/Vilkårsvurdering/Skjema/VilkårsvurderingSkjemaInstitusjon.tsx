import React from 'react';

import styled from 'styled-components';

import { Alert } from '@navikt/ds-react';
import { ASpacing14, ASpacing8 } from '@navikt/ds-tokens/dist/tokens';
import { RessursStatus } from '@navikt/familie-typer';

import { useBehandling } from '../../../../../../context/behandlingContext/BehandlingContext';
import { useVilkårsvurdering } from '../../../../../../context/Vilkårsvurdering/VilkårsvurderingContext';
import { PersonType } from '../../../../../../typer/person';
import type { IPersonResultat } from '../../../../../../typer/vilkår';
import {
    annenVurderingConfig,
    AnnenVurderingType,
    vilkårConfigInstitusjon,
} from '../../../../../../typer/vilkår';
import PersonInformasjon from '../../../../../Felleskomponenter/PersonInformasjon/PersonInformasjon';
import SamhandlerInformasjon from '../../../../../Felleskomponenter/SamhandlerInformasjon/SamhandlerInformasjon';
import { useSamhandlerRequest } from '../../../../Institusjon/useSamhandler';
import GeneriskAnnenVurdering from '../GeneriskAnnenVurdering/GeneriskAnnenVurdering';
import GeneriskVilkår from '../GeneriskVilkår/GeneriskVilkår';
import Registeropplysninger from '../Registeropplysninger/Registeropplysninger';

const AktørLinje = styled.div`
    display: flex;
    justify-content: space-between;
    position: -webkit-sticky;
    position: sticky;
    z-index: 3;
    background-color: white;
    padding-top: ${ASpacing14};
    padding-bottom: ${ASpacing8};
`;

const IndentertInnhold = styled.div`
    padding-left: ${ASpacing14};

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
    const { vurderErLesevisning } = useBehandling();
    const { vilkårsvurdering } = useVilkårsvurdering();
    const { hentOgSettSamhandler, samhandlerRessurs } = useSamhandlerRequest();

    if (samhandlerRessurs.status === RessursStatus.IKKE_HENTET) {
        hentOgSettSamhandler(orgNummer);
    }

    const personResultat = vilkårsvurdering.find(
        (value: IPersonResultat) => value.person.type === PersonType.BARN
    );
    const opplysningsplikt = personResultat?.andreVurderinger.find(
        value => value.verdi.type === AnnenVurderingType.OPPLYSNINGSPLIKT
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
                            key={`${orgNummer}_${AnnenVurderingType.OPPLYSNINGSPLIKT}`}
                            person={personResultat.person}
                            andreVurderinger={personResultat.andreVurderinger}
                            annenVurderingConfig={
                                annenVurderingConfig[AnnenVurderingType.OPPLYSNINGSPLIKT]
                            }
                            visFeilmeldinger={visFeilmeldinger}
                        />
                    </IndentertInnhold>
                </>
            )}
            <AktørLinje>
                <PersonInformasjon
                    person={personResultat.person}
                    somOverskrift
                    erLesevisning={vurderErLesevisning()}
                />
            </AktørLinje>

            <IndentertInnhold>
                {personResultat.person.registerhistorikk ? (
                    <Registeropplysninger
                        registerHistorikk={personResultat.person.registerhistorikk}
                        fødselsdato={personResultat.person.fødselsdato}
                    />
                ) : (
                    <Alert variant="warning" children={'Klarte ikke hente registeropplysninger'} />
                )}
                {vilkårConfigInstitusjon.map(vilkårConfig => {
                    return (
                        <GeneriskVilkår
                            key={`${personResultat.person.fødselsdato}_${vilkårConfig.key}`}
                            generiskVilkårKey={`${personResultat.person.fødselsdato}_${vilkårConfig.key}`}
                            person={personResultat.person}
                            vilkårResultater={personResultat.vilkårResultater.filter(
                                vilkårResultat =>
                                    vilkårResultat.verdi.vilkårType === vilkårConfig.key
                            )}
                            vilkårFraConfig={vilkårConfig}
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
