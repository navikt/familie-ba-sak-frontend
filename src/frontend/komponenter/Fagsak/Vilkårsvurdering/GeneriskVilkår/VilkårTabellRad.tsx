import React, { useState } from 'react';

import deepEqual from 'deep-equal';
import styled from 'styled-components';

import { Normaltekst } from 'nav-frontend-typografi';

import { AutomaticSystem, People, Settings } from '@navikt/ds-icons';
import { FeltState } from '@navikt/familie-skjema';
import { RessursStatus } from '@navikt/familie-typer';

import { useApp } from '../../../../context/AppContext';
import { useBehandling } from '../../../../context/behandlingContext/BehandlingContext';
import FamilieChevron from '../../../../ikoner/FamilieChevron';
import VilkårResultatIkon from '../../../../ikoner/VilkårResultatIkon';
import { IGrunnlagPerson } from '../../../../typer/person';
import { ToggleNavn } from '../../../../typer/toggles';
import { IVilkårConfig, IVilkårResultat, Resultat, uiResultat } from '../../../../typer/vilkår';
import { datoformat, formaterIsoDato } from '../../../../utils/formatter';
import { periodeToString } from '../../../../utils/kalender';
import { alleRegelverk } from '../../../../utils/vilkår';
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

const FlexDiv = styled.div`
    display: flex;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;
    > div:nth-child(n + 2) {
        padding-left: 0.5rem;
    }
`;

const ToggleFormKnappTd = styled.td`
    text-align: right !important;
    padding-right: 0 !important;
`;

const VilkårTabellRad: React.FC<IProps> = ({
    person,
    vilkårFraConfig,
    vilkårResultat,
    visFeilmeldinger,
}) => {
    const { toggles } = useApp();
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

    if (redigerbartVilkår.verdi.vurderesEtter) {
        console.info(redigerbartVilkår.verdi.vurderesEtter);
    }

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
                    {toggles[ToggleNavn.brukEøs] &&
                        (redigerbartVilkår.verdi.vurderesEtter ? (
                            <FlexDiv>
                                {alleRegelverk[redigerbartVilkår.verdi.vurderesEtter].symbol}
                                <div>
                                    {alleRegelverk[redigerbartVilkår.verdi.vurderesEtter].tekst}
                                </div>
                            </FlexDiv>
                        ) : (
                            <FlexDiv>
                                <Settings width={24} height={24} viewBox={'0 0 24 24'} />
                                <div>Generell vurdering</div>
                            </FlexDiv>
                        ))}
                </td>
                <td>
                    <FlexDiv>
                        {vilkårResultat.verdi.erAutomatiskVurdert ? (
                            <AutomaticSystem
                                width={24}
                                height={24}
                                aria-labelledby={'Automatisk Vurdering'}
                                viewBox={'0 0 24 24'}
                            />
                        ) : (
                            <People
                                width={24}
                                height={24}
                                aria-labelledby={'ManuellVurdering'}
                                viewBox={'0 0 24 24'}
                            />
                        )}
                        <div>
                            {åpenBehandling.status === RessursStatus.SUKSESS &&
                            vilkårResultat.verdi.erVurdert
                                ? vilkårResultat.verdi.behandlingId ===
                                  åpenBehandling.data.behandlingId
                                    ? 'Vurdert i denne behandlingen'
                                    : `Vurdert ${formaterIsoDato(
                                          vilkårResultat.verdi.endretTidspunkt,
                                          datoformat.DATO_FORKORTTET
                                      )}`
                                : ''}
                        </div>
                    </FlexDiv>
                </td>
                <ToggleFormKnappTd>
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
                </ToggleFormKnappTd>
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
