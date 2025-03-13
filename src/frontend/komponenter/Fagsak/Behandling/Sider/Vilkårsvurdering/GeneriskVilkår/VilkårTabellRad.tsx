import React, { useEffect, useState } from 'react';

import deepEqual from 'deep-equal';
import styled from 'styled-components';

import { CogIcon, CogRotationIcon, PersonIcon } from '@navikt/aksel-icons';
import { BodyShort, Table, Tooltip } from '@navikt/ds-react';
import type { FeltState } from '@navikt/familie-skjema';

import { vilkårFeilmeldingId } from './VilkårTabell';
import VilkårTabellRadEndre from './VilkårTabellRadEndre';
import { useBehandling } from '../../../../../../context/behandlingContext/BehandlingContext';
import VilkårResultatIkon from '../../../../../../ikoner/VilkårResultatIkon';
import type { IGrunnlagPerson } from '../../../../../../typer/person';
import type { IVilkårConfig, IVilkårResultat } from '../../../../../../typer/vilkår';
import { Resultat, resultatVisningsnavn } from '../../../../../../typer/vilkår';
import { isoDatoPeriodeTilFormatertString } from '../../../../../../utils/dato';
import { alleRegelverk } from '../../../../../../utils/vilkår';

interface IProps {
    person: IGrunnlagPerson;
    vilkårFraConfig: IVilkårConfig;
    vilkårResultat: FeltState<IVilkårResultat>;
    visFeilmeldinger: boolean;
    settFokusPåKnapp: () => void;
}

const BeskrivelseCelle = styled(BodyShort)`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 20rem;
`;

const VurderingCelle = styled.div`
    display: flex;
    svg {
        margin-right: 1rem;
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

const StyledTooltip = styled(Tooltip)`
    padding-top: 8px;
    padding-bottom: 8px;
    max-width: 500px;
    text-align: left;
`;

const StyledCogIcon = styled(CogIcon)`
    font-size: 1.5rem;
    min-width: 1.5rem;
`;

const StyledCogRotationIcon = styled(CogRotationIcon)`
    font-size: 1.5rem;
    min-width: 1.5rem;
`;

const StyledPersonIcon = styled(PersonIcon)`
    font-size: 1.5rem;
    min-width: 1.5rem;
`;

const VilkårTabellRad: React.FC<IProps> = ({
    person,
    vilkårFraConfig,
    vilkårResultat,
    visFeilmeldinger,
    settFokusPåKnapp,
}) => {
    const { vurderErLesevisning, behandling, aktivSettPåVent } = useBehandling();
    const erLesevisning = vurderErLesevisning();

    const vilkårResultatVerdi = vilkårResultat.verdi.resultat.verdi;
    const vilkårResultatbegrunnelse = vilkårResultat.verdi.resultatBegrunnelse;

    const hentInitiellEkspandering = () =>
        erLesevisning || vilkårResultatVerdi === Resultat.IKKE_VURDERT;

    const [ekspandertVilkår, settEkspandertVilkår] = useState(hentInitiellEkspandering());
    const [redigerbartVilkår, settRedigerbartVilkår] =
        useState<FeltState<IVilkårResultat>>(vilkårResultat);

    useEffect(() => {
        settEkspandertVilkår(hentInitiellEkspandering());
    }, [aktivSettPåVent]);

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
        <Table.ExpandableRow
            open={ekspandertVilkår}
            togglePlacement="right"
            onOpenChange={() => toggleForm(true)}
            id={vilkårFeilmeldingId(vilkårResultat.verdi)}
            content={
                <VilkårTabellRadEndre
                    key={`${vilkårResultat.verdi.id}-${ekspandertVilkår ? 'ekspandert' : 'lukket'}`}
                    person={person}
                    vilkårFraConfig={vilkårFraConfig}
                    vilkårResultat={vilkårResultat}
                    visFeilmeldinger={visFeilmeldinger}
                    toggleForm={toggleForm}
                    redigerbartVilkår={redigerbartVilkår}
                    settRedigerbartVilkår={settRedigerbartVilkår}
                    settEkspandertVilkår={settEkspandertVilkår}
                    settFokusPåKnapp={settFokusPåKnapp}
                    lesevisning={erLesevisning}
                />
            }
        >
            <Table.DataCell>
                <VurderingCelle>
                    <VilkårResultatIkon
                        resultat={vilkårResultatVerdi}
                        resultatBegrunnelse={vilkårResultatbegrunnelse}
                    />
                    <BodyShort>
                        {vilkårResultatVerdi === Resultat.OPPFYLT && vilkårResultatbegrunnelse
                            ? resultatVisningsnavn[vilkårResultatbegrunnelse]
                            : resultatVisningsnavn[vilkårResultatVerdi]}
                    </BodyShort>
                </VurderingCelle>
            </Table.DataCell>
            <Table.DataCell>
                <BodyShort>
                    {periodeErTom
                        ? '-'
                        : isoDatoPeriodeTilFormatertString(vilkårResultat.verdi.periode.verdi)}
                </BodyShort>
            </Table.DataCell>
            <Table.DataCell>
                {vilkårResultat.verdi.begrunnelse.verdi && (
                    <StyledTooltip content={vilkårResultat.verdi.begrunnelse.verdi}>
                        <BeskrivelseCelle children={vilkårResultat.verdi.begrunnelse.verdi} />
                    </StyledTooltip>
                )}
            </Table.DataCell>
            <Table.DataCell>
                {redigerbartVilkår.verdi.vurderesEtter ? (
                    <FlexDiv>
                        {alleRegelverk[redigerbartVilkår.verdi.vurderesEtter].symbol}
                        <div>{alleRegelverk[redigerbartVilkår.verdi.vurderesEtter].tekst}</div>
                    </FlexDiv>
                ) : (
                    <FlexDiv>
                        <StyledCogIcon title={'Generell vurdering'} />
                        <div>Generell vurdering</div>
                    </FlexDiv>
                )}
            </Table.DataCell>
            <Table.DataCell>
                <FlexDiv>
                    {vilkårResultat.verdi.erAutomatiskVurdert ? (
                        <StyledCogRotationIcon title={'Automatisk Vurdering'} />
                    ) : (
                        <StyledPersonIcon title={'Manuell vurdering'} />
                    )}
                    <div>
                        {vilkårResultat.verdi.erVurdert
                            ? vilkårResultat.verdi.behandlingId === behandling.behandlingId
                                ? 'Vurdert i denne behandlingen'
                                : 'Vurdert i tidligere behandling'
                            : ''}
                    </div>
                </FlexDiv>
            </Table.DataCell>
        </Table.ExpandableRow>
    );
};

export default VilkårTabellRad;
