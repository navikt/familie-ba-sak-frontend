import React, { useState } from 'react';

import deepEqual from 'deep-equal';
import styled from 'styled-components';

import { Normaltekst } from 'nav-frontend-typografi';

import { FeltState } from '@navikt/familie-skjema';

import { useBehandling } from '../../../../context/BehandlingContext';
import FamilieChevron from '../../../../ikoner/FamilieChevron';
import ManuellVurdering from '../../../../ikoner/ManuellVurdering';
import VilkårResultatIkon from '../../../../ikoner/VilkårResultatIkon';
import { IGrunnlagPerson } from '../../../../typer/person';
import { IAnnenVurdering, IVilkårConfig, Resultat, uiResultat } from '../../../../typer/vilkår';
import IkonKnapp from '../../../Felleskomponenter/IkonKnapp/IkonKnapp';
import { annenVurderingFeilmeldingId } from './AnnenVurderingTabell';

interface IProps {
    person: IGrunnlagPerson;
    vilkårFraConfig: IVilkårConfig;
    annenVurdering: FeltState<IAnnenVurdering>;
    visFeilmeldinger: boolean;
}

interface IEkspanderbarTrProps {
    ekspandert?: boolean;
}

const BeskrivelseCelle = styled(Normaltekst)`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const VurderingCelle = styled.div`
    display: flex;
    svg {
        margin-right: 1rem;
    }
`;

const EkspanderbarTr = styled.tr`
    td {
        border-bottom: ${(props: IEkspanderbarTrProps) =>
            props.ekspandert ? 'none' : '1px solid rgba(0, 0, 0, 0.15)'} !important;
    }
`;

const AnnenVurderingTabellRad: React.FC<IProps> = ({ annenVurdering }) => {
    const { erLesevisning } = useBehandling();

    const [ekspandertAnnenVurdering, settEkspandertAnnenVurdering] = useState(
        erLesevisning() || false || annenVurdering.verdi.resultat.verdi === Resultat.IKKE_VURDERT
    );
    const [redigerbartAnnenVurdering, settRedigerbartAnnenVurdering] = useState<
        FeltState<IAnnenVurdering>
    >(annenVurdering);

    const toggleForm = (visAlert: boolean) => {
        if (
            ekspandertAnnenVurdering &&
            visAlert &&
            !deepEqual(annenVurdering, redigerbartAnnenVurdering)
        ) {
            alert('Vurderingen har endringer som ikke er lagret!');
        } else {
            settEkspandertAnnenVurdering(!ekspandertAnnenVurdering);
            settRedigerbartAnnenVurdering(annenVurdering);
        }
    };

    return (
        <>
            <EkspanderbarTr {...{ ekspandert: ekspandertAnnenVurdering }}>
                <td>
                    <VurderingCelle>
                        <VilkårResultatIkon
                            resultat={annenVurdering.verdi.resultat.verdi}
                            width={20}
                            heigth={20}
                        />
                        <Normaltekst children={uiResultat[annenVurdering.verdi.resultat.verdi]} />
                    </VurderingCelle>
                </td>
                <td>
                    <BeskrivelseCelle children={annenVurdering.verdi.begrunnelse.verdi} />
                </td>
                <td>
                    <IkonKnapp
                        erLesevisning={erLesevisning()}
                        onClick={() => toggleForm(true)}
                        id={annenVurderingFeilmeldingId(annenVurdering.verdi)}
                        label={
                            !ekspandertAnnenVurdering
                                ? annenVurdering.verdi.resultat.verdi === Resultat.IKKE_VURDERT
                                    ? 'Vurder'
                                    : 'Endre'
                                : 'Lukk'
                        }
                        mini={true}
                        ikon={<FamilieChevron retning={ekspandertAnnenVurdering ? 'opp' : 'ned'} />}
                    />
                </td>
                <ManuellVurdering />
            </EkspanderbarTr>
        </>
    );
};

export default AnnenVurderingTabellRad;
