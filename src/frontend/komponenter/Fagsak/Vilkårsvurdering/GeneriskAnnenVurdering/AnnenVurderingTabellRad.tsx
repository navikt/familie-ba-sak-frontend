import React, { useState } from 'react';

import deepEqual from 'deep-equal';
import styled from 'styled-components';

import { BodyShort, Button } from '@navikt/ds-react';
import type { FeltState } from '@navikt/familie-skjema';
import { RessursStatus } from '@navikt/familie-typer';

import { useBehandling } from '../../../../context/behandlingContext/BehandlingContext';
import FamilieChevron from '../../../../ikoner/FamilieChevron';
import ManuellVurdering from '../../../../ikoner/ManuellVurdering';
import VilkårResultatIkon from '../../../../ikoner/VilkårResultatIkon';
import type { IGrunnlagPerson } from '../../../../typer/person';
import type { IAnnenVurdering, IAnnenVurderingConfig } from '../../../../typer/vilkår';
import { Resultat, uiResultat } from '../../../../typer/vilkår';
import AnnenVurderingRadEndre from './AnnenVurderingRadEndre';
import { annenVurderingFeilmeldingId } from './AnnenVurderingTabell';

interface IProps {
    person: IGrunnlagPerson;
    annenVurderingConfig: IAnnenVurderingConfig;
    annenVurdering: FeltState<IAnnenVurdering>;
    visFeilmeldinger: boolean;
}

interface IEkspanderbarTrProps {
    ekspandert?: boolean;
}

const BeskrivelseCelle = styled(BodyShort)`
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

const EkspandertTd = styled.td`
    padding: 0 1rem 1rem 1.6rem;
`;

const AnnenVurderingTabellRad: React.FC<IProps> = ({
    person,
    annenVurderingConfig,
    visFeilmeldinger,
    annenVurdering,
}) => {
    const { vurderErLesevisning, åpenBehandling } = useBehandling();

    const [ekspandertAnnenVurdering, settEkspandertAnnenVurdering] = useState(
        vurderErLesevisning() || annenVurdering.verdi.resultat.verdi === Resultat.IKKE_VURDERT
    );
    const [redigerbartAnnenVurdering, settRedigerbartAnnenVurdering] =
        useState<FeltState<IAnnenVurdering>>(annenVurdering);

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
                            height={20}
                        />
                        <BodyShort children={uiResultat[annenVurdering.verdi.resultat.verdi]} />
                    </VurderingCelle>
                </td>
                <td />
                <td>
                    <BeskrivelseCelle children={annenVurdering.verdi.begrunnelse.verdi} />
                </td>
                <td>
                    {!vurderErLesevisning() && (
                        <Button
                            variant={'tertiary'}
                            onClick={() => toggleForm(true)}
                            id={annenVurderingFeilmeldingId(annenVurdering.verdi)}
                            size={'small'}
                            icon={
                                <FamilieChevron
                                    retning={ekspandertAnnenVurdering ? 'opp' : 'ned'}
                                />
                            }
                            iconPosition={'right'}
                        >
                            {!ekspandertAnnenVurdering
                                ? annenVurdering.verdi.resultat.verdi === Resultat.IKKE_VURDERT
                                    ? 'Vurder'
                                    : 'Endre'
                                : 'Lukk'}
                        </Button>
                    )}
                </td>
                <td>
                    <ManuellVurdering />
                </td>
                <td>
                    <i>
                        {åpenBehandling.status === RessursStatus.SUKSESS &&
                        annenVurdering.verdi.erVurdert
                            ? 'Vurdert i denne behandlingen'
                            : ''}
                    </i>
                </td>
            </EkspanderbarTr>
            {ekspandertAnnenVurdering && (
                <tr>
                    <EkspandertTd colSpan={6}>
                        <AnnenVurderingRadEndre
                            person={person}
                            annenVurderingConfig={annenVurderingConfig}
                            annenVurdering={annenVurdering}
                            visFeilmeldinger={visFeilmeldinger}
                            toggleForm={toggleForm}
                            redigerbartAnnenVurdering={redigerbartAnnenVurdering}
                            settRedigerbartAnnenVurdering={settRedigerbartAnnenVurdering}
                            settEkspandertAnnenVurdering={settEkspandertAnnenVurdering}
                        />
                    </EkspandertTd>
                </tr>
            )}
        </>
    );
};

export default AnnenVurderingTabellRad;
