import React, { useState } from 'react';

import deepEqual from 'deep-equal';
import styled from 'styled-components';

import { Normaltekst } from 'nav-frontend-typografi';

import { FeltState } from '@navikt/familie-skjema';
import { RessursStatus } from '@navikt/familie-typer';

import { useBehandling } from '../../../../context/behandlingContext/BehandlingContext';
import AutomatiskVurdering from '../../../../ikoner/AutomatiskVurdering';
import FamilieChevron from '../../../../ikoner/FamilieChevron';
import ManuellVurdering from '../../../../ikoner/ManuellVurdering';
import VilkårResultatIkon from '../../../../ikoner/VilkårResultatIkon';
import { IGrunnlagPerson } from '../../../../typer/person';
import { IVilkårConfig, IVilkårResultat, Resultat, uiResultat } from '../../../../typer/vilkår';
import { datoformat, formaterIsoDato } from '../../../../utils/formatter';
import { periodeToString } from '../../../../utils/kalender';
import IkonKnapp from '../../../Felleskomponenter/IkonKnapp/IkonKnapp';
import { vilkårFeilmeldingId } from './VilkårTabell';
import VilkårTabellRadEndre from './VilkårTabellRadEndre';

interface IProps {
    person: IGrunnlagPerson;
    vilkårFraConfig: IVilkårConfig;
    vilkårResultat: FeltState<IVilkårResultat>;
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

const EkspandertTd = styled.td`
    padding: 0 1rem 1rem 1.6rem;
`;

const EkspanderbarTr = styled.tr`
    td {
        border-bottom: ${(props: IEkspanderbarTrProps) =>
            props.ekspandert ? 'none' : '1px solid rgba(0, 0, 0, 0.15)'} !important;
    }
`;

const VilkårTabellRad: React.FC<IProps> = ({
    person,
    vilkårFraConfig,
    vilkårResultat,
    visFeilmeldinger,
}) => {
    const { erLesevisning, åpenBehandling } = useBehandling();

    const [ekspandertVilkår, settEkspandertVilkår] = useState(
        erLesevisning() || false || vilkårResultat.verdi.resultat.verdi === Resultat.IKKE_VURDERT
    );
    const [redigerbartVilkår, settRedigerbartVilkår] =
        useState<FeltState<IVilkårResultat>>(vilkårResultat);

    const periodeErTom =
        !redigerbartVilkår.verdi.periode.verdi.fom && !redigerbartVilkår.verdi.periode.verdi.tom;

    const toggleForm = (visAlert: boolean) => {
        if (ekspandertVilkår && visAlert && !deepEqual(vilkårResultat, redigerbartVilkår)) {
            alert('Vurderingen har endringer som ikke er lagret!');
        } else {
            settEkspandertVilkår(!ekspandertVilkår);
            settRedigerbartVilkår(vilkårResultat);
        }
    };

    return (
        <>
            <EkspanderbarTr {...{ ekspandert: ekspandertVilkår }}>
                <td>
                    <VurderingCelle>
                        <VilkårResultatIkon
                            resultat={vilkårResultat.verdi.resultat.verdi}
                            width={20}
                            heigth={20}
                        />
                        <Normaltekst children={uiResultat[vilkårResultat.verdi.resultat.verdi]} />
                    </VurderingCelle>
                </td>
                <td>
                    <Normaltekst
                        children={
                            periodeErTom ? '-' : periodeToString(vilkårResultat.verdi.periode.verdi)
                        }
                    />
                </td>
                <td>
                    <BeskrivelseCelle children={vilkårResultat.verdi.begrunnelse.verdi} />
                </td>
                <td>
                    <IkonKnapp
                        erLesevisning={erLesevisning()}
                        onClick={() => toggleForm(true)}
                        id={vilkårFeilmeldingId(vilkårResultat.verdi)}
                        label={
                            !ekspandertVilkår
                                ? vilkårResultat.verdi.resultat.verdi === Resultat.IKKE_VURDERT
                                    ? 'Vurder'
                                    : 'Endre'
                                : 'Lukk'
                        }
                        mini={true}
                        ikon={<FamilieChevron retning={ekspandertVilkår ? 'opp' : 'ned'} />}
                    />
                </td>
                <td>
                    {vilkårResultat.verdi.erAutomatiskVurdert ? (
                        <AutomatiskVurdering />
                    ) : (
                        <ManuellVurdering />
                    )}
                </td>
                <td>
                    <i>
                        {åpenBehandling.status === RessursStatus.SUKSESS &&
                        vilkårResultat.verdi.erVurdert
                            ? vilkårResultat.verdi.behandlingId === åpenBehandling.data.behandlingId
                                ? 'Vurdert i denne behandlingen'
                                : `Vurdert ${formaterIsoDato(
                                      vilkårResultat.verdi.endretTidspunkt,
                                      datoformat.DATO_FORKORTTET
                                  )}`
                            : ''}
                    </i>
                </td>
            </EkspanderbarTr>
            {ekspandertVilkår && (
                <tr>
                    <EkspandertTd colSpan={6}>
                        <VilkårTabellRadEndre
                            person={person}
                            vilkårFraConfig={vilkårFraConfig}
                            vilkårResultat={vilkårResultat}
                            visFeilmeldinger={visFeilmeldinger}
                            toggleForm={toggleForm}
                            redigerbartVilkår={redigerbartVilkår}
                            settRedigerbartVilkår={settRedigerbartVilkår}
                            settEkspandertVilkår={settEkspandertVilkår}
                        />
                    </EkspandertTd>
                </tr>
            )}
        </>
    );
};

export default VilkårTabellRad;
